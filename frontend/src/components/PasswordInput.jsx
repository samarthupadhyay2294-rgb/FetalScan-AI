import { useState } from 'react';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';

export default function PasswordInput({
  id = 'password',
  label = 'Password',
  value,
  onChange,
  error,
  placeholder = '••••••••',
  required = true,
  autoComplete = 'current-password',
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold text-slate-700 tracking-wide">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      </div>

      <div className="relative rounded-xl border border-slate-200 bg-white/80 transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          <FiLock size={18} />
        </div>
        <input
          id={id}
          name={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className="w-full bg-transparent py-3 pl-10 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>

      {error && <p className="text-xs font-medium text-rose-500 animate-fadeIn">{error}</p>}
    </div>
  );
}
