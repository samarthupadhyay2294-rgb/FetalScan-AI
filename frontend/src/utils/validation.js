import { AUTH_MESSAGES } from './constants';

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return AUTH_MESSAGES.EMAIL_REQUIRED;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return AUTH_MESSAGES.INVALID_EMAIL;
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return AUTH_MESSAGES.PASSWORD_REQUIRED;
  }
  if (password.length < 8) {
    return AUTH_MESSAGES.PASSWORD_LENGTH;
  }
  return '';
};

export const validateFullName = (fullName) => {
  if (!fullName || !fullName.trim()) {
    return AUTH_MESSAGES.FULL_NAME_REQUIRED;
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }
  if (password !== confirmPassword) {
    return AUTH_MESSAGES.CONFIRM_PASSWORD_MISMATCH;
  }
  return '';
};

export const validateTerms = (accepted) => {
  if (!accepted) {
    return AUTH_MESSAGES.TERMS_REQUIRED;
  }
  return '';
};

export const getPasswordRequirements = (password = '') => {
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  let score = 0;
  if (minLength) score += 25;
  if (hasUpper) score += 25;
  if (hasLower) score += 25;
  if (hasNumber) score += 25;

  let label = 'Weak';
  let color = 'bg-rose-500';

  if (score >= 100) {
    label = 'Strong';
    color = 'bg-emerald-500';
  } else if (score >= 50) {
    label = 'Medium';
    color = 'bg-amber-500';
  }

  return {
    score,
    label,
    color,
    checks: {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
    },
  };
};
