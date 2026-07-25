import { motion } from 'framer-motion';

export default function AIProcessingAnimation({ progress = 0, stage = 'Processing...' }) {
  return (
    <div className="glass-card p-8 text-center" role="status" aria-live="polite">
      <motion.div
        className="mx-auto h-24 w-24 rounded-full border-4 border-primary/20 border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
      />
      <p className="mt-6 font-semibold text-slate-900">{stage}</p>
      <div className="mx-auto mt-4 h-2 max-w-xs overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <p className="mt-2 text-sm text-slate-500">{progress}%</p>
    </div>
  );
}
