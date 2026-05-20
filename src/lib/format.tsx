import { Fragment, type ReactNode } from "react";

// Minimal inline-markdown renderer: handles **bold**, *italic*, _italic_,
// and raw newlines. Deliberately not a full Markdown parser — Claude's
// replies in Mbwira are conversational prose, not documents.
export function renderRichText(input: string): ReactNode {
  if (!input) return null;
  const blocks = input.split(/\n{2,}/);
  return blocks.map((block, blockIdx) => (
    <Fragment key={blockIdx}>
      {blockIdx > 0 && <span className="block h-4" aria-hidden />}
      <span className="block">{renderInlineWithBreaks(block, blockIdx)}</span>
    </Fragment>
  ));
}

function renderInlineWithBreaks(block: string, blockIdx: number): ReactNode {
  const lines = block.split("\n");
  return lines.flatMap((line, lineIdx) => {
    const inline = renderInline(line, `${blockIdx}-${lineIdx}`);
    return lineIdx === 0
      ? inline
      : [<br key={`${blockIdx}-${lineIdx}-br`} />, ...inline];
  });
}

const INLINE = /\*\*([^*\n]+)\*\*|\*([^*\n]+)\*|_([^_\n]+)_/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let cursor = 0;
  let m: RegExpExecArray | null;
  INLINE.lastIndex = 0;
  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > cursor) parts.push(text.slice(cursor, m.index));
    const key = `${keyPrefix}-${m.index}`;
    if (m[1]) parts.push(<strong key={key}>{m[1]}</strong>);
    else if (m[2]) parts.push(<em key={key}>{m[2]}</em>);
    else if (m[3]) parts.push(<em key={key}>{m[3]}</em>);
    cursor = INLINE.lastIndex;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}
