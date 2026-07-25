import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiActivity, FiClock, FiPlus, FiShield, FiTrendingUp } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { analysisService } from '../services/analysisService';
import AnalysisCard from '../components/AnalysisCard';
import LoadingScreen from '../components/LoadingScreen';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const displayName = profile?.full_name || user?.user_metadata?.full_name || 'Clinician';

  useEffect(() => {
    analysisService.getUserAnalyses()
      .then((data) => setAnalyses(data))
      .catch((err) => {
        console.error('Dashboard load error:', err);
        setError('Failed to load user analyses from Supabase.');
      })
      .finally(() => setLoading(false));
  }, []);

  const totalScans = analyses.length;
  const normalScans = analyses.filter((a) => (a.risk_level || 'Low').toLowerCase() === 'low').length;
  const flaggedScans = totalScans - normalScans;

  if (loading) {
    return <LoadingScreen message="Loading clinician dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Clinician Workspace</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Welcome back, <span className="medical-gradient-text">{displayName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              AI ultrasound biometry overview and active patient analysis records
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/history"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:border-cyan-500 hover:text-cyan-600 transition-all"
            >
              <FiClock size={16} />
              View All Scans
            </Link>

            <Link
              to="/upload"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-600 transition-all"
            >
              <FiPlus size={16} />
              New Ultrasound Scan
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur-md flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Scans</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{totalScans}</h3>
              <p className="text-[11px] text-cyan-600 mt-1 font-medium flex items-center gap-1">
                <FiTrendingUp /> Saved in Supabase
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FiActivity size={24} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur-md flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-500">Normal Biometry</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">{normalScans}</h3>
              <p className="text-[11px] text-emerald-600 mt-1 font-medium flex items-center gap-1">
                <FiShield /> Low risk screening
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <FiShield size={24} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur-md flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-500">Flagged Risk Cases</p>
              <h3 className="text-2xl font-black text-amber-600 mt-1">{flaggedScans}</h3>
              <p className="text-[11px] text-amber-600 mt-1 font-medium">Moderate / High risk</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <FiClock size={24} />
            </div>
          </motion.div>
        </div>

        {/* Recent Scans Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Recent Ultrasound Scans</h2>
            <Link to="/history" className="text-xs font-bold text-cyan-600 hover:underline">
              View All ({totalScans})
            </Link>
          </div>

          {error && (
            <div className="rounded-2xl bg-rose-50 p-4 text-xs font-semibold text-rose-600 border border-rose-200">
              {error}
            </div>
          )}

          {analyses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">
              <p className="text-sm font-medium text-slate-600">No ultrasound scans recorded yet.</p>
              <Link
                to="/upload"
                className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-cyan-600 hover:underline"
              >
                Upload your first fetal ultrasound scan
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyses.slice(0, 6).map((item) => (
                <AnalysisCard key={item.id} analysis={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
