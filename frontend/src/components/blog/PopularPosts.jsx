import { Link } from 'react-router-dom';
import { FiTrendingUp, FiEye, FiArrowRight } from 'react-icons/fi';

export default function PopularPosts({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-xl backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
          <FiTrendingUp size={18} />
        </div>
        <h3 className="text-base font-extrabold text-slate-900">Popular Knowledge Hub Articles</h3>
      </div>

      <div className="space-y-4 divide-y divide-slate-100">
        {posts.map((post, idx) => (
          <div key={post.id} className="pt-3 first:pt-0 group">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-500 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                0{idx + 1}
              </span>
              <div className="space-y-1">
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-2 leading-snug"
                >
                  {post.title}
                </Link>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiEye size={12} /> {post.views || 850} views
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
