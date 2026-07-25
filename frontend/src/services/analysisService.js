import { supabase, isPlaceholderSupabase } from '../lib/supabase';
import { authService } from './authService';

const LOCAL_ANALYSES_KEY = 'fetalscan_analyses';

function getLocalAnalyses() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_ANALYSES_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLocalAnalyses(items) {
  localStorage.setItem(LOCAL_ANALYSES_KEY, JSON.stringify(items));
}

export const analysisService = {
  /**
   * Save ultrasound analysis linked to the current logged in user
   */
  async saveAnalysis(analysisData) {
    const user = await authService.getCurrentUser();

    if (!user) {
      throw new Error('Authentication required to save analysis record.');
    }

    const payload = {
      id: 'anl_' + Math.random().toString(36).substr(2, 9),
      user_id: user.id,
      image_url: analysisData.image_url || analysisData.imageUrl || '',
      bpd: Number(analysisData.bpd) || 0,
      ofd: Number(analysisData.ofd) || 0,
      cephalic_index: Number(analysisData.cephalic_index || analysisData.cephalicIndex) || 0,
      confidence: Number(analysisData.confidence) || 0,
      risk_level: analysisData.risk_level || analysisData.riskLevel || 'Low',
      created_at: new Date().toISOString(),
    };

    if (!isPlaceholderSupabase) {
      try {
        const { data, error } = await supabase
          .from('analyses')
          .insert([payload])
          .select()
          .single();

        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase remote save failed, storing locally:', err.message);
      }
    }

    const items = getLocalAnalyses();
    items.unshift(payload);
    saveLocalAnalyses(items);
    return payload;
  },

  /**
   * Fetch all analyses belonging exclusively to the authenticated user
   */
  async getUserAnalyses() {
    const user = await authService.getCurrentUser();

    if (!user) {
      return [];
    }

    if (!isPlaceholderSupabase) {
      try {
        const { data, error } = await supabase
          .from('analyses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase remote query failed, loading local analyses:', err.message);
      }
    }

    const items = getLocalAnalyses();
    return items.filter((item) => item.user_id === user.id);
  },

  /**
   * Delete an analysis record
   */
  async deleteAnalysis(id) {
    const user = await authService.getCurrentUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    if (!isPlaceholderSupabase) {
      try {
        await supabase
          .from('analyses')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
      } catch (err) {
        console.warn('Supabase remote delete warning:', err);
      }
    }

    const items = getLocalAnalyses();
    const filtered = items.filter((item) => item.id !== id);
    saveLocalAnalyses(filtered);
    return true;
  },
};
