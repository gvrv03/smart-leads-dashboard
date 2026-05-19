'use client';

interface DocsCodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function DocsCodeBlock({ code, title }: DocsCodeBlockProps) {
  return (
    <div className="rounded-lg border overflow-hidden">
      {title && (
        <div className="bg-muted/50 px-4 py-2 border-b">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
        </div>
      )}
      <pre className="bg-muted/30 p-4 overflow-x-auto">
        <code className="text-xs font-mono">{code}</code>
      </pre>
    </div>
  );
}
