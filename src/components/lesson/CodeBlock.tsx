import { codeToHtml } from "shiki";
import { getShikiLang } from "@/lib/code-languages";
import { CopyButton } from "./CopyButton";

export async function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const lang = getShikiLang(language) ?? "text";
  const html = await codeToHtml(code, { lang, theme: "github-light" });

  return (
    <div className="my-4 overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center justify-end border-b bg-muted/50 px-2 py-1">
        <CopyButton text={code} />
      </div>
      <div
        className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
