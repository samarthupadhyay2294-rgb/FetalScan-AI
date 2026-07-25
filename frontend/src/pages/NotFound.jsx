import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl text-slate-600">Page not found</p>
      <Link to="/" className="btn-primary mt-8">Go Home</Link>
    </div>
  );
}
