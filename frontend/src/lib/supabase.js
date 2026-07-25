import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_61_nWN2iJigPFUjfwPoK2Q_QZMekhSK';

export const isPlaceholderSupabase =
  !rawUrl ||
  rawUrl.includes('your-supabase-project') ||
  rawUrl.includes('your_supabase_project');

const supabaseUrl = isPlaceholderSupabase ? 'https://demo-fetalscan.supabase.co' : rawUrl;
const supabasePublishableKey = rawKey;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
