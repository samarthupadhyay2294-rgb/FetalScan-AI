import { Link } from 'react-router-dom';
import { FiChevronRight, FiClock, FiCalendar, FiUser } from 'react-icons/fi';

export default function ArticleHeader({ post }) {
  if (!post) return null;

  return (
    <div className="space-y-6 pb-6 border-b border-slate-200">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-cyan-600 transition-colors">Home</Link>
        <FiChevronRight size={14} className="text-slate-400" />
        <Link to="/blog" className="hover:text-cyan-600 transition-colors">Blog</Link>
        <FiChevronRight size={14} className="text-slate-400" />
        <span className="truncate max-w-[200px] sm:max-w-xs text-slate-800">{post.category}</span>
      </nav>

      {/* Category Badge */}
      <div>
        <span className="rounded-full bg-cyan-100 px-3.5 py-1 text-xs font-extrabold text-cyan-800 border border-cyan-200">
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
        {post.excerpt}
      </p>

      {/* Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-sm">
            {post.author[0]}
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight text-sm">{post.author}</p>
            <p className="text-[11px] text-slate-400">{post.authorRole || 'Medical Research'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1.5">
            <FiCalendar className="text-cyan-600" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiClock className="text-cyan-600" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
