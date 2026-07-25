import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { blogService } from '../services/blogService';
import ArticleHeader from '../components/blog/ArticleHeader';
import ArticleContent from '../components/blog/ArticleContent';
import RelatedPosts from '../components/blog/RelatedPosts';
import MedicalDisclaimer from '../components/blog/MedicalDisclaimer';
import LoadingScreen from '../components/LoadingScreen';

export default function BlogArticle() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      try {
        const data = await blogService.getPostBySlug(slug);
        setPost(data);

        if (data) {
          // Update page document title for SEO
          document.title = `${data.title} | FetalScan AI Knowledge Hub`;

          const related = await blogService.getRelatedPosts(slug, data.category, 3);
          setRelatedPosts(related);
        }
      } catch (err) {
        console.error('Failed to load article:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();

    return () => {
      document.title = 'FetalScan AI - Medical Ultrasound Analytics';
    };
  }, [slug]);

  if (loading) {
    return <LoadingScreen message="Loading article..." />;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <p className="mt-2 text-xs text-slate-500 max-w-sm">
          The educational article you are looking for may have been moved or updated.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all"
        >
          <FiArrowLeft size={16} /> Back to Knowledge Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl space-y-8">
        {/* Back Link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md hover:border-cyan-500 hover:text-cyan-600 transition-all"
          >
            <FiArrowLeft size={16} />
            Back to Knowledge Hub
          </Link>
        </motion.div>

        {/* Article Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/80 bg-white/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8"
        >
          {/* Header */}
          <ArticleHeader post={post} />

          {/* Formatted Article Body */}
          <ArticleContent content={post.content} image={post.image} title={post.title} />

          {/* Mandatory Medical Disclaimer */}
          <MedicalDisclaimer />

          {/* Related Articles */}
          <RelatedPosts posts={relatedPosts} />
        </motion.div>
      </article>
    </div>
  );
}
