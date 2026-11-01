// content/<kurs>/<modul>/<ders>.md dosyalarını slug'a göre lessons + lesson_quiz_questions
// tablolarına ekler/günceller. Kurs ve modül kayıtları burada OLUŞTURULMAZ — onlar
// migration'larla önceden var olmalı (docs/icerik-plani.md "Dosya düzeni" bölümü).
//
// Kullanım:
//   npm run content:import -- --dry-run         (hiçbir yazma yapmaz, yalnızca rapor verir)
//   npm run content:import                       (gerçek içe aktarma)
//   npm run content:import -- --unpublish-all    (dosyada işaret olsun olmasın, bu turda
//                                                  aktarılan HER dersi is_published=false yapar)

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";
import type { Database } from "../src/types/database";

try {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
} catch {
  // .env.local yoksa veya ortam değişkenleri zaten set edilmişse sorun değil.
}

const DRY_RUN = process.argv.includes("--dry-run");
const UNPUBLISH_ALL = process.argv.includes("--unpublish-all");

// İçerik yazarının "bu kısım henüz hazır değil" demek için kullandığı işaretler
// (docs/pilot-duzeltmeler.md kural 17). Biri bulunursa ders is_published=false
// olarak aktarılır; araç linkindeyse işaret metni tool_url'e yazılmaz.
const PLACEHOLDER_MARKERS = ["[MAKECODE LİNKİ]", "[KONTROL", "[GÖRSEL", "[BLOK ADI KONTROL]"] as const;

function findMarkers(text: string | undefined | null): Partial<Record<string, number>> {
  const counts: Partial<Record<string, number>> = {};
  if (!text) return counts;
  for (const marker of PLACEHOLDER_MARKERS) {
    const count = text.split(marker).length - 1;
    if (count > 0) counts[marker] = count;
  }
  return counts;
}

