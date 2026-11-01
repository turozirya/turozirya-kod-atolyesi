// Pilot dalga için gerekli iki dersin diyagramlarını üretir (SVG → PNG, sharp ile),
// Supabase Storage'ın lesson-media kovasına yükler ve content/ altındaki ilgili
// [GÖRSEL: ...] işaretlerinin yerine Markdown görsel söz dizimini yazar.
//
// Kullanım: npm run content:diagrams
//
// Yalnızca metinden çizilebilen diyagramları üretir (kart fotoğrafı, editör ekran
// görüntüsü gibi gerçek fotoğraf/ekran görüntüsü gerektirenler burada ÜRETİLMEZ).

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/types/database";

try {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
} catch {
  // .env.local yoksa veya ortam değişkenleri zaten set edilmişse sorun değil.
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

const LESSON_MEDIA_BUCKET = "lesson-media";
const FONT = "Arial, 'Segoe UI', sans-serif";

// src/app/globals.css :root paleti
const COLORS = {
  background: "#faf8ff",
  card: "#ffffff",
  foreground: "#211a33",
  mutedForeground: "#6b6480",
  border: "#e6e1f5",
  muted: "#f3f0fb",
  primary: "#8b5cf6", // violet
  accent: "#fb923c", // orange
  sky: "#0ea5e9",
};

function arrow(x1: number, y1: number, x2: number, y2: number, color: string): string {
  return `
    <line x1="${x1}" y1="${y1}" x2="${x2 - 14}" y2="${y2}" stroke="${color}" stroke-width="4" />
    <polygon points="${x2},${y2} ${x2 - 16},${y2 - 8} ${x2 - 16},${y2 + 8}" fill="${color}" />
  `;
}

function girdiIslemCiktiSvg(): string {
  const width = 900;
  const height = 320;
  const boxY = 90;
  const boxH = 120;
  const boxW = 220;
  const boxes = [
    { x: 40, fill: COLORS.sky, label: "GİRDİ", sub: ["Tampon sensörü", "“çarptım” bilgisi"] },
    { x: 340, fill: COLORS.primary, label: "İŞLEM", sub: ["“Geri çekil,", "sağa dön” kararı"] },
    { x: 640, fill: COLORS.accent, label: "ÇIKTI", sub: ["Tekerlekler", "döner"] },
  ];

  const boxesSvg = boxes
    .map(
      (b) => `
      <rect x="${b.x}" y="${boxY}" width="${boxW}" height="${boxH}" rx="20" fill="${b.fill}" />
      <text x="${b.x + boxW / 2}" y="${boxY + 42}" font-family="${FONT}" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">${b.label}</text>
      <text x="${b.x + boxW / 2}" y="${boxY + 74}" font-family="${FONT}" font-size="16" fill="#ffffff" text-anchor="middle">${b.sub[0]}</text>
      <text x="${b.x + boxW / 2}" y="${boxY + 96}" font-family="${FONT}" font-size="16" fill="#ffffff" text-anchor="middle">${b.sub[1]}</text>
    `
    )
    .join("");

  const arrowsSvg =
    arrow(260, boxY + boxH / 2, 340, boxY + boxH / 2, COLORS.foreground) +
    arrow(560, boxY + boxH / 2, 640, boxY + boxH / 2, COLORS.foreground);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${COLORS.background}" />
    <text x="${width / 2}" y="40" font-family="${FONT}" font-size="30" font-weight="bold" fill="${COLORS.foreground}" text-anchor="middle">Girdi → İşlem → Çıktı</text>
    ${boxesSvg}
    ${arrowsSvg}
    <text x="${width / 2}" y="${boxY + boxH + 46}" font-family="${FONT}" font-size="20" font-style="italic" fill="${COLORS.mutedForeground}" text-anchor="middle">Örnek: Robot süpürge</text>
  </svg>`;
}

type GridOptions = {
  title: string;
  highlighted?: [number, number][];
  showCornerLabels?: boolean;
  caption?: string;
};

function koordinatIzgaraSvg(opts: GridOptions): string {
  const cell = 70;
  const gridSize = cell * 5;
  const originX = 110;
  const originY = 110;
  const width = originX + gridSize + 60;
  const height = originY + gridSize + (opts.caption ? 110 : 60);
  const highlighted = new Set((opts.highlighted ?? []).map(([x, y]) => `${x},${y}`));

  let cellsSvg = "";
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const isLit = highlighted.has(`${col},${row}`);
      cellsSvg += `<rect x="${originX + col * cell}" y="${originY + row * cell}" width="${cell}" height="${cell}" fill="${isLit ? COLORS.accent : COLORS.muted}" stroke="${COLORS.border}" stroke-width="2" />`;
    }
  }

  let cornerSvg = "";
  if (opts.showCornerLabels) {
    const corners: [number, number, string, string][] = [
      [0, 0, "(0,0)", "start"],
      [4, 0, "(4,0)", "end"],
      [0, 4, "(0,4)", "start"],
      [4, 4, "(4,4)", "end"],
    ];
    cornerSvg = corners
      .map(([col, row, label, anchor]) => {
        const x = originX + col * cell + (anchor === "start" ? 6 : cell - 6);
        const y = originY + row * cell + (row === 0 ? 18 : cell - 8);
        return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="13" font-weight="bold" fill="${COLORS.primary}" text-anchor="${anchor}">${label}</text>`;
      })
      .join("");
  }

  const xLabels = [0, 1, 2, 3, 4]
    .map(
      (i) =>
        `<text x="${originX + i * cell + cell / 2}" y="${originY - 16}" font-family="${FONT}" font-size="20" fill="${COLORS.foreground}" text-anchor="middle">${i}</text>`
    )
    .join("");
  const yLabels = [0, 1, 2, 3, 4]
    .map(
      (i) =>
        `<text x="${originX - 20}" y="${originY + i * cell + cell / 2 + 7}" font-family="${FONT}" font-size="20" fill="${COLORS.foreground}" text-anchor="middle">${i}</text>`
    )
    .join("");

  const xAxis = `
    <text x="${originX + gridSize / 2}" y="${originY - 46}" font-family="${FONT}" font-size="18" font-weight="bold" fill="${COLORS.sky}" text-anchor="middle">x (sütun) →</text>
  `;
  const yAxis = `
    <text x="${originX - 70}" y="${originY + gridSize / 2}" font-family="${FONT}" font-size="18" font-weight="bold" fill="${COLORS.accent}" text-anchor="middle" transform="rotate(-90 ${originX - 70} ${originY + gridSize / 2})">y (satır) ↓ aşağı artar</text>
  `;

  const captionSvg = opts.caption
    ? `<text x="${width / 2}" y="${originY + gridSize + 50}" font-family="${FONT}" font-size="18" fill="${COLORS.mutedForeground}" text-anchor="middle">${opts.caption}</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${COLORS.background}" />
    <text x="${width / 2}" y="34" font-family="${FONT}" font-size="26" font-weight="bold" fill="${COLORS.foreground}" text-anchor="middle">${opts.title}</text>
    ${xAxis}
    ${yAxis}
    ${xLabels}
    ${yLabels}
    ${cellsSvg}
    ${cornerSvg}
    ${captionSvg}
  </svg>`;
}

