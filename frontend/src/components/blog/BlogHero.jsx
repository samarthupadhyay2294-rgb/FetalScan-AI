import { motion } from 'framer-motion';
import { FiBookOpen, FiActivity } from 'react-icons/fi';
import SearchBar from './SearchBar';

export default function BlogHero({ searchQuery, setSearchQuery, onSearchSubmit }) {
  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden mb-12">
      {/* Background Animated Gradient Grid */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-20" />

      <div className="relative z-10 mx-auto max-w-4xl text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-300 backdrop-blur-md"
        >
          <FiBookOpen className="text-cyan-400" />
          <span>FetalScan AI Knowledge Hub</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
        >
          Learn. Understand. <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Discover.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Explore reliable educational resources about fetal ultrasound, BPD and OFD biometrics, Cephalic Index, deep learning in healthcare, and AI-assisted medical imaging.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search articles on BPD, OFD, Cephalic Index, HRNet..."
          />
        </motion.div>
      </div>
    </div>
  );
}
