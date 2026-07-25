import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your clinician account to access FetalScan AI"
    >
      <LoginForm />
    </AuthLayout>
  );
}
