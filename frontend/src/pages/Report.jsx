import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchReport, getDownloadUrl } from '../services/prediction';
import { FiDownload, FiInfo, FiArrowLeft } from 'react-icons/fi';
import ClassificationBadge from '../components/ClassificationBadge';

export default function Report() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReport(id)
      .then(setReport)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="pt-28 text-center text-red-600 font-semibold">{error}</div>;
  if (!report) return <div className="pt-28 text-center"><div className="mx-auto h-40 max-w-lg shimmer rounded-2xl" /></div>;

  const classification = report.classification || report.disease || 'Normal';
  const ci = report.ci || report.cephalic_index || '—';
  const refLower = report.reference_lower || 75;
  const refUpper = report.reference_upper || 85;

  let badgeStatus = 'green';
  if (classification === 'Dolichocephalic' || classification === 'Brachycephalic') {
    badgeStatus = 'red';
  }

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">Ultrasound Report #{report.id}</h1>
              <ClassificationBadge classification={classification} badgeStatus={badgeStatus} size="lg" />
            </div>
            <p className="mt-1 text-slate-600">
              Patient: {report.patient_id || 'N/A'} | Date: {report.created_at ? new Date(report.created_at).toLocaleString() : 'N/A'}
            </p>
          </div>
          <a href={getDownloadUrl(report.id)} download className="btn-primary flex items-center gap-2">
            <FiDownload /> Download PDF
          </a>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 text-blue-900">
          <FiInfo className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
          <div className="text-sm">
            <span className="font-semibold">Research & Screening Notice: </span>
            {report.disclaimer || "This tool is intended for research and screening purposes only. It is not a diagnostic device and should not replace clinical judgment."}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-3">Biometric Measurements</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-50 pb-2"><dt className="text-slate-600">BPD (Biparietal Diameter)</dt><dd className="font-bold text-slate-900">{report.bpd || report.bpd_mm} mm</dd></div>
              <div className="flex justify-between border-b border-slate-50 pb-2"><dt className="text-slate-600">OFD (Occipitofrontal Diameter)</dt><dd className="font-bold text-slate-900">{report.ofd || report.ofd_mm} mm</dd></div>
              <div className="flex justify-between border-b border-slate-50 pb-2"><dt className="text-slate-600">Calculated Cephalic Index (CI)</dt><dd className="font-bold text-primary">{ci}</dd></div>
              <div className="flex justify-between border-b border-slate-50 pb-2"><dt className="text-slate-600">Gestational Age</dt><dd className="font-medium text-slate-900">{report.ga || report.gestational_age_weeks || 20} weeks</dd></div>
              <div className="flex justify-between"><dt className="text-slate-600">Expected Reference Range</dt><dd className="font-medium text-emerald-700">{refLower}–{refUpper} CI</dd></div>
            </dl>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-3">Screening Interpretation & Guidance</h3>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Interpretation</h4>
                <p className="mt-1 text-sm text-slate-800 font-medium">
                  {report.interpretation || "Cephalic Index is within the expected reference range for this gestational age."}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recommendation</h4>
                <p className="mt-1 text-sm text-slate-800 font-medium">
                  • {report.recommendation || "Routine fetal follow-up."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link to="/dashboard" className="btn-secondary flex items-center gap-2">
            <FiArrowLeft /> Back to History
          </Link>
          <a href={getDownloadUrl(report.id)} download className="btn-primary flex items-center gap-2">
            <FiDownload /> Export Official Report (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}