function describeMarkers(field: string, counts: Partial<Record<string, number>>): string[] {
  return Object.entries(counts).map(([marker, count]) => `${marker} (${field} ×${count})`);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SECRET_KEY;
if (!supabaseUrl || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SECRET_KEY gerekli (.env.local).");
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TOOL_LABELS: Record<string, string> = {
  "makecode.microbit.org": "MakeCode'da Aç",
  "python.microbit.org": "Python Editörü'nde Aç",
  "wokwi.com": "Wokwi'de Dene",
  "tinkercad.com": "Tinkercad'de Aç",
};

function defaultToolLabel(url: string): string | null {
  try {
    const hostname = new URL(url).hostname;
    for (const [domain, label] of Object.entries(TOOL_LABELS)) {
      if (hostname === domain || hostname.endsWith(`.${domain}`)) return label;
    }
  } catch {
    // Geçersiz URL — çağıran taraf olduğu gibi kaydeder, platform zod ile reddeder.
  }
  return null;
}

type QuizItem = {
  soru: string;
  secenekler: string[];
  dogru: number;
  aciklama: string;
  puan?: number;
};

type Frontmatter = {
  kurs?: string;
  modul?: string;
  slug?: string;
  sira?: number;
  baslik?: string;
  ozet?: string;
  sure?: number;
  puan?: number;
  kod_dili?: string;
  ornek_kod?: string;
  arac_linki?: string;
  arac_etiketi?: string;
  malzemeler?: string[];
  video?: string;
  test?: QuizItem[];
};

function findMarkdownFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

function missingFields(fm: Frontmatter): string[] {
  const required: (keyof Frontmatter)[] = [
    "kurs",
    "modul",
    "slug",
    "sira",
    "baslik",
    "sure",
    "puan",
    "kod_dili",
  ];
  return required.filter((field) => fm[field] === undefined || fm[field] === null);
}

type FileReport = {
  file: string;
  status: "insert" | "update" | "error";
  detail: string;
  markerNotes: string[];
};

async function processFile(filePath: string): Promise<FileReport> {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;

  const missing = missingFields(fm);
  if (missing.length > 0) {
    return {
      file: filePath,
      status: "error",
      detail: `Eksik alan(lar): ${missing.join(", ")}`,
      markerNotes: [],
    };
  }

  const { data: course } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", fm.kurs!)
    .maybeSingle();
  if (!course) {
    return {
      file: filePath,
      status: "error",
      detail: `Kurs bulunamadı: ${fm.kurs}`,
      markerNotes: [],
    };
  }

  const { data: moduleRow } = await supabase
    .from("modules")
    .select("id")
    .eq("course_id", course.id)
    .eq("slug", fm.modul!)
    .maybeSingle();
  if (!moduleRow) {
    return {
      file: filePath,
      status: "error",
      detail: `Modül bulunamadı: ${fm.kurs}/${fm.modul}`,
      markerNotes: [],
    };
  }

  const { data: existingLesson } = await supabase
    .from("lessons")
    .select("id")
    .eq("module_id", moduleRow.id)
    .eq("slug", fm.slug!)
    .maybeSingle();

  const contentMarkers = findMarkers(content);
  const toolMarkers = findMarkers(fm.arac_linki);
  const codeMarkers = findMarkers(fm.ornek_kod);
  const markerNotes = [
    ...describeMarkers("içerik", contentMarkers),
    ...describeMarkers("araç linki", toolMarkers),
    ...describeMarkers("örnek kod", codeMarkers),
  ];
  const hasAnyMarker = markerNotes.length > 0;
  const forcePublishedFalse = UNPUBLISH_ALL || hasAnyMarker;

  // Araç linki alanı bir işaretse (örn. "[MAKECODE LİNKİ]"), geçersiz bir URL olarak
  // kaydedilmesin — boş bırakılır, gerçek link eklenince teacher panelinden girilir.
  const resolvedToolUrl = Object.keys(toolMarkers).length > 0 ? null : fm.arac_linki || null;
  const toolLabel = resolvedToolUrl ? fm.arac_etiketi ?? defaultToolLabel(resolvedToolUrl) ?? "" : "";

  const basePayload = {
    module_id: moduleRow.id,
    slug: fm.slug!,
    title: fm.baslik!,
    summary: fm.ozet ?? null,
    content: content.trim(),
    example_code: fm.ornek_kod ?? null,
    code_language: fm.kod_dili!,
    tool_url: resolvedToolUrl,
    tool_label: toolLabel || null,
    materials: fm.malzemeler ?? [],
    video_url: fm.video || null,
    estimated_minutes: fm.sure!,
    points: fm.puan!,
    order_index: fm.sira!,
  };
  const updatePayload = forcePublishedFalse ? { ...basePayload, is_published: false } : basePayload;
  const insertPayload = { ...basePayload, is_published: false };

  const quiz = fm.test ?? [];
  const questionsSummary = quiz.length > 0 ? `${quiz.length} soruluk quiz` : "quiz yok";
  const publishNote = forcePublishedFalse ? " — is_published=false olarak aktarılacak" : "";

  if (DRY_RUN) {
    const status = existingLesson ? "update" : "insert";
    const detail = existingLesson
      ? `GÜNCELLENECEK (id=${existingLesson.id}) — ${questionsSummary}${publishNote}`
      : `YENİ ders eklenecek — ${questionsSummary}${publishNote}`;
    return { file: filePath, status, detail, markerNotes };
  }

  let lessonId: string;
  if (existingLesson) {
    const { error } = await supabase.from("lessons").update(updatePayload).eq("id", existingLesson.id);
    if (error) {
      return {
        file: filePath,
        status: "error",
        detail: `Güncelleme hatası: ${error.message}`,
        markerNotes,
      };
    }
    lessonId = existingLesson.id;
  } else {
    const { data: inserted, error } = await supabase
      .from("lessons")
      .insert(insertPayload)
      .select("id")
      .single();
    if (error || !inserted) {
      return {
        file: filePath,
        status: "error",
        detail: `Ekleme hatası: ${error?.message}`,
        markerNotes,
      };
    }
    lessonId = inserted.id;
  }

  const { error: deleteError } = await supabase
    .from("lesson_quiz_questions")
    .delete()
    .eq("lesson_id", lessonId);
  if (deleteError) {
    return {
      file: filePath,
      status: "error",
      detail: `Quiz temizleme hatası: ${deleteError.message}`,
      markerNotes,
    };
  }

  if (quiz.length > 0) {
    const rows = quiz.map((q, index) => ({
      lesson_id: lessonId,
      question: q.soru,
      options: q.secenekler,
      correct_index: q.dogru,
      explanation: q.aciklama,
      points: q.puan ?? 5,
      order_index: index,
    }));
    const { error: insertError } = await supabase.from("lesson_quiz_questions").insert(rows);
    if (insertError) {
      return {
        file: filePath,
        status: "error",
        detail: `Quiz ekleme hatası: ${insertError.message}`,
        markerNotes,
      };
    }
  }

  return {
    file: filePath,
    status: existingLesson ? "update" : "insert",
    detail: existingLesson
      ? `Güncellendi (id=${lessonId}) — ${questionsSummary}${publishNote}`
      : `Eklendi (id=${lessonId}) — ${questionsSummary}${publishNote}`,
    markerNotes,
  };
}

async function main() {
  const contentDir = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDir)) {
    console.error(`content/ klasörü bulunamadı: ${contentDir}`);
    process.exit(1);
  }

  const files = findMarkdownFiles(contentDir).sort();
  if (files.length === 0) {
    console.log("content/ altında .md dosyası bulunamadı.");
    return;
  }

  console.log(
    `${files.length} dosya bulundu.${DRY_RUN ? " (--dry-run, hiçbir yazma yapılmayacak)" : ""}\n`
  );

  const reports: FileReport[] = [];
  for (const file of files) {
    reports.push(await processFile(file));
  }

  for (const r of reports) {
    const rel = path.relative(process.cwd(), r.file);
    const marker = r.status === "error" ? "✗" : r.status === "insert" ? "+" : "~";
    console.log(`${marker} ${rel} — ${r.detail}`);
  }

  const errorCount = reports.filter((r) => r.status === "error").length;
  console.log(`\nToplam: ${reports.length} dosya, ${errorCount} hata.`);

  const withMarkers = reports.filter((r) => r.markerNotes.length > 0);
  if (withMarkers.length > 0) {
    console.log(`\nEksik işaretli dersler (${withMarkers.length}):`);
    for (const r of withMarkers) {
      const rel = path.relative(process.cwd(), r.file);
      console.log(`  - ${rel}: ${r.markerNotes.join(", ")}`);
    }
  }

  if (errorCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
