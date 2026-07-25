import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiActivity, FiLogIn, FiUserPlus, FiBookOpen } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import UserMenu from './UserMenu';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/upload', label: 'AI Analysis' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
  ];

  const authLinks = [
    { to: '/', label: 'Home' },
    { to: '/upload', label: 'AI Analysis' },
    { to: '/history', label: 'History' },
    { to: '/blog', label: 'Blog' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/profile', label: 'Profile' },
  ];

  const activeLinks = user ? authLinks : publicLinks;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-xl shadow-sm"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-slate-900 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <FiActivity aria-hidden size={20} />
          </span>
          <span className="text-lg tracking-tight font-extrabold">
            FetalScan <span className="medical-gradient-text">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-6 lg:gap-7 md:flex">
          {activeLinks.map((l) => {
            const isActive = pathname === l.to || (l.to === '/blog' && pathname.startsWith('/blog'));
            return (
              <Link
                key={l.to + l.label}
                to={l.to}
                className={`text-xs lg:text-sm font-semibold transition ${
                  isActive
                    ? 'text-cyan-600 border-b-2 border-cyan-500 pb-0.5'
                    : 'text-slate-600 hover:text-cyan-600'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons / User Menu */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/upload"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-600 transition-all"
              >
                <FiActivity size={14} />
                New AI Scan
              </Link>
              <UserMenu />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
              >
                <FiLogIn size={14} />
                Sign In
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-600 transition-all"
              >
                <FiUserPlus size={14} />
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {activeLinks.map((l) => (
                <Link
                  key={l.to + l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`py-2 text-sm font-semibold ${
                    pathname === l.to ? 'text-cyan-600' : 'text-slate-700'
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
                {user ? (
                  <div className="flex items-center justify-between">
                    <UserMenu />
                    <Link
                      to="/upload"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white text-center"
                    >
                      New Scan
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="rounded-xl border border-slate-200 py-2.5 text-center text-xs font-bold text-slate-700"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-2.5 text-center text-xs font-bold text-white"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
