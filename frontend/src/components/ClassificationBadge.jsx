import { FiCheckCircle, FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';

export default function ClassificationBadge({ classification = 'Normal', badgeStatus = 'green', size = 'md' }) {
  let colorStyle = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  let Icon = FiCheckCircle;

  if (badgeStatus === 'yellow' || classification === 'Borderline') {
    colorStyle = 'bg-amber-100 text-amber-800 border-amber-300';
    Icon = FiAlertTriangle;
  } else if (badgeStatus === 'red' || classification === 'Dolichocephalic' || classification === 'Brachycephalic') {
    colorStyle = 'bg-rose-100 text-rose-800 border-rose-300';
    Icon = FiAlertCircle;
  }

  const py = size === 'lg' ? 'py-2 px-5 text-base' : 'py-1 px-3 text-sm';

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border font-semibold ${colorStyle} ${py}`}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{classification}</span>
    </span>
  );
}
