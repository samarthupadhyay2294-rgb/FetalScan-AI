import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';
import { blogService } from '../services/blogService';
import BlogHero from '../components/blog/BlogHero';
import CategoryFilter from '../components/blog/CategoryFilter';
import FeaturedPost from '../components/blog/FeaturedPost';
import LatestPosts from '../components/blog/LatestPosts';
import PopularPosts from '../components/blog/PopularPosts';
import MedicalDisclaimer from '../components/blog/MedicalDisclaimer';
import BlogSkeleton from '../components/blog/BlogSkeleton';
import EmptySearch from '../components/blog/EmptySearch';
import Toast from '../components/Toast';

export default function Blog() {
  const [allPosts, setAllPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const posts = await blogService.getAllPosts();
        const featured = await blogService.getFeaturedPost();
        const popular = await blogService.getPopularPosts(4);

        setAllPosts(posts);
        setFeaturedPost(featured);
        setPopularPosts(popular);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter posts dynamically by Category & Search query
  const filteredPosts = useMemo(() => {
    let result = allPosts;

    if (activeCategory && activeCategory !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allPosts, activeCategory, searchQuery]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setToastMessage('Subscription feature coming soon! Thank you for staying connected with FetalScan AI.');
    setNewsletterEmail('');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <Toast type="success" message={toastMessage} onClose={() => setToastMessage('')} />

      <div className="mx-auto max-w-7xl space-y-12">
        {/* Blog Hero with Search */}
        <BlogHero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Category Filters bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Categories</h3>
            {(activeCategory !== 'All' || searchQuery) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-cyan-600 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
          <CategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {loading ? (
          <BlogSkeleton />
        ) : filteredPosts.length === 0 ? (
          <EmptySearch query={searchQuery || activeCategory} onReset={handleResetFilters} />
        ) : (
          <>
            {/* Show Featured Article only if default view (no search / All category) */}
            {!searchQuery && activeCategory === 'All' && featuredPost && (
              <FeaturedPost post={featuredPost} />
            )}

            {/* Main Content Layout (Grid + Popular Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-8">
                <LatestPosts posts={filteredPosts} />
              </div>

              <div className="lg:col-span-4 space-y-8 sticky top-28">
                <PopularPosts posts={popularPosts} />
              </div>
            </div>
          </>
        )}

        {/* Newsletter CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
              <FiMail size={24} />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Stay Updated on Fetal AI Research</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Get the latest educational articles, deep learning insights, and clinical biometry publications delivered to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter clinician email..."
                required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs text-white placeholder:text-slate-400 backdrop-blur-md focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="submit"
                className="flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg hover:from-cyan-400 hover:to-teal-300 transition-all"
              >
                <span>Subscribe</span>
                <FiSend size={14} />
              </button>
            </form>
          </div>
        </motion.div>

        {/* Global Medical Disclaimer */}
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
