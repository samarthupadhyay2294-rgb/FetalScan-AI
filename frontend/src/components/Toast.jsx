import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

export default function Toast({ type = 'success', message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed top-20 right-4 z-50 max-w-md"
      >
        <div
          className={`flex items-center gap-3 rounded-xl p-4 shadow-xl backdrop-blur-md border ${
            isSuccess
              ? 'bg-emerald-500/90 text-white border-emerald-400'
              : 'bg-rose-500/90 text-white border-rose-400'
          }`}
        >
          {isSuccess ? <FiCheckCircle size={22} className="shrink-0" /> : <FiAlertCircle size={22} className="shrink-0" />}
          <div className="flex-1 text-sm font-medium leading-snug">{message}</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-white/20 transition-colors"
            aria-label="Close notification"
          >
            <FiX size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
