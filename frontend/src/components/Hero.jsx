import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiUploadCloud } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient bg-mesh pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            AI-Powered Fetal Biometrics
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Precision ultrasound analysis
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Upload a fetal head circumference ultrasound image and instantly receive BPD, OFD,
            cephalic index, disease screening, and a downloadable clinical-style PDF report.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/upload" className="btn-primary">
              <FiUploadCloud /> Upload Ultrasound
            </Link>
            <Link to="/dashboard" className="btn-secondary">
              View Dashboard <FiArrowRight />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card animate-float p-6">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary/40 p-6 shadow-2xl">
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.35),transparent_55%)]" />
                <div className="absolute left-[20%] top-[35%] h-40 w-52 rounded-[50%] border-2 border-cyan-300/50 bg-cyan-400/10 blur-[1px]" />
                <div className="absolute left-[18%] top-[33%] h-44 w-56 rounded-[50%] border border-white/20" />
                {['A', 'B', 'C', 'D'].map((pt, i) => (
                  <motion.span
                    key={pt}
                    className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-primary shadow-lg"
                    style={{
                      left: `${25 + i * 15}%`,
                      top: `${30 + (i % 2) * 20}%`,
                    }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                  >
                    {pt}
                  </motion.span>
                ))}
                <motion.div
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'BPD', value: '47.2 mm' },
                { label: 'OFD', value: '58.1 mm' },
                { label: 'CI', value: '81.2%' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{s.label}</p>
                  <p className="font-bold text-primary">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
