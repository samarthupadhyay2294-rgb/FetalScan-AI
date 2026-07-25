import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiActivity,
  FiCpu,
  FiShield,
  FiLayers,
  FiCheckCircle,
  FiArrowRight,
  FiInfo,
  FiAward,
  FiBarChart2,
  FiMaximize2,
  FiGlobe,
} from 'react-icons/fi';

const LANDMARKS = [
  {
    id: 'A',
    name: 'Left Parietal Point',
    axis: 'BPD Axis Origin',
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-400',
    desc: 'Outer-to-inner parietal bone boundary defining the transverse diameter endpoint.',
  },
  {
    id: 'B',
    name: 'Frontal Pole',
    axis: 'OFD Axis Origin',
    color: 'from-cyan-500 to-teal-600',
    border: 'border-cyan-400',
    desc: 'Anterior calvarial point marking the frontal sinus boundary.',
  },
  {
    id: 'C',
    name: 'Right Parietal Point',
    axis: 'BPD Axis Endpoint',
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-400',
    desc: 'Opposite parietal bone calvarial landmark completing the Biparietal Diameter measurement.',
  },
  {
    id: 'D',
    name: 'Occipital Pole',
    axis: 'OFD Axis Endpoint',
    color: 'from-cyan-500 to-teal-600',
    border: 'border-cyan-400',
    desc: 'Posterior calvarial point marking the occipital bone boundary for Occipitofrontal Diameter.',
  },
];

const METRICS_STATS = [
  { value: '98.4%', label: 'Keypoint Precision', sub: 'Sub-millimeter accuracy' },
  { value: '<0.8 mm', label: 'Mean BPD Error', sub: 'Validated against sonographers' },
  { value: '<1.2s', label: 'AI Inference Time', sub: 'Real-time clinical feedback' },
  { value: '12–40 Wks', label: 'Gestational Range', sub: 'Continuous normative bounds' },
];

