import AuthLayout from '../components/AuthLayout';
import SignupForm from '../components/SignupForm';

export default function Signup() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register as a clinician to begin automated fetal ultrasound biometry"
    >
      <SignupForm />
    </AuthLayout>
  );
}
