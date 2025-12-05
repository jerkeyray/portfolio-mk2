import { CopyButton } from "../CopyButton";
import type { ReactNode } from "react";

type PreProps = {
  children: ReactNode;
  raw?: string;
  className?: string;
  ["data-language"]?: string;
} & React.HTMLAttributes<HTMLPreElement>;

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && node && "props" in node) {
    // @ts-expect-error - ReactNode
    return extractText(node.props?.children);
  }
  return "";
}

export function Pre({ children, raw, className = "", ...props }: PreProps) {
  const codeToCopy = raw ?? extractText(children);

  const combinedClassName = [
    "mdx-pre group relative my-6 overflow-hidden rounded-lg border border-accent/30 shadow-[0_24px_48px_-18px_rgba(0,0,0,0.75)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <pre {...props} className={combinedClassName}>
      <div className="absolute right-3 top-3 z-10">
        <CopyButton text={codeToCopy} />
      </div>
      <div className="p-4 pr-4 overflow-x-auto font-mono text-sm leading-relaxed text-foreground">
        {children}
      </div>
    </pre>
  );
}
