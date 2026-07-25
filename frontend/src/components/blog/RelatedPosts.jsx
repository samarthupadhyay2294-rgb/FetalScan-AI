import BlogCard from './BlogCard';

export default function RelatedPosts({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="pt-10 border-t border-slate-200 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Related Educational Articles</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
