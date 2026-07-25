-- ========================================================
-- FetalScan AI - Future-Ready Supabase Blog Posts Table
-- ========================================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    author TEXT DEFAULT 'FetalScan AI Research Team',
    reading_time TEXT DEFAULT '5 min read',
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    views INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for category filtering & slug lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON public.blog_posts(featured);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public READ policy for published articles
CREATE POLICY "Public users can view published blog posts"
ON public.blog_posts
FOR SELECT
USING (published = true);
