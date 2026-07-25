import { useState } from 'react';
import { useAuth } from './useAuth';
import { authService } from '../services/authService';

export const useProfile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (updates) => {
    if (!user?.id) return;
    setUpdating(true);
    setError(null);
    try {
      const updated = await authService.updateProfile(user.id, updates);
      await refreshProfile();
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return {
    profile,
    user,
    updating,
    error,
    updateProfile,
    refreshProfile,
  };
};
