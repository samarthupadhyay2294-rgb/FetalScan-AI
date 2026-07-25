import { motion } from 'framer-motion';

export default function ConfidenceGauge({ value = 0 }) {
  const pct = Math.min(100, Math.max(0, value));
  const color = pct >= 80 ? '#14B8A6' : pct >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <div className="glass-card p-6 text-center">
      <p className="text-sm font-medium text-slate-500">Model Confidence</p>
      <div className="relative mx-auto mt-4 h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${pct * 3.14} 314`}
            initial={{ strokeDasharray: '0 314' }}
            animate={{ strokeDasharray: `${pct * 3.14} 314` }}
            transition={{ duration: 1 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">{pct.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
