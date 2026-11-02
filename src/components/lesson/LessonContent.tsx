import type { ReactNode } from "react";
import Markdown, { type Components, type Options as MarkdownOptions } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Plugin } from "unified";
import type { Root, RootContent } from "mdast";
import type { Handler, Handlers } from "mdast-util-to-hast";
import { toString as mdastToString } from "mdast-util-to-string";
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

// Dersin "Dene!" ve "Bugün öğrendiklerin" bölümlerini içeriklerden görsel
// olarak ayırmak için: bu metinlerle başlayan paragrafı veya başlığı ve ona
// ait takip eden blokları (tablo, liste, ara paragraflar) özel bir kutu
// düğümüne toplar. İçerik dosyaları iki farklı yazım biçimi kullanabiliyor —
// kalın paragraf ("**Dene!** ...", pilot dalga) ya da başlık ("### Dene!",
// Modül 3-9) — ikisi de aynı şekilde yakalanır. Kutunun gerçek görünümü
// aşağıdaki lessonSectionBoxHandler ile hast'e (ve components.div yerine
// doğrudan className ile) çevrilir.
const TRY_PREFIX = "Dene!";
const SUMMARY_PREFIX = "Bugün öğrendiklerin";
const TRY_BOX_CLASSNAME =
  "my-4 rounded-2xl border-2 border-sky-300 bg-sky-50 p-4 dark:border-sky-800 dark:bg-sky-950/40 [&>:first-child]:mt-0 [&>:last-child]:mb-0";
const SUMMARY_BOX_CLASSNAME =
  "my-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/40 [&>:first-child]:mt-0 [&>:last-child]:mb-0";

interface LessonSectionBoxNode {
  type: "lessonSectionBox";
  boxClassName: string;
  children: RootContent[];
}

function startsWithText(node: RootContent, prefix: string): boolean {
  if (node.type === "paragraph") {
    return mdastToString(node).trim().startsWith(prefix);
  }
  // "### Dene!" / "### Bugün öğrendiklerin" gibi başlıklar paragraf değil,
  // ayrı bir blok olduğu için metni tam olarak (kolon farkını yok sayarak)
  // karşılaştırıyoruz.
  if (node.type === "heading") {
    return mdastToString(node).trim().replace(/:$/, "") === prefix;
  }
  return false;
}

const remarkLessonSections: Plugin<[], Root> = () => (tree) => {
  const children = tree.children;
  const result: (RootContent | LessonSectionBoxNode)[] = [];
  let i = 0;
  while (i < children.length) {
    const node = children[i];
    if (startsWithText(node, TRY_PREFIX)) {
      const group: RootContent[] = [node];
      i += 1;
      while (i < children.length && !startsWithText(children[i], SUMMARY_PREFIX)) {
        group.push(children[i]);
        i += 1;
      }
      result.push({ type: "lessonSectionBox", boxClassName: TRY_BOX_CLASSNAME, children: group });
      continue;
    }
    if (startsWithText(node, SUMMARY_PREFIX)) {
      const group: RootContent[] = [node];
      i += 1;
      if (i < children.length && children[i].type === "list") {
        group.push(children[i]);
        i += 1;
      }
      result.push({ type: "lessonSectionBox", boxClassName: SUMMARY_BOX_CLASSNAME, children: group });
      continue;
    }
    result.push(node);
    i += 1;
  }
  // "lessonSectionBox" standart bir mdast düğüm tipi değil; remark-rehype'a
  // lessonSectionBoxHandler ile tanıtılıyor (bkz. aşağıdaki remarkRehypeOptions).
  tree.children = result as unknown as RootContent[];
};

function getBoxClassName(node: unknown): string {
  if (node && typeof node === "object" && "boxClassName" in node) {
    const value = (node as { boxClassName: unknown }).boxClassName;
    return typeof value === "string" ? value : "";
  }
  return "";
}

const lessonSectionBoxHandler: Handler = (state, node) => {
  const result = {
    type: "element" as const,
    tagName: "div",
    properties: { className: getBoxClassName(node).split(" ") },
    children: state.all(node),
  };
  state.patch(node, result);
  return result;
};

// mdast-util-to-hast'ın Handlers tipi anahtarları bilinen mdast düğüm
// tiplerine kısıtlar; "lessonSectionBox" özel bir tip olduğu için bu cast
// gerekli (çalışma zamanında tam olarak desteklenen bir desen).
const remarkRehypeOptions: MarkdownOptions["remarkRehypeOptions"] = {
  handlers: { lessonSectionBox: lessonSectionBoxHandler } as Handlers,
};

const components: Components = {
  img({ src, alt }) {
    return <EnlargeableImage src={typeof src === "string" ? src : undefined} alt={alt} />;
  },
  blockquote({ children }) {
    const isTip = getPlainText(children).trim().startsWith("💡");
    if (isTip) {
      return (
        <div className="my-4 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-amber-900 [&_p]:m-0 [&_strong]:text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100 dark:[&_strong]:text-amber-100">
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
  table({ children }) {
    return (
      <div className="my-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    );
  },
  thead({ children }) {
    return <thead className="bg-muted">{children}</thead>;
  },
  tr({ children }) {
    return (
      <tr className="border-b border-border last:border-0 even:bg-muted/40">{children}</tr>
    );
  },
  th({ children }) {
    return (
      <th className="border-r border-border px-3 py-2 text-left font-heading font-semibold text-foreground last:border-r-0">
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="border-r border-border px-3 py-2 align-top text-foreground last:border-r-0">
        {children}
      </td>
    );
  },
};

export function LessonContent({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-foreground prose-a:text-primary prose-img:rounded-xl">
      <Markdown
        remarkPlugins={[remarkGfm, remarkLessonSections]}
        remarkRehypeOptions={remarkRehypeOptions}
        components={components}
      >
        {content}
      </Markdown>
    </div>
  );
}
