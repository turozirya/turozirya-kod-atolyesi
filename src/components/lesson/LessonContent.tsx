import type { ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { EnlargeableImage } from "./EnlargeableImage";

function getPlainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getPlainText).join("");
  }
  if (
    node &&
    typeof node === "object" &&
    "props" in node &&
    node.props &&
    typeof node.props === "object" &&
    "children" in node.props
  ) {
    return getPlainText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

const components: Components = {
  img({ src, alt }) {
    return <EnlargeableImage src={typeof src === "string" ? src : undefined} alt={alt} />;
  },
  blockquote({ children }) {
    const isTip = getPlainText(children).trim().startsWith("💡");
    if (isTip) {
      return (
        <div className="my-4 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-amber-900 [&_p]:m-0">
          {children}
        </div>
      );
    }
    return (
      <blockquote className="my-4 border-l-4 border-border pl-4 text-muted-foreground">
        {children}
      </blockquote>
    );
  },
};

export function LessonContent({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-foreground prose-a:text-primary prose-img:rounded-xl">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  );
}
