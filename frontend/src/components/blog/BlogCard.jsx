import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi';

export default function BlogCard({ post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col justify-between rounded-3xl border border-white/80 bg-white/80 overflow-hidden shadow-lg backdrop-blur-xl hover:border-cyan-400/60 hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden h-52 bg-slate-900">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-cyan-300 backdrop-blur-md border border-cyan-400/30">
            {post.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-col justify-between flex-1 p-6 space-y-4">
        <div className="space-y-2">
          <Link to={`/blog/${post.slug}`} className="block group-hover:text-cyan-600 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 truncate max-w-[60%]">
              <FiUser className="text-cyan-600 shrink-0" />
              <span className="truncate">{post.author}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <FiClock className="text-slate-400" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white transition-all shadow-sm"
          >
            <span>Read Article</span>
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
