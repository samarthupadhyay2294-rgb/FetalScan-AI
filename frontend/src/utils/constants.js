const rawApiBase = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';
export const API_BASE = rawApiBase.endsWith('/') ? rawApiBase.slice(0, -1) : rawApiBase;
export const BACKEND_ORIGIN = API_BASE;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  PREDICT: '/predict',
  UPLOAD: '/upload',
  HISTORY: '/history',
  PROFILE: '/profile',
  REPORTS: '/reports',
};

export const AUTH_MESSAGES = {
  SIGNUP_SUCCESS: 'Account created successfully.',
  LOGIN_SUCCESS: 'Welcome back to FetalScan AI!',
  LOGOUT_SUCCESS: 'You have been signed out successfully.',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully.',
  PASSWORD_RESET_SENT: 'Password reset instructions have been sent to your email.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_REQUIRED: 'Please enter your email.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_LENGTH: 'Password must contain at least 8 characters.',
  CONFIRM_PASSWORD_MISMATCH: 'Passwords do not match.',
  TERMS_REQUIRED: 'Please accept the Terms and Privacy Policy.',
  FULL_NAME_REQUIRED: 'Full name is required.',
};

export default API_BASE;
