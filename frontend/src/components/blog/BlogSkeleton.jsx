export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="rounded-3xl border border-slate-200 bg-white/80 p-5 space-y-4 shadow-sm">
          <div className="h-48 w-full rounded-2xl bg-slate-200" />
          <div className="h-4 w-1/3 rounded bg-slate-200" />
          <div className="h-6 w-5/6 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-2/3 rounded bg-slate-200" />
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-8 w-24 rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