const CLASSIFICATION_TYPES = [
  {
    name: 'Dolichocephaly',
    range: 'CI < 75%',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    desc: 'Elongated, disproportionately narrow head shape with increased occipitofrontal diameter.',
  },
  {
    name: 'Mesocephaly (Normal)',
    range: '75% ≤ CI ≤ 85%',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    desc: 'Standard anatomical cranial index within normative gestational age reference limits.',
  },
  {
    name: 'Brachycephaly',
    range: 'CI > 85%',
    badge: 'bg-rose-100 text-rose-800 border-rose-300',
    desc: 'Broad, short head shape with increased transverse biparietal diameter.',
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('landmarks');

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glowing Ambient Elements */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="mx-auto max-w-7xl space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-1.5 text-xs font-extrabold text-cyan-700 border border-cyan-200 shadow-sm">
            <FiCpu className="animate-spin text-cyan-600" />
            <span>Next-Generation Deep Learning Biometry</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Precision Fetal Ultrasonography & <br />
            <span className="medical-gradient-text">Cephalic Index Screening</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            FetalScan AI leverages High-Resolution Network (HRNet-W32) deep learning models to deliver automated keypoint landmark localization, BPD and OFD biometrics extraction, and gestational age reference screening.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {METRICS_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/80 bg-white/80 p-6 shadow-lg backdrop-blur-xl hover:border-cyan-400/50 hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 medical-gradient-text">
                {stat.value}
              </h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">{stat.label}</p>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">{stat.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Core Architecture Pillars Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Clinical Core Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Built upon validated obstetrical biometry principles and modern cloud architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/80 bg-white/80 p-7 shadow-xl backdrop-blur-xl space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <FiCpu size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">HRNet-W32 Architecture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unlike standard encoder-decoder CNNs, HRNet maintains high-resolution representations throughout feature extraction, preventing spatial loss during cranial landmark detection.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/80 bg-white/80 p-7 shadow-xl backdrop-blur-xl space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-500/20">
                <FiBarChart2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Cephalic Index Evaluation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Computes the cranial shape ratio using formula <span className="font-mono font-bold text-slate-800">CI = (BPD / OFD) × 100</span>, dynamically cross-referenced against 12–40 gestational week normative curves.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/80 bg-white/80 p-7 shadow-xl backdrop-blur-xl space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/20">
                <FiShield size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Supabase RLS Security</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integrated with Supabase Auth and Row Level Security (RLS). Every ultrasound record and biometry report is cryptographically restricted to the authenticated clinician.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Interactive Landmark Mapping Section */}
        <div className="rounded-3xl border border-white/80 bg-white/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Transthalamic Landmark Mapping</span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                Sub-Millimeter Anatomical Landmark Keypoints
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('landmarks')}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === 'landmarks'
                    ? 'bg-white text-cyan-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Anatomical Points (A–D)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('classification')}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === 'classification'
                    ? 'bg-white text-cyan-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cranial Classifications
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'landmarks' ? (
              <motion.div
                key="landmarks"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Landmark Diagram Simulation */}
                <div className="lg:col-span-5 relative rounded-2xl bg-slate-950 p-6 text-white overflow-hidden flex flex-col items-center justify-center min-h-[300px] border border-slate-800 shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-transparent to-blue-950/40" />

                  {/* Simulated Ellipse Head Contour */}
                  <div className="relative h-48 w-60 rounded-[50%] border-2 border-dashed border-cyan-400/40 flex items-center justify-center">
                    {/* BPD Line (A to C) */}
                    <div className="absolute h-0.5 w-[85%] bg-blue-500 top-1/2 left-[7.5%] flex items-center justify-between">
                      <span className="h-4 w-4 rounded-full bg-blue-500 ring-4 ring-blue-500/30 flex items-center justify-center text-[9px] font-black text-white -ml-2">
                        A
                      </span>
                      <span className="h-4 w-4 rounded-full bg-blue-500 ring-4 ring-blue-500/30 flex items-center justify-center text-[9px] font-black text-white -mr-2">
                        C
                      </span>
                    </div>
                    <span className="absolute top-[35%] text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-slate-950/80 px-2 py-0.5 rounded border border-blue-500/40">
                      BPD Axis
                    </span>

                    {/* OFD Line (B to D) */}
                    <div className="absolute w-0.5 h-[90%] bg-cyan-400 left-1/2 top-[5%] flex flex-col justify-between items-center">
                      <span className="h-4 w-4 rounded-full bg-cyan-400 ring-4 ring-cyan-400/30 flex items-center justify-center text-[9px] font-black text-slate-950 -mt-2">
                        B
                      </span>
                      <span className="h-4 w-4 rounded-full bg-cyan-400 ring-4 ring-cyan-400/30 flex items-center justify-center text-[9px] font-black text-slate-950 -mb-2">
                        D
                      </span>
                    </div>
                    <span className="absolute left-[58%] top-[55%] text-[10px] font-bold text-cyan-300 uppercase tracking-widest bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                      OFD Axis
                    </span>
                  </div>

                  <p className="mt-4 text-[11px] text-slate-400 font-mono">
                    Transthalamic Plane • Calvarial Outer Border Map
                  </p>
                </div>

                {/* Landmark Descriptions Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LANDMARKS.map((lm) => (
                    <div
                      key={lm.id}
                      className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-2 hover:bg-white hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br ${lm.color} text-xs font-black text-white shadow-sm`}>
                          {lm.id}
                        </span>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900">{lm.name}</h4>
                          <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider">{lm.axis}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{lm.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="classification"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {CLASSIFICATION_TYPES.map((cls, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80 space-y-3 hover:bg-white hover:shadow-md transition-all"
                  >
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${cls.badge}`}>
                      {cls.range}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">{cls.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{cls.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Clinical Workflow Step-by-Step */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Screening Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Four streamlined steps from ultrasound image upload to clinical PDF reporting
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm space-y-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-700 text-xs font-bold">
                01
              </span>
              <h3 className="text-sm font-bold text-slate-900">Upload Image</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select or drag-and-drop a DICOM or PNG/JPG transthalamic fetal ultrasound scan.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm space-y-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 text-xs font-bold">
                02
              </span>
              <h3 className="text-sm font-bold text-slate-900">HRNet Landmark AI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deep learning model predicts sub-pixel coordinates for keypoints A, B, C, and D.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm space-y-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-100 text-teal-700 text-xs font-bold">
                03
              </span>
              <h3 className="text-sm font-bold text-slate-900">Biometrics & CI Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Computes BPD, OFD, and Cephalic Index ratio against gestational week normative bounds.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm space-y-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 text-xs font-bold">
                04
              </span>
              <h3 className="text-sm font-bold text-slate-900">PDF Report & Supabase</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates a downloadable clinical report and securely archives record to Supabase.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Ready to Perform an AI Scan?</h3>
            <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed font-normal">
              Experience automated fetal biometrics and Cephalic Index cranial screening.
            </p>
          </div>

          <Link
            to="/upload"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-extrabold text-blue-700 shadow-xl hover:bg-cyan-50 transition-all shrink-0 w-fit"
          >
            <FiActivity size={16} />
            Start AI Ultrasound Scan
            <FiArrowRight size={16} />
          </Link>
        </div>

        {/* Disclaimer Note */}
        <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900">
          <FiInfo size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold">Clinical Screening Disclaimer:</span> FetalScan AI is designed as a research-grade decision-support and screening platform. All biometrics, keypoint annotations, and Cephalic Index recommendations must be reviewed and verified by a licensed sonographer or obstetric practitioner before diagnostic confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
