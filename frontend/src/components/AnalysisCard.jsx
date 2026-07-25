import { motion } from 'framer-motion';
import { FiCalendar, FiActivity, FiShield, FiTrash2 } from 'react-icons/fi';

export default function AnalysisCard({ analysis, onDelete }) {
  const dateStr = new Date(analysis.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getRiskBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'moderate':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md hover:border-cyan-500/40 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <FiCalendar className="text-cyan-600" />
          {dateStr}
        </div>

        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border ${getRiskBadge(analysis.risk_level)}`}>
            <FiShield size={12} />
            {analysis.risk_level || 'Normal'} Risk
          </span>

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(analysis.id)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              title="Delete record"
            >
              <FiTrash2 size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 p-2.5 text-center border border-slate-100">
          <p className="text-[10px] font-bold uppercase text-slate-400">BPD</p>
          <p className="text-base font-extrabold text-slate-800">{analysis.bpd} <span className="text-[10px] text-slate-500 font-normal">mm</span></p>
        </div>

        <div className="rounded-xl bg-slate-50 p-2.5 text-center border border-slate-100">
          <p className="text-[10px] font-bold uppercase text-slate-400">OFD</p>
          <p className="text-base font-extrabold text-slate-800">{analysis.ofd} <span className="text-[10px] text-slate-500 font-normal">mm</span></p>
        </div>

        <div className="rounded-xl bg-cyan-50/60 p-2.5 text-center border border-cyan-100">
          <p className="text-[10px] font-bold uppercase text-cyan-700">Cephalic Index</p>
          <p className="text-base font-extrabold text-cyan-900">{analysis.cephalic_index}%</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-1 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <FiActivity className="text-blue-600" />
          Model Confidence: <span className="font-bold text-slate-900">{analysis.confidence}%</span>
        </div>
      </div>
    </motion.div>
  );
}
