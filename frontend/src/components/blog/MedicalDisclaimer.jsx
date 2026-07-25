import { FiShield } from 'react-icons/fi';

export default function MedicalDisclaimer() {
  return (
    <div className="rounded-3xl border border-cyan-200 bg-cyan-50/60 p-6 shadow-sm backdrop-blur-md my-8">
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-md shadow-cyan-500/20">
          <FiShield size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-cyan-950">Medical & Educational Disclaimer</h4>
          <p className="text-xs text-cyan-900 leading-relaxed font-normal">
            FetalScan AI educational content is provided for informational and research purposes only and does not replace professional medical advice, diagnosis, or treatment. Ultrasound measurements and AI-generated biometric assessments must be interpreted by qualified healthcare professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
