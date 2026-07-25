import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Timeline from '../components/Timeline';
import FAQ from '../components/FAQ';
import { FiCpu, FiDatabase, FiLayers } from 'react-icons/fi';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Timeline />
      <section className="bg-white py-20" id="research">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="section-title text-center">Research & Technology</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            FetalScan AI uses HRNet-W32 heatmap regression trained on fetal head circumference ultrasound images
            with Albumentations preprocessing matching the original research notebook pipeline.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: FiCpu, title: 'PyTorch + timm', desc: 'HRNet-W32 backbone with 1x1 conv landmark head.' },
              { icon: FiLayers, title: 'FastAPI Pipeline', desc: 'Modular inference, screening, PDF, and SQLite storage.' },
              { icon: FiDatabase, title: '622 Image Dataset', desc: 'Ground truth landmarks for BPD and OFD endpoints.' },
            ].map((t) => (
              <div key={t.title} className="glass-card p-6">
                <t.icon className="text-primary" size={28} />
                <h3 className="mt-3 font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQ />
      <section className="bg-gradient-to-r from-primary to-secondary py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="text-3xl font-bold">Ready to analyze your ultrasound?</h2>
          <p className="mt-3 opacity-90">Upload an image and get instant AI-powered biometric screening.</p>
          <Link to="/upload" className="mt-6 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-primary shadow-lg hover:bg-slate-50">
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
