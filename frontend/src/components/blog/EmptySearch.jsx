import { FiSearch, FiRefreshCw } from 'react-icons/fi';

export default function EmptySearch({ query, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 p-12 text-center backdrop-blur-md space-y-4 my-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
        <FiSearch size={32} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">No Articles Found</h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          We couldn't find any articles matching <span className="font-semibold text-slate-900">"{query}"</span>. Try searching for "BPD", "OFD", "Cephalic Index", or "HRNet".
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all"
      >
        <FiRefreshCw size={14} />
        Reset Search & Filters
      </button>
    </div>
  );
}
