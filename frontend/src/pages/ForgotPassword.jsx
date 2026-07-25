import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import AuthLayout from '../components/AuthLayout';
import Toast from '../components/Toast';
import { validateEmail } from '../utils/validation';
import { authService } from '../services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    if (emailErr) {
      setError(emailErr);
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await authService.resetPassword(email);
      setIsSubmitted(true);
      setToastMessage('Password reset instructions have been sent to your email.');
    } catch (err) {
      console.error('Password reset error:', err);
      // Security standard: don't expose backend existence, show success screen regardless
      setIsSubmitted(true);
      setToastMessage('Password reset instructions have been sent to your email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your clinician email to receive password reset instructions"
    >
      <Toast type="success" message={toastMessage} onClose={() => setToastMessage('')} />

      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <FiCheckCircle size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Check Your Email</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              If an account is associated with <span className="font-semibold text-slate-900">{email}</span>, password reset instructions have been sent.
            </p>
          </div>
          <Link
            to="/login"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all"
          >
            <FiArrowLeft size={16} /> Return to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reset-email" className="text-xs font-semibold text-slate-700 tracking-wide">
              Registered Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-xl border border-slate-200 bg-white/80 transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <FiMail size={18} />
              </div>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="clinician@hospital.org"
                required
                autoComplete="email"
                className="w-full bg-transparent py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {error && <p className="text-xs font-medium text-rose-500">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              'Send Reset Instructions'
            )}
          </button>

          <p className="text-center text-xs text-slate-600 pt-2">
            Remembered your password?{' '}
            <Link to="/login" className="font-bold text-cyan-700 hover:text-cyan-800 hover:underline">
              Back to Sign In
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
