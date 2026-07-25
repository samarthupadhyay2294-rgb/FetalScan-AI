import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20">
      <div className="mx-auto max-w-xl px-4 md:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Contact & Newsletter</h1>
        <p className="mt-2 text-slate-600">Get in touch or subscribe for research updates.</p>

        {submitted ? (
          <div className="mt-8 glass-card p-6 text-center text-emerald-700">
            Thank you! We&apos;ll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 glass-card p-6">
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input required type="text" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input required type="email" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Message</span>
              <textarea rows={4} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" /> Subscribe to newsletter
            </label>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
}
