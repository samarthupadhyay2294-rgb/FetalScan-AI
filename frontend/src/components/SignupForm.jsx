import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import Toast from './Toast';
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateTerms,
} from '../utils/validation';

export default function SignupForm() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateFullName(fullName);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);
    const termsErr = validateTerms(acceptedTerms);

    if (nameErr || emailErr || passErr || confirmErr || termsErr) {
      setErrors({
        fullName: nameErr,
        email: emailErr,
        password: passErr,
        confirmPassword: confirmErr,
        terms: termsErr,
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await signUp({ fullName, email, password });

      setToastType('success');
      if (res?.session || res?.user) {
        setToastMessage('Account created successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      } else {
        setToastMessage('Account created. Please check your email to verify your account before logging in.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Signup error:', err.message);
      setToastType('error');
      if (err.message?.includes('already registered')) {
        setToastMessage('This email address is already registered.');
        setErrors({ email: 'This email address is already registered.' });
      } else {
        setToastMessage(err.message || 'Failed to create account. Please try again.');
        setErrors({ auth: err.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast type={toastType} message={toastMessage} onClose={() => setToastMessage('')} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {errors.auth && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-600 animate-fadeIn">
            {errors.auth}
          </div>
        )}

        {/* Full Name Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-xs font-semibold text-slate-700 tracking-wide">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl border border-slate-200 bg-white/80 transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <FiUser size={18} />
            </div>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
              }}
              placeholder="Dr. Eleanor Vance"
              required
              autoComplete="name"
              className="w-full bg-transparent py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          {errors.fullName && <p className="text-xs font-medium text-rose-500">{errors.fullName}</p>}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-email" className="text-xs font-semibold text-slate-700 tracking-wide">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl border border-slate-200 bg-white/80 transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <FiMail size={18} />
            </div>
            <input
              id="signup-email"
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
          id="signup-password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
          }}
          error={errors.password}
          required
          autoComplete="new-password"
        />

        {/* Password Strength Meter */}
        <PasswordStrength password={password} />

        {/* Confirm Password Field */}
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
          }}
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
        />

        {/* Terms Checkbox */}
        <div className="flex flex-col gap-1 pt-1">
          <label className="flex items-start gap-2 text-xs font-medium text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                if (errors.terms) setErrors((prev) => ({ ...prev, terms: '' }));
              }}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
            />
            <span>
              I accept the <span className="font-semibold text-slate-900">Terms of Service</span> and{' '}
              <span className="font-semibold text-slate-900">Privacy Policy</span> for clinical data processing.
            </span>
          </label>
          {errors.terms && <p className="text-xs font-medium text-rose-500">{errors.terms}</p>}
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
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <FiArrowRight size={18} />
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-600 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-cyan-700 hover:text-cyan-800 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
