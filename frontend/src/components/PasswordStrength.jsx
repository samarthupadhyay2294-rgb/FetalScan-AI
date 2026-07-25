import { getPasswordRequirements } from '../utils/validation';

export default function PasswordStrength({ password = '' }) {
  if (!password) return null;

  const { score, label, color, checks } = getPasswordRequirements(password);

  const requirements = [
    { key: 'minLength', text: '8+ characters', met: checks.minLength },
    { key: 'hasUpper', text: 'Uppercase letter', met: checks.hasUpper },
    { key: 'hasLower', text: 'Lowercase letter', met: checks.hasLower },
    { key: 'hasNumber', text: 'Number', met: checks.hasNumber },
  ];

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>Password Strength:</span>
        <span className={`font-bold ${score >= 100 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
          {label}
        </span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {requirements.map((req) => (
          <div key={req.key} className="flex items-center gap-1.5 text-xs">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                req.met ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-400'
              }`}
            >
              {req.met ? '✓' : '•'}
            </span>
            <span className={req.met ? 'text-slate-700 font-medium' : 'text-slate-400'}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
