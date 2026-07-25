import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiRefreshCw, FiSave, FiInfo, FiActivity } from 'react-icons/fi';
import MeasurementCard from '../components/MeasurementCard';
import ClassificationBadge from '../components/ClassificationBadge';
import CranialShapeGauge from '../components/CranialShapeGauge';
import ConfidenceGauge from '../components/ConfidenceGauge';
import { fetchReferenceRange, getDownloadUrl, resolveAssetUrl } from '../services/prediction';
import { analysisService } from '../services/analysisService';

export default function Prediction() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(state?.result || null);
  const [gaInput, setGaInput] = useState(20);
  const [refRange, setRefRange] = useState({ lower: 75, upper: 85 });
  const [loadingRef, setLoadingRef] = useState(false);

  useEffect(() => {
    if (!result) {
      const cached = sessionStorage.getItem('lastPrediction');
      if (cached) {
        const parsed = JSON.parse(cached);
        setResult(parsed);
        if (parsed.ga) setGaInput(parsed.ga);
      }
    } else if (result.ga) {
      setGaInput(result.ga);
    }
  }, [result]);

  useEffect(() => {
    if (result) {
      setRefRange({
        lower: result.reference_lower || 75,
        upper: result.reference_upper || 85,
      });

      // Persist analysis to logged-in user's Supabase database
      const saveToSupabase = async () => {
        try {
          const bpdVal = result.bpd || result.measurements?.bpd_mm || 0;
          const ofdVal = result.ofd || result.measurements?.ofd_mm || 0;
          const ciVal = result.ci || result.measurements?.cephalic_index || 0;
          const confVal = result.confidence || 95;
          const riskVal = result.classification === 'Normal' ? 'Low' : 'High';

          await analysisService.saveAnalysis({
            image_url: result.annotated_url || result.image_url || '',
            bpd: bpdVal,
            ofd: ofdVal,
            cephalic_index: ciVal,
            confidence: confVal,
            risk_level: riskVal,
          });
        } catch (err) {
          console.warn('Could not auto-save analysis to Supabase:', err.message);
        }
      };

      saveToSupabase();
    }
  }, [result]);

  const handleGaChange = async (newGa) => {
    setGaInput(newGa);
    setLoadingRef(true);
    try {
      const range = await fetchReferenceRange(newGa);
      if (range) {
        setRefRange({ lower: range.lower, upper: range.upper });
      }
    } catch {
      // Fallback calculation
      const lower = newGa < 22 ? 74 : 75;
      const upper = newGa < 29 ? 85 : 86;
      setRefRange({ lower, upper });
    } finally {
      setLoadingRef(false);
    }
  };

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-slate-600">No prediction data found.</p>
          <Link to="/upload" className="btn-primary mt-4 inline-block">Upload Image</Link>
        </div>
      </div>
    );
  }

  // Extract core values
  const bpd = result.bpd || result.measurements?.bpd_mm || 0;
  const ofd = result.ofd || result.measurements?.ofd_mm || 0;
  const ci = result.ci || result.measurements?.cephalic_index || 0;
  const classification = result.classification || 'Normal';
  const badgeStatus = result.badge_status || (classification === 'Normal' ? 'green' : 'red');
  const annotatedUrl = resolveAssetUrl(result.annotated_url);
  const originalUrl = resolveAssetUrl(result.image_url);

  // Compute live classification against selected GA range
  let liveClassification = classification;
  if (ci < refRange.lower) liveClassification = 'Dolichocephalic';
  else if (ci > refRange.upper) liveClassification = 'Brachycephalic';
  else liveClassification = 'Normal';

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">Cephalic Index Screening Dashboard</h1>
              <ClassificationBadge classification={liveClassification} badgeStatus={badgeStatus} size="lg" />
            </div>
            <p className="mt-1 text-slate-600">
              Report ID: #{result.id} {result.patient_id && `| Patient: ${result.patient_id}`} | GA: {gaInput} Weeks
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href={getDownloadUrl(result.id)} download className="btn-primary flex items-center gap-2">
              <FiDownload className="h-4 w-4" /> Download PDF Report
            </a>
          </div>
        </motion.div>

        {/* Screening Disclaimer Banner */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 text-blue-900">
          <FiInfo className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
          <div className="text-sm">
            <span className="font-semibold">Research & Screening Tool Notice: </span>
            {result.disclaimer || "This tool is intended for research and screening purposes only. It is not a diagnostic device and should not replace clinical judgment."}
          </div>
        </div>

        {/* Ultrasound Images Display */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass-card p-4">
            <h3 className="mb-3 font-semibold text-slate-800 flex items-center gap-2">
              <FiActivity className="text-primary" /> Original Ultrasound Image
            </h3>
            {originalUrl ? (
              <img src={originalUrl} alt="Original ultrasound scan" className="w-full rounded-xl object-contain bg-slate-950 max-h-[360px]" />
            ) : (
              <div className="h-64 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">No Image</div>
            )}
          </div>

          <div className="glass-card p-4">
            <h3 className="mb-3 font-semibold text-slate-800 flex items-center gap-2">
              <FiActivity className="text-emerald-600" /> HRNet Annotated Landmarks (BPD / OFD)
            </h3>
            {annotatedUrl ? (
              <img src={annotatedUrl} alt="Annotated landmarks" className="w-full rounded-xl object-contain bg-slate-950 max-h-[360px]" />
            ) : (
              <div className="h-64 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">No Image</div>
            )}
          </div>
        </div>

        {/* Core Metric Cards */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Biometric Measurements & Reference Cards</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MeasurementCard label="BPD (Biparietal)" value={bpd} unit="mm" color="primary" />
            <MeasurementCard label="OFD (Occipitofrontal)" value={ofd} unit="mm" color="secondary" />
            <MeasurementCard label="Cephalic Index (CI)" value={ci} unit="%" color="accent" />
            <MeasurementCard label="Reference Range" value={`${refRange.lower}–${refRange.upper}`} unit="CI" color="primary" />
          </div>
        </div>

        {/* Interactive Gestational Age Selector */}
        <div className="mt-6 glass-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900">Gestational Age Reference Lookup</h3>
              <p className="text-xs text-slate-500">Adjust Gestational Age (weeks) to compare CI against specific reference bounds.</p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="ga-slider" className="text-sm font-medium text-slate-700">GA: <span className="font-bold text-primary">{gaInput} wks</span></label>
              <input
                id="ga-slider"
                type="range"
                min="12"
                max="40"
                value={gaInput}
                onChange={(e) => handleGaChange(Number(e.target.value))}
                className="w-36 accent-primary"
              />
              {loadingRef && <span className="text-xs text-slate-400">Updating...</span>}
            </div>
          </div>
        </div>

        {/* Gauge Meter & Visual Progress Bar */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CranialShapeGauge ci={ci} lower={refRange.lower} upper={refRange.upper} classification={liveClassification} />
          </div>
          <ConfidenceGauge value={result.confidence || 95} />
        </div>

        {/* Clinical Report Summary & Recommendations */}
        <div className="mt-8 glass-card p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Clinical Screening Report</h3>
            <ClassificationBadge classification={liveClassification} badgeStatus={badgeStatus} />
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Screening Interpretation</h4>
              <p className="mt-1 text-sm font-medium text-slate-800">{result.interpretation || "Cephalic Index is within the expected reference range."}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Evidence-Based Recommendation</h4>
              <p className="mt-1 text-sm font-medium text-slate-800">
                • {result.recommendation || "Routine fetal follow-up."}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs italic text-slate-500">{result.disclaimer}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={getDownloadUrl(result.id)} download className="btn-primary flex items-center gap-2">
            <FiDownload /> Download PDF Report
          </a>
          <Link to={`/report/${result.id}`} className="btn-secondary flex items-center gap-2">
            <FiSave /> Detailed Report View
          </Link>
          <button type="button" onClick={() => navigate('/upload')} className="btn-secondary flex items-center gap-2">
            <FiRefreshCw /> Analyze New Scan
          </button>
        </div>
      </div>
    </div>
  );
}
