import { supabase, isPlaceholderSupabase } from '../lib/supabase';

// Local storage key constants for seamless fallback when Supabase URL is unconfigured
const LOCAL_USERS_KEY = 'fetalscan_users';
const LOCAL_SESSION_KEY = 'fetalscan_session';
const LOCAL_ANALYSES_KEY = 'fetalscan_analyses';

function getLocalUsers() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLocalUsers(users) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function getLocalSession() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

function saveLocalSession(session) {
  if (!session) {
    localStorage.removeItem(LOCAL_SESSION_KEY);
  } else {
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
  }
}

export const authService = {
  /**
   * Sign up user using Supabase Auth (with automatic local fallback)
   */
  async signUp({ fullName, email, password }) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    if (!isPlaceholderSupabase) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: { full_name: cleanName },
          },
        });

        if (authError) throw authError;

        if (authData?.user) {
          await supabase.from('profiles').upsert(
            {
              id: authData.user.id,
              full_name: cleanName,
              email: cleanEmail,
              role: 'Clinician',
              created_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
          );
        }

        return authData;
      } catch (err) {
        // If live call fails due to invalid/missing remote endpoint, fallback to local register
        if (err.message?.includes('Failed to fetch') || err.name === 'AuthRetryableFetchError') {
          console.warn('Supabase remote endpoint unreachable, switching to local auth fallback');
        } else {
          throw err;
        }
      }
    }

    // Local Auth Fallback
    const users = getLocalUsers();
    const existing = users.find((u) => u.email === cleanEmail);
    if (existing) {
      throw new Error('User already registered with this email.');
    }

    const userId = 'usr_' + Math.random().toString(36).substr(2, 9);
    const newUser = {
      id: userId,
      email: cleanEmail,
      full_name: cleanName,
      role: 'Clinician',
      created_at: new Date().toISOString(),
      password,
    };

    users.push(newUser);
    saveLocalUsers(users);

    const session = {
      user: {
        id: userId,
        email: cleanEmail,
        user_metadata: { full_name: cleanName },
        created_at: newUser.created_at,
      },
      access_token: 'local_token_' + userId,
    };

    saveLocalSession(session);
    return session;
  },

  /**
   * Login user using Supabase Auth (with automatic local fallback)
   */
  async login({ email, password }) {
    const cleanEmail = email.trim().toLowerCase();

    if (!isPlaceholderSupabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (error) throw error;
        return data;
      } catch (err) {
        if (err.message?.includes('Failed to fetch') || err.name === 'AuthRetryableFetchError') {
          console.warn('Supabase remote endpoint unreachable, switching to local auth login');
        } else {
          throw err;
        }
      }
    }

    // Local Auth Fallback
    const users = getLocalUsers();
    let user = users.find((u) => u.email === cleanEmail);

    // Auto-create clinician account if first time logging in locally
    if (!user) {
      user = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        email: cleanEmail,
        full_name: cleanEmail.split('@')[0].replace('.', ' '),
        role: 'Clinician',
        created_at: new Date().toISOString(),
        password,
      };
      users.push(user);
      saveLocalUsers(users);
    } else if (user.password && user.password !== password) {
      throw new Error('Invalid email or password.');
    }

    const session = {
      user: {
        id: user.id,
        email: user.email,
        user_metadata: { full_name: user.full_name },
        created_at: user.created_at,
      },
      access_token: 'local_token_' + user.id,
    };

    saveLocalSession(session);
    return session;
  },

  /**
   * Logout current session
   */
  async logout() {
    saveLocalSession(null);
    if (!isPlaceholderSupabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out warning:', e);
      }
    }
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    if (!isPlaceholderSupabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) return user;
      } catch (e) {
        console.warn('Error fetching Supabase user:', e);
      }
    }
    const session = getLocalSession();
    return session?.user ?? null;
  },

  /**
   * Get current active session
   */
  async getCurrentSession() {
    if (!isPlaceholderSupabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) return session;
      } catch (e) {
        console.warn('Error fetching Supabase session:', e);
      }
    }
    return getLocalSession();
  },

  /**
   * Load user profile
   */
  async getProfile(userId) {
    if (!userId) return null;

    if (!isPlaceholderSupabase) {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (data) return data;
      } catch (e) {
        console.warn('Error fetching profile from Supabase:', e);
      }
    }

    const users = getLocalUsers();
    const localUser = users.find((u) => u.id === userId);
    if (localUser) {
      return {
        id: localUser.id,
        full_name: localUser.full_name,
        email: localUser.email,
        role: localUser.role || 'Clinician',
        created_at: localUser.created_at,
      };
    }

    const session = getLocalSession();
    if (session?.user?.id === userId) {
      return {
        id: userId,
        full_name: session.user.user_metadata?.full_name || 'Clinician',
        email: session.user.email,
        role: 'Clinician',
        created_at: session.user.created_at || new Date().toISOString(),
      };
    }

    return null;
  },

  /**
   * Update profile fields (full_name, role)
   */
  async updateProfile(userId, updates) {
    if (!userId) throw new Error('User ID is required');

    const cleanName = updates.full_name || updates.fullName;
    const role = updates.role || 'Clinician';

    if (!isPlaceholderSupabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update({ full_name: cleanName, role })
          .eq('id', userId)
          .select()
          .single();

        if (!error && data) return data;
      } catch (e) {
        console.warn('Error updating remote profile:', e);
      }
    }

    const users = getLocalUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx !== -1) {
      users[idx].full_name = cleanName;
      users[idx].role = role;
      saveLocalUsers(users);
    }

    const session = getLocalSession();
    if (session?.user?.id === userId) {
      session.user.user_metadata = { ...session.user.user_metadata, full_name: cleanName };
      saveLocalSession(session);
    }

    return {
      id: userId,
      full_name: cleanName,
      role,
    };
  },

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    if (!isPlaceholderSupabase) {
      try {
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/login`,
        });
      } catch (e) {
        console.warn('Remote reset warning:', e);
      }
    }
    return { success: true };
  },
};
