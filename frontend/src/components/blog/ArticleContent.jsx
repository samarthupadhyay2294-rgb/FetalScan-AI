import { FiInfo, FiAlertTriangle, FiCheckCircle, FiBookOpen } from 'react-icons/fi';

export default function ArticleContent({ content = '', image = '', title = '' }) {
  // Simple markdown renderer for headers, callouts, tables, lists, and quotes
  const renderParagraphs = () => {
    if (!content) return null;

    const sections = content.trim().split('\n\n');

    return sections.map((sec, idx) => {
      const text = sec.trim();

      // Heading 3
      if (text.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight">
            {text.replace('### ', '')}
          </h3>
        );
      }

      // Heading 4
      if (text.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-lg font-bold text-slate-900 mt-6 mb-3">
            {text.replace('#### ', '')}
          </h4>
        );
      }

      // Horizontal Rule
      if (text === '---') {
        return <hr key={idx} className="my-8 border-slate-200" />;
      }

      // Callout: Note / Info
      if (text.startsWith('> [!NOTE]') || text.startsWith('> [!INFO]')) {
        const body = text.split('\n').slice(1).join(' ').replace('> ', '').trim();
        return (
          <div key={idx} className="my-6 flex items-start gap-3 rounded-2xl bg-cyan-50/80 p-5 border border-cyan-200 text-cyan-950">
            <FiInfo size={20} className="text-cyan-600 shrink-0 mt-0.5" />
            <div className="text-sm font-medium leading-relaxed">{body}</div>
          </div>
        );
      }

      // Callout: Important / Warning
      if (text.startsWith('> [!IMPORTANT]') || text.startsWith('> [!WARNING]')) {
        const body = text.split('\n').slice(1).join(' ').replace('> ', '').trim();
        return (
          <div key={idx} className="my-6 flex items-start gap-3 rounded-2xl bg-amber-50/80 p-5 border border-amber-200 text-amber-950">
            <FiAlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm font-medium leading-relaxed">{body}</div>
          </div>
        );
      }

      // Callout: Research
      if (text.startsWith('> [!RESEARCH]')) {
        const body = text.split('\n').slice(1).join(' ').replace('> ', '').trim();
        return (
          <div key={idx} className="my-6 flex items-start gap-3 rounded-2xl bg-indigo-50/80 p-5 border border-indigo-200 text-indigo-950">
            <FiBookOpen size={20} className="text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-sm font-medium leading-relaxed">{body}</div>
          </div>
        );
      }

      // Bullet List
      if (text.includes('\n- ') || text.startsWith('- ')) {
        const items = text.split('\n').filter((l) => l.startsWith('- ') || l.match(/^\d+\./));
        return (
          <ul key={idx} className="my-4 space-y-2 text-sm text-slate-700 leading-relaxed pl-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <FiCheckCircle size={16} className="text-cyan-600 shrink-0 mt-1" />
                <span>{item.replace(/^- |\d+\. /, '')}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Table (Markdown Table)
      if (text.includes('|')) {
        const lines = text.split('\n').filter((l) => l.trim().startsWith('|'));
        if (lines.length >= 2) {
          const headerCells = lines[0].split('|').filter(Boolean).map((c) => c.trim());
          const rowLines = lines.slice(2);

          return (
            <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <tr>
                    {headerCells.map((h, i) => (
                      <th key={i} className="p-3.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {rowLines.map((row, rIdx) => {
                    const cells = row.split('|').filter(Boolean).map((c) => c.trim());
                    return (
                      <tr key={rIdx} className="hover:bg-slate-50/50">
                        {cells.map((c, cIdx) => (
                          <td key={cIdx} className="p-3.5 text-slate-700">{c}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal my-4">
          {text}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6 pt-6">
      {/* Featured Banner Image */}
      {image && (
        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg max-h-[450px] bg-slate-900">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Rendered Body Content */}
      <div className="prose prose-slate max-w-none">
        {renderParagraphs()}
      </div>
    </div>
  );
}
