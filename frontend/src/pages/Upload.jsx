import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UploadCard from '../components/UploadCard';
import AIProcessingAnimation from '../components/AIProcessingAnimation';
import { runPrediction } from '../services/prediction';

const STAGES = [
  'Validating image...',
  'Preprocessing & resizing...',
  'Loading HRNet model...',
  'Predicting cranial landmarks...',
  'Measuring BPD & OFD biometrics...',
  'Calculating Cephalic Index (CI)...',
  'Evaluating gestational age reference range...',
  'Classifying cranial morphology...',
  'Generating screening report...',
];

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [gestationalAge, setGestationalAge] = useState('20');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [error, setError] = useState('');

  const handleFileSelect = useCallback((f) => {
    setError('');
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }, []);

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError('');
  };

  const simulateProgress = () => {
    let i = 0;
    const interval = setInterval(() => {
      setProgress(Math.min(92, (i + 1) * 11));
      setStage(STAGES[Math.min(i, STAGES.length - 1)]);
      i += 1;
      if (i >= STAGES.length) clearInterval(interval);
    }, 450);
    return interval;
  };

  const handlePredict = async () => {
    if (!file) {
      setError('Please select an ultrasound image first.');
      return;
    }
    setLoading(true);
    setError('');
    setProgress(0);
    const interval = simulateProgress();
    try {
      const result = await runPrediction(file, patientId, gestationalAge);
      setProgress(100);
      setStage('Complete!');
      sessionStorage.setItem('lastPrediction', JSON.stringify(result));
      navigate('/prediction', { state: { result } });
    } catch (err) {
      setError(err.message || 'Prediction failed');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Fetal Ultrasound Scan Upload</h1>
          <p className="mt-2 text-slate-600">
            Upload a transthalamic fetal ultrasound image for HRNet cranial landmark detection,
            Biometric measurements (BPD, OFD), and Cephalic Index (CI) shape screening.
          </p>
        </motion.div>

        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Patient ID (optional)</span>
              <input
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="e.g. PAT-2026-001"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Gestational Age (weeks)</span>
              <input
                type="number"
                min="12"
                max="40"
                value={gestationalAge}
                onChange={(e) => setGestationalAge(e.target.value)}
                placeholder="e.g. 20"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>

          <UploadCard
            file={file}
            preview={preview}
            onFileSelect={handleFileSelect}
            onRemove={handleRemove}
            onReplace={() => { handleRemove(); document.querySelector('input[type=file]')?.click(); }}
            error={error}
          />

          {loading ? (
            <AIProcessingAnimation progress={progress} stage={stage} />
          ) : (
            <button
              type="button"
              onClick={handlePredict}
              disabled={!file}
              className="btn-primary w-full disabled:opacity-50 text-base py-3.5"
            >
              Analyze & Screen Cephalic Index
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
