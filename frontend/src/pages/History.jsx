import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiActivity, FiPlus, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import AnalysisCard from '../components/AnalysisCard';
import LoadingScreen from '../components/LoadingScreen';
import Toast from '../components/Toast';

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analysisService.getUserAnalyses();
      setAnalyses(data);
    } catch (err) {
      console.error('Error fetching scan history:', err);
      setError('Failed to load prediction history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scan record?')) return;
    try {
      await analysisService.deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
      setToastMessage('Analysis record deleted successfully.');
    } catch (err) {
      console.error('Failed to delete analysis:', err);
      setToastMessage('Failed to delete record.');
    }
  };

  if (loading) {
    return <LoadingScreen message="Fetching your ultrasound prediction history..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <Toast type="success" message={toastMessage} onClose={() => setToastMessage('')} />

      <div className="mx-auto max-w-6xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Prediction <span className="medical-gradient-text">History</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Complete archive of your authenticated ultrasound biometry analyses & risk screenings
            </p>
          </div>

          <Link
            to="/upload"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all w-fit"
          >
            <FiPlus size={16} />
            New Scan Analysis
          </Link>
        </motion.div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-600 flex items-center gap-2">
            <FiAlertCircle size={18} />
            {error}
          </div>
        )}

        {analyses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 p-12 text-center backdrop-blur-md"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 mb-4">
              <FiClock size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Prediction History Found</h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              You haven't generated any ultrasound biometry predictions yet. Upload an ultrasound image to analyze BPD, OFD, and Cephalic Index.
            </p>
            <Link
              to="/upload"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all"
            >
              <FiActivity size={16} />
              Perform First Scan
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {analyses.map((item) => (
                <AnalysisCard key={item.id} analysis={item} onDelete={handleDelete} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
