import { createContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../services/authService';

export const AuthContext = createContext({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signUp: async () => {},
  login: async () => {},
  logout: async () => {},
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user profile
  const fetchProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null);
      return null;
    }
    try {
      const profileData = await authService.getProfile(userId);
      setProfile(profileData);
      return profileData;
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setProfile(null);
      return null;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const currentSession = await authService.getCurrentSession();
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          if (currentSession?.user) {
            await fetchProfile(currentSession.user.id);
          }
        }
      } catch (error) {
        console.error('Error initializing auth session:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initAuth();

    // Listen to Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          await fetchProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const data = await authService.signUp(credentials);
      if (data?.user) {
        setUser(data.user);
        setSession(data.session || data);
        await fetchProfile(data.user.id);
      }
      return data;
    } finally {
      setLoading(false);
    }
  }, [fetchProfile]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      if (data?.user) {
        setUser(data.user);
        setSession(data.session || data);
        await fetchProfile(data.user.id);
      }
      return data;
    } finally {
      setLoading(false);
    }
  }, [fetchProfile]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setSession(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      return await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    login,
    logout,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
