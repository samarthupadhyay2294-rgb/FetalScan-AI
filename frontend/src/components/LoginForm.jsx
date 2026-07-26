import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import PasswordInput from './PasswordInput';
import Toast from './Toast';
import { validateEmail, validatePassword } from '../utils/validation';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passErr = !password ? 'Password is required.' : '';

    if (emailErr || passErr) {
      setErrors({
        email: emailErr,
        password: passErr,
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await login({ email, password });
      setToastType('success');
      setToastMessage('Welcome back to FetalScan AI!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 600);
    } catch (err) {
      console.error('Login error:', err.message);
      setToastType('error');
      setToastMessage('Invalid email or password.');
      setErrors({ auth: 'Invalid email or password.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast type={toastType} message={toastMessage} onClose={() => setToastMessage('')} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errors.auth && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-600 animate-fadeIn">
            {errors.auth}
          </div>
        )}

        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-slate-700 tracking-wide">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl border border-slate-200 bg-white/80 transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <FiMail size={18} />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="clinician@hospital.org"
              required
              autoComplete="email"
              className="w-full bg-transparent py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          {errors.email && <p className="text-xs font-medium text-rose-500">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
          }}
          error={errors.password}
          required
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <label className="flex items-center gap-2 font-medium text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
            />
            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="font-semibold text-cyan-700 hover:text-cyan-800 hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/35 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In to FetalScan
              <FiArrowRight size={18} />
            </>
          )}
        </button>

        <div className="relative my-3 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white/80 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Account Access
          </span>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-xs text-slate-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-cyan-700 hover:text-cyan-800 hover:underline">
            Create an Account
          </Link>
        </p>
      </form>
    </>
  );
}
