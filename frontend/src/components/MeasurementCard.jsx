import { motion } from 'framer-motion';

export default function MeasurementCard({ label, value, unit, icon: Icon, color = 'primary' }) {
  const colors = {
    primary: 'from-primary/10 to-primary/5 text-primary',
    secondary: 'from-secondary/10 to-secondary/5 text-secondary',
    accent: 'from-accent/10 to-accent/5 text-accent',
  };
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`glass-card bg-gradient-to-br ${colors[color]} p-6`}
    >
      {Icon && <Icon className="mb-3" size={24} />}
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900">
        {value}<span className="ml-1 text-base font-normal text-slate-500">{unit}</span>
      </p>
    </motion.div>
  );
}