type Diagram = { fileName: string; svg: string; marker: string; lessonFile: string };

const diagrams: Diagram[] = [
  {
    fileName: "girdi-islem-cikti.png",
    svg: girdiIslemCiktiSvg(),
    marker:
      "[GÖRSEL: soldan sağa üç kutu ve oklar — Girdi → İşlem → Çıktı; altında robot süpürge örneği]",
    lessonFile: "content/robotik-giris/algila-dusun-harekete-gec/islemci-robotun-beyni.md",
  },
  {
    fileName: "koordinat-izgara.png",
    svg: koordinatIzgaraSvg({
      title: "LED Ekranı — x, y Koordinatları",
      showCornerLabels: true,
    }),
    marker: "[GÖRSEL: köşeleri ve eksenleri etiketli 5×5 koordinat ızgarası]",
    lessonFile: "content/microbit/tanisma/kendi-simgeni-ciz.md",
  },
  {
    fileName: "koordinat-izgara-ok-ornegi.png",
    svg: koordinatIzgaraSvg({
      title: "Ok Örneği",
      highlighted: [
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [1, 1],
        [3, 1],
      ],
      caption: "plot x 2 y 0..4 (gövde) + plot x 1 y 1, plot x 3 y 1 (ok başı)",
    }),
    marker: "[GÖRSEL: ok örneğinin 5×5 ızgara üzerindeki hali]",
    lessonFile: "content/microbit/tanisma/kendi-simgeni-ciz.md",
  },
];

async function main() {
  const outDir = path.join(process.cwd(), "backups", "diagrams-preview");
  fs.mkdirSync(outDir, { recursive: true });

  const lessonUpdates = new Map<string, string>();

  for (const d of diagrams) {
    const png = await sharp(Buffer.from(d.svg)).png().toBuffer();
    fs.writeFileSync(path.join(outDir, d.fileName), png);

    const storagePath = `${crypto.randomUUID()}.png`;
    const { error: uploadError } = await supabase.storage
      .from(LESSON_MEDIA_BUCKET)
      .upload(storagePath, png, { contentType: "image/png" });
    if (uploadError) {
      console.error(`✗ ${d.fileName} yüklenemedi: ${uploadError.message}`);
      process.exit(1);
    }
    const { data } = supabase.storage.from(LESSON_MEDIA_BUCKET).getPublicUrl(storagePath);
    console.log(`✓ ${d.fileName} → ${data.publicUrl}`);

    const lessonPath = path.join(process.cwd(), d.lessonFile);
    const current = lessonUpdates.get(d.lessonFile) ?? fs.readFileSync(lessonPath, "utf-8");
    if (!current.includes(d.marker)) {
      console.error(`✗ İşaret bulunamadı, dosya elle kontrol edilmeli: ${d.lessonFile}\n   Aranan: ${d.marker}`);
      process.exit(1);
    }
    const updated = current.replace(d.marker, `![${d.fileName.replace(".png", "")}](${data.publicUrl})`);
    lessonUpdates.set(d.lessonFile, updated);
  }

  for (const [file, content] of lessonUpdates) {
    fs.writeFileSync(path.join(process.cwd(), file), content);
    console.log(`✓ ${file} güncellendi`);
  }

  console.log(`\nÖnizleme PNG'leri: ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
