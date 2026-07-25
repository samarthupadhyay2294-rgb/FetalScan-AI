import { motion } from 'framer-motion';
import { FiCpu, FiFileText, FiShield, FiTrendingUp, FiZap, FiTarget } from 'react-icons/fi';

const features = [
  { icon: FiCpu, title: 'Landmark AI', desc: 'Detects 4 skull landmarks with trained heatmap regression.' },
  { icon: FiTarget, title: 'Biometric Measurements', desc: 'Automatic BPD, OFD, cephalic index, and pixel-to-mm conversion.' },
  { icon: FiShield, title: 'Disease Screening', desc: 'Flags microcephaly, macrocephaly, hydrocephalus, and head shape anomalies.' },
  { icon: FiFileText, title: 'PDF Reports', desc: 'Generate professional downloadable reports with QR verification.' },
  { icon: FiTrendingUp, title: 'Interactive Dashboard', desc: 'Visualize risk charts, confidence gauges, and prediction history.' },
  { icon: FiZap, title: 'Real-time Pipeline', desc: 'End-to-end inference from upload to annotated image in seconds.' },
];

export default function Features() {
  return (
    <section className="py-20" id="features">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-center"
        >
          Built for <span className="gradient-text">clinical-grade screening</span>
        </motion.h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
