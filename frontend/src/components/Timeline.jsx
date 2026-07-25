const steps = [
  { title: 'Upload', desc: 'Drag & drop a fetal HC ultrasound image.' },
  { title: 'Preprocess', desc: 'Resize, normalize, and validate the scan.' },
  { title: 'HRNet Inference', desc: 'Predict A, B, C, D skull landmarks.' },
  { title: 'Biometrics', desc: 'Calculate BPD, OFD, and cephalic index.' },
  { title: 'Screening', desc: 'Assess disease risk with confidence scores.' },
  { title: 'Report', desc: 'Download annotated image and PDF report.' },
];

export default function Timeline() {
  return (
    <section className="bg-white py-20" id="timeline">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="section-title text-center">How it works</h2>
        <div className="relative mt-12">
          <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary to-secondary md:left-1/2 md:block" />
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.title} className={`relative flex flex-col md:flex-row ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-4 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-primary shadow md:left-1/2 md:block" />
                <div className="md:w-1/2 md:px-8">
                  <div className="glass-card ml-10 p-5 md:ml-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Step {i + 1}</span>
                    <h3 className="mt-1 font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
