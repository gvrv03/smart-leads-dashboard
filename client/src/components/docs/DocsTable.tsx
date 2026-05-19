'use client';

interface DocsTableProps {
  headers: string[];
  rows: string[][];
}

export function DocsTable({ headers, rows }: DocsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wide">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-xs">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
