import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket, Heart, Compass, User, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Button } from '../common/Button';

export const MobileNavbar = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { count: favCount } = useFavorites();

  // Dynamic links depending on auth state
  const guestLinks = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Jelajah Konser', path: '/events', icon: Compass },
  ];

  const authenticatedLinks = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Jelajah Konser', path: '/events', icon: Compass },
    { name: 'Tiket Saya', path: '/my-tickets', icon: Ticket },
    { name: 'Konser Favorit', path: '/favorites', icon: Heart, badge: favCount },
  ];

  const currentLinks = isAuthenticated ? authenticatedLinks : guestLinks;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative ml-auto w-4/5 max-w-sm h-full bg-surface border-l border-border p-6 flex flex-col justify-between z-10 shadow-2xl"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-coral-500 flex items-center justify-center text-white">
                    <Ticket className="w-4 h-4 -rotate-12" />
                  </div>
                  <span className="font-extrabold text-ink tracking-tight font-display">Tiket<span className="text-coral-500">Konser</span></span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Tutup menu navigasi"
                  className="p-2 text-ink-secondary hover:text-ink rounded-lg hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5">
                {currentLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                          isActive
                            ? 'bg-coral-50 text-coral-600 font-bold border border-coral-200'
                            : 'text-ink-secondary hover:text-ink hover:bg-stone-100'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </div>
                      {link.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-coral-500 text-white text-[10px] font-bold">
                          {link.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Auth Actions */}
            <div className="pt-6 border-t border-border">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-canvas border border-border">
                    <div className="w-10 h-10 rounded-full bg-coral-100 border border-coral-200 text-coral-600 font-bold text-sm flex items-center justify-center">
                      {user.avatar || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink font-display">{user.name}</p>
                      <p className="text-xs text-ink-muted capitalize">{user.role}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    fullWidth
                    size="sm"
                    icon={LogOut}
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                  >
                    Keluar Akun
                  </Button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <Link to="/login" onClick={onClose} className="block">
                    <Button variant="outline" fullWidth size="md">
                      Masuk
                    </Button>
                  </Link>
                  <Link to="/register" onClick={onClose} className="block">
                    <Button variant="primary" fullWidth size="md">
                      Daftar Akun
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
