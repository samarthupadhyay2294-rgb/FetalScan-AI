import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiArrowRight, FiStar } from 'react-icons/fi';

export default function FeaturedPost({ post }) {
  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-3xl border border-white/80 bg-white/80 overflow-hidden shadow-xl backdrop-blur-xl hover:border-cyan-400/60 hover:shadow-2xl transition-all duration-300 mb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Image */}
        <Link
          to={`/blog/${post.slug}`}
          className="lg:col-span-6 relative overflow-hidden min-h-[280px] lg:min-h-[380px] bg-slate-900"
        >
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-cyan-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-md">
              <FiStar size={12} />
              Featured Article
            </span>
            <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md border border-cyan-400/30">
              {post.category}
            </span>
          </div>
        </Link>

        {/* Right Content */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <Link to={`/blog/${post.slug}`} className="block group-hover:text-cyan-600 transition-colors">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-sm">
                  {post.author[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-800 leading-tight">{post.author}</p>
                  <p className="text-[10px] text-slate-400">{post.authorRole || 'Medical Research'}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-500">
                <FiClock className="text-cyan-600" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-600 transition-all w-fit"
            >
              <span>Read Full Article</span>
              <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
