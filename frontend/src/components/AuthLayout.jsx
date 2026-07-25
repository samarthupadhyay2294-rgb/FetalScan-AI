import { motion } from 'framer-motion';
import { FiActivity, FiShield, FiCpu, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/auth.css';
import '../styles/animations.css';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="relative min-h-screen w-full auth-background flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden pt-24">
      {/* Background Glowing Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Medical AI Visual & Branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex flex-col justify-center px-4 lg:px-8 space-y-6"
        >
          <Link to="/" className="inline-flex items-center gap-3 w-fit group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <FiActivity size={26} />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                FetalScan <span className="medical-gradient-text">AI</span>
              </span>
              <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">Clinical Biometry System</p>
            </div>
          </Link>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              AI-Powered Precision in <span className="medical-gradient-text">Fetal Ultrasonography</span>
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Automated HRNet deep learning biometry analysis for BPD, OFD, Cephalic Index estimation, and early microcephaly & dolichocephaly risk assessment.
            </p>
          </div>

          {/* Animated Ultrasound Graphic Card */}
          <div className="relative rounded-2xl border border-white/60 bg-white/40 p-6 backdrop-blur-md shadow-lg space-y-4 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 animate-scan-line" />

            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <FiCpu className="text-cyan-600 animate-pulse" size={16} />
                Deep Learning Biometry Model
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                HRNet Ready
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <FiCheckCircle className="text-blue-600" /> BPD Detection (mm)
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <FiCheckCircle className="text-cyan-600" /> OFD Detection (mm)
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <FiCheckCircle className="text-teal-600" /> Cephalic Index (CI)
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <FiShield className="text-blue-600" /> HIPAA Compliant RLS
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Auth Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-6 flex justify-center"
        >
          <div className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
              {subtitle && <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p>}
            </div>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
