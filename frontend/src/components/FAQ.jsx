import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  { q: 'What images are supported?', a: 'PNG, JPG, JPEG, BMP, and TIFF fetal ultrasound images up to 10 MB.' },
  { q: 'Is this a medical diagnosis?', a: 'No. FetalScan AI is for research and educational screening only. Always consult qualified clinicians.' },
  { q: 'Which model is used?', a: 'A trained HRNet-W32 landmark detector (best_hrnet.pth) predicts 4 skull landmarks for BPD and OFD.' },
  { q: 'How is confidence calculated?', a: 'Confidence is derived from heatmap peak activations across all four predicted landmarks.' },
  { q: 'Can I download reports?', a: 'Yes. Each prediction generates a PDF report with measurements, screening results, and QR verification.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-20" id="faq">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <h2 className="section-title text-center">Frequently asked questions</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="glass-card overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                {f.q}
                <FiChevronDown className={`transition ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-slate-600">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
