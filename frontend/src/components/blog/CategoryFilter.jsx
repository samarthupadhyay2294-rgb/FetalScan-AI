export const CATEGORIES = [
  'All',
  'Fetal Ultrasound',
  'BPD & OFD',
  'Cephalic Index',
  'Fetal Growth',
  'AI in Healthcare',
  'Medical Imaging',
  'Deep Learning',
  'Research',
  'Pregnancy Education',
];

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 scale-105'
                  : 'border border-slate-200 bg-white/80 text-slate-600 hover:border-cyan-400 hover:text-cyan-600'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
