import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiCalendar, FiShield, FiCheck, FiEdit3 } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import Toast from '../components/Toast';
import LoadingScreen from '../components/LoadingScreen';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const { profile, updateProfile, updating } = useProfile();

  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Clinician');
  const [toastMessage, setToastMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setRole(profile.role || 'Clinician');
    }
  }, [profile]);

  if (authLoading) {
    return <LoadingScreen message="Loading clinician profile..." />;
  }

  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Recently';

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ full_name: fullName, role });
      setToastMessage('Profile updated successfully.');
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <Toast type="success" message={toastMessage} onClose={() => setToastMessage('')} />

      <div className="mx-auto max-w-3xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Clinician <span className="medical-gradient-text">Profile</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Manage your credentials, clinical role, and Supabase account settings
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:border-cyan-500 hover:text-cyan-600 transition-all"
          >
            <FiEdit3 size={15} />
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6"
        >
          {/* Header Card Avatar */}
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-2xl font-black text-white shadow-lg shadow-blue-500/20">
              {(fullName || user?.email || 'C')[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{fullName || 'Clinician'}</h2>
              <p className="text-xs font-medium text-slate-500">{user?.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-0.5 text-xs font-bold text-cyan-700 border border-cyan-200">
                <FiShield size={13} />
                {role}
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="profile-fullName" className="text-xs font-semibold text-slate-700">
                Full Name
              </label>
              <div className="relative rounded-xl border border-slate-200 bg-white transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <FiUser size={18} />
                </div>
                <input
                  id="profile-fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={!isEditing}
                  required
                  className="w-full bg-transparent py-3 pl-10 pr-4 text-sm text-slate-900 focus:outline-none disabled:bg-slate-50/50 disabled:text-slate-500"
                />
              </div>
            </div>

            {/* Email (Read-Only) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="profile-email" className="text-xs font-semibold text-slate-700">
                  Email Address
                </label>
                <span className="text-[11px] font-semibold text-slate-400">
                  Managed by Supabase Auth (Read-only)
                </span>
              </div>
              <div className="relative rounded-xl border border-slate-200 bg-slate-50/80">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <FiMail size={18} />
                </div>
                <input
                  id="profile-email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-transparent py-3 pl-10 pr-4 text-sm text-slate-500 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>

            {/* Clinical Role Selection */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="profile-role" className="text-xs font-semibold text-slate-700">
                Clinical Role / Specialization
              </label>
              <div className="relative rounded-xl border border-slate-200 bg-white transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <FiShield size={18} />
                </div>
                <select
                  id="profile-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={!isEditing}
                  className="w-full bg-transparent py-3 pl-10 pr-4 text-sm text-slate-900 focus:outline-none disabled:bg-slate-50/50 disabled:text-slate-500"
                >
                  <option value="Clinician">Clinician</option>
                  <option value="Obstetrician">Obstetrician / Gynecologist</option>
                  <option value="Radiologist">Radiologist</option>
                  <option value="Sonographer">Sonographer</option>
                  <option value="Researcher">Medical Researcher</option>
                </select>
              </div>
            </div>

            {/* Account Metadata */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <FiCalendar className="text-cyan-600" />
                Account Created:
              </div>
              <span className="font-bold text-slate-800">{createdAt}</span>
            </div>

            {/* Save Button */}
            {isEditing && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                type="submit"
                disabled={updating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-60"
              >
                {updating ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Updating profile...
                  </>
                ) : (
                  <>
                    <FiCheck size={18} />
                    Save Profile Changes
                  </>
                )}
              </motion.button>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
