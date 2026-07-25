import { Link } from 'react-router-dom';
import { FiGithub, FiMail, FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <h3 className="text-lg font-bold text-slate-900">FetalScan AI</h3>
          <p className="mt-2 max-w-md text-sm text-slate-600">
            AI-powered fetal ultrasound biometric screening for research and educational use.
            Built with HRNet deep learning for precise landmark detection.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link to="/upload" className="hover:text-primary">Upload Scan</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><FiMail /> research@fetalscan.ai</li>
            <li className="flex items-center gap-2"><FiGithub /> github.com/fetalscan-ai</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">
        <p className="flex items-center justify-center gap-1">
          © 2026 FetalScan AI. Made with <FiHeart className="text-red-400" /> for medical research.
        </p>
        <p className="mt-1 max-w-3xl mx-auto px-4">
          This software is intended only for research and educational screening purposes. It is not a medical diagnosis.
        </p>
      </div>
    </footer>
  );
}
