import { motion } from 'framer-motion';
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export default function DiseaseRiskCard({ screening }) {
  if (!screening) return null;
  const isNormal = screening.primary_condition === 'Normal';
  const riskColor = screening.risk_level === 'Low' ? 'text-emerald-600' : screening.risk_level === 'Moderate' ? 'text-amber-600' : 'text-red-600';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
      <div className="flex items-start gap-3">
        {isNormal ? <FiCheckCircle className="mt-1 text-emerald-500" size={22} /> : <FiAlertTriangle className="mt-1 text-amber-500" size={22} />}
        <div>
          <h3 className="font-semibold text-slate-900">Disease Screening</h3>
          <p className="mt-1 text-lg font-bold text-slate-800">{screening.primary_condition}</p>
          <p className={`mt-1 text-sm font-medium ${riskColor}`}>
            Risk: {screening.risk_percentage}% ({screening.risk_level})
          </p>
          {screening.all_flags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {screening.all_flags.map((f) => (
                <span key={f} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{f}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
