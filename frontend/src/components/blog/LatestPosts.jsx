import BlogGrid from './BlogGrid';

export default function LatestPosts({ posts = [] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Latest Articles</h2>
          <p className="text-xs text-slate-500">Recently published educational content & deep learning insights</p>
        </div>
      </div>

      <BlogGrid posts={posts} />
    </div>
  );
}
