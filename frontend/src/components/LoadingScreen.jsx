import { motion } from 'framer-motion';
import { FiActivity } from 'react-icons/fi';

export default function LoadingScreen({ message = 'Loading FetalScan AI...' }) {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-6">
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25"
      >
        <FiActivity size={32} />
        <span className="absolute -inset-1 rounded-2xl bg-cyan-400/20 blur-md animate-pulse-ring" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-sm font-medium text-slate-600"
      >
        {message}
      </motion.p>
    </div>
  );
}
