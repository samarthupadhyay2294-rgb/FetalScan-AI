-- ========================================================
-- FetalScan AI - Supabase Database Schema & RLS Policies
-- ========================================================

-- 1. Create PROFILES table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'Clinician',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create ANALYSES table
CREATE TABLE IF NOT EXISTS public.analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    image_url TEXT,
    bpd NUMERIC NOT NULL,
    ofd NUMERIC NOT NULL,
    cephalic_index NUMERIC NOT NULL,
    confidence NUMERIC NOT NULL,
    risk_level TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast user query performance
CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON public.analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON public.analyses(created_at DESC);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Enable RLS on analyses
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------
-- PROFILES RLS Policies
-- --------------------------------------------------------

-- Users can SELECT their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Users can INSERT their own profile
CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Users can UPDATE their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

-- --------------------------------------------------------
-- ANALYSES RLS Policies
-- --------------------------------------------------------

-- Users can SELECT their own analyses
CREATE POLICY "Users can view own analyses" 
ON public.analyses 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can INSERT their own analyses
CREATE POLICY "Users can insert own analyses" 
ON public.analyses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can DELETE their own analyses
CREATE POLICY "Users can delete own analyses" 
ON public.analyses 
FOR DELETE 
USING (auth.uid() = user_id);

-- ========================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ========================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users sign up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
