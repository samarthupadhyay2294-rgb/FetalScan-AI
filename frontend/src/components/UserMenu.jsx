import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiClock, FiLogOut, FiChevronDown, FiShield } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

export default function UserMenu() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Clinician';
  const displayEmail = user?.email || profile?.email || '';
  const role = profile?.role || 'Clinician';

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/80 p-1.5 pr-3 shadow-sm hover:border-cyan-500/50 hover:bg-white transition-all focus:outline-none"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-inner">
          {initials}
        </div>
        <span className="max-w-[120px] truncate text-xs font-bold text-slate-800 hidden sm:inline">
          {displayName}
        </span>
        <FiChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-xl z-50"
          >
            {/* Header info */}
            <div className="border-b border-slate-100 p-3">
              <p className="truncate text-sm font-bold text-slate-900">{displayName}</p>
              <p className="truncate text-xs text-slate-500">{displayEmail}</p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700 border border-cyan-200/60">
                <FiShield size={12} />
                {role}
              </div>
            </div>

            {/* Menu Links */}
            <div className="py-1">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100/80 hover:text-blue-600 transition-colors"
              >
                <FiUser size={16} />
                Profile Settings
              </Link>
              <Link
                to="/history"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100/80 hover:text-blue-600 transition-colors"
              >
                <FiClock size={16} />
                Prediction History
              </Link>
            </div>

            {/* Logout button */}
            <div className="border-t border-slate-100 pt-1">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <FiLogOut size={16} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
