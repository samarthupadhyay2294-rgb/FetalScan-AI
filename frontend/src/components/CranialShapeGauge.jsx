import { motion } from 'framer-motion';

export default function CranialShapeGauge({ ci = 77.4, lower = 75, upper = 85, classification = 'Normal' }) {
  // Normalize scale: range from 60 to 100
  const minVal = 60;
  const maxVal = 100;
  const totalRange = maxVal - minVal;

  const clamp = (val) => Math.max(minVal, Math.min(maxVal, val));
  const calcPercent = (val) => ((clamp(val) - minVal) / totalRange) * 100;

  const ciPercent = calcPercent(ci);
  const lowerPercent = calcPercent(lower);
  const upperPercent = calcPercent(upper);

  // Status color for current CI cursor
  let pointerColor = '#10B981'; // green
  if (classification === 'Dolichocephalic' || classification === 'Brachycephalic') {
    pointerColor = '#EF4444'; // red
  } else if (ci < lower || ci > upper) {
    pointerColor = '#F59E0B'; // yellow
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">Cephalic Index Gauge</h3>
          <p className="text-xs text-slate-500">Visual position relative to expected reference range ({lower}–{upper})</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-extrabold text-slate-900">{ci}</span>
          <span className="ml-1 text-sm font-medium text-slate-500">%</span>
        </div>
      </div>

      {/* Progress Bar & Region Indicator */}
      <div className="relative mt-8 mb-4">
        {/* Track */}
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-100 flex">
          {/* Dolichocephalic Zone (0% to lowerPercent) */}
          <div
            style={{ width: `${lowerPercent}%` }}
            className="h-full bg-amber-200/80"
            title="Dolichocephalic (< Lower limit)"
          />
          {/* Normal Zone (lowerPercent to upperPercent) */}
          <div
            style={{ width: `${upperPercent - lowerPercent}%` }}
            className="h-full bg-emerald-400"
            title="Normal Reference Range"
          />
          {/* Brachycephalic Zone (upperPercent to 100%) */}
          <div
            style={{ width: `${100 - upperPercent}%` }}
            className="h-full bg-rose-200/80"
            title="Brachycephalic (> Upper limit)"
          />
        </div>

        {/* Pointer / Gauge Marker */}
        <motion.div
          initial={{ left: '0%' }}
          animate={{ left: `${ciPercent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute -top-3 -ml-3 flex flex-col items-center"
        >
          <div
            className="h-6 w-6 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: pointerColor }}
          />
          <div className="mt-1 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold text-white shadow">
            {ci}
          </div>
        </motion.div>
      </div>

      {/* Labels below progress bar */}
      <div className="mt-6 flex justify-between text-xs text-slate-500 font-medium">
        <span>60.0 (Dolichocephalic)</span>
        <span className="text-emerald-700 font-semibold">
          Range: {lower} – {upper}
        </span>
        <span>100.0 (Brachycephalic)</span>
      </div>
    </div>
  );
}
