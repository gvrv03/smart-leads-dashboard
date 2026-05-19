'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ComponentPropsWithoutRef } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
            <h1 id={getHeadingId(children)} className="text-2xl font-bold border-b pb-2 mb-4 mt-8 first:mt-0 scroll-mt-20" {...props}>{children}</h1>
          ),
          h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
            <h2 id={getHeadingId(children)} className="text-xl font-bold mt-10 mb-3 scroll-mt-20" {...props}>{children}</h2>
          ),
          h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
            <h3 id={getHeadingId(children)} className="text-lg font-semibold mt-6 mb-2 scroll-mt-20" {...props}>{children}</h3>
          ),
          p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
            <p className="text-sm leading-relaxed text-foreground/90 mb-3" {...props}>{children}</p>
          ),
          ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
            <ul className="list-disc pl-5 space-y-1 mb-4 text-sm text-foreground/90" {...props}>{children}</ul>
          ),
          ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
            <ol className="list-decimal pl-5 space-y-1 mb-4 text-sm text-foreground/90" {...props}>{children}</ol>
          ),
          li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => (
            <li className="text-sm leading-relaxed" {...props}>{children}</li>
          ),
          a: ({ children, ...props }: ComponentPropsWithoutRef<'a'>) => (
            <a className="text-primary hover:underline" {...props}>{children}</a>
          ),
          strong: ({ children, ...props }: ComponentPropsWithoutRef<'strong'>) => (
            <strong className="font-semibold text-foreground" {...props}>{children}</strong>
          ),
          code: ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <code className={`text-xs ${className || ''}`} {...props}>{children}</code>
              );
            }
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground" {...props}>{children}</code>
            );
          },
          pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
            <pre className="bg-muted border rounded-lg p-4 overflow-x-auto mb-4 text-xs" {...props}>{children}</pre>
          ),
          table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
            <div className="overflow-x-auto mb-4 rounded-lg border">
              <table className="w-full text-xs" {...props}>{children}</table>
            </div>
          ),
          thead: ({ children, ...props }: ComponentPropsWithoutRef<'thead'>) => (
            <thead className="bg-muted/50" {...props}>{children}</thead>
          ),
          th: ({ children, ...props }: ComponentPropsWithoutRef<'th'>) => (
            <th className="px-3 py-2 text-left font-semibold border-b" {...props}>{children}</th>
          ),
          td: ({ children, ...props }: ComponentPropsWithoutRef<'td'>) => (
            <td className="px-3 py-2 border-b" {...props}>{children}</td>
          ),
          hr: (props: ComponentPropsWithoutRef<'hr'>) => (
            <hr className="my-8 border-border" {...props} />
          ),
          blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
            <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-4 text-sm" {...props}>{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function getHeadingId(children: React.ReactNode): string {
  const text = typeof children === 'string'
    ? children
    : Array.isArray(children)
      ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
      : '';

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
