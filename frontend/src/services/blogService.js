import { BLOG_POSTS } from '../data/blogPosts';

export const blogService = {
  /**
   * Get all blog posts
   */
  async getAllPosts() {
    return [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  /**
   * Get post by unique URL slug
   */
  async getPostBySlug(slug) {
    if (!slug) return null;
    const post = BLOG_POSTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
    return post || null;
  },

  /**
   * Filter posts by category name
   */
  async getPostsByCategory(category) {
    if (!category || category === 'All') {
      return this.getAllPosts();
    }
    const posts = BLOG_POSTS.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  /**
   * Search posts across Title, Excerpt, Content, Category, Author
   */
  async searchPosts(query) {
    if (!query || !query.trim()) {
      return this.getAllPosts();
    }
    const q = query.trim().toLowerCase();

    return BLOG_POSTS.filter((post) => {
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchCategory = post.category.toLowerCase().includes(q);
      const matchContent = post.content.toLowerCase().includes(q);
      const matchAuthor = post.author.toLowerCase().includes(q);
      return matchTitle || matchExcerpt || matchCategory || matchContent || matchAuthor;
    });
  },

  /**
   * Get main featured post
   */
  async getFeaturedPost() {
    const featured = BLOG_POSTS.find((p) => p.featured);
    return featured || BLOG_POSTS[0];
  },

  /**
   * Get related posts by category excluding current article
   */
  async getRelatedPosts(currentSlug, category, limit = 3) {
    const filtered = BLOG_POSTS.filter(
      (p) => p.slug !== currentSlug && (category === 'All' || p.category === category)
    );

    if (filtered.length >= limit) {
      return filtered.slice(0, limit);
    }

    // Fill remaining with other posts if category has few articles
    const remaining = BLOG_POSTS.filter(
      (p) => p.slug !== currentSlug && !filtered.includes(p)
    );
    return [...filtered, ...remaining].slice(0, limit);
  },

  /**
   * Get popular articles by views
   */
  async getPopularPosts(limit = 4) {
    const sorted = [...BLOG_POSTS].sort((a, b) => (b.views || 0) - (a.views || 0));
    return sorted.slice(0, limit);
  },

  /**
   * Get latest articles
   */
  async getLatestPosts(limit = 6) {
    const all = await this.getAllPosts();
    return all.slice(0, limit);
  },
};
