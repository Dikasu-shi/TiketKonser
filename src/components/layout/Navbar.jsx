import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Ticket, Heart, User, LogOut, Menu, X, Sparkles, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Button } from '../common/Button';

export const Navbar = ({ onOpenMobileMenu }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { count: favCount } = useFavorites();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 10;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Base links for all visitors
  const baseLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Jelajah Konser', path: '/events' },
  ];

  // Additional link for authenticated members only
  const authenticatedLinks = [
    ...baseLinks,
    { name: 'Tiket Saya', path: '/my-tickets' },
  ];

  const currentNavLinks = isAuthenticated ? authenticatedLinks : baseLinks;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur-sm border-b border-border shadow-xs'
          : 'bg-surface/80 backdrop-blur-xs border-b border-border/80'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-coral-500 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Ticket className="w-5 h-5 -rotate-12" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-ink tracking-tight block font-display">
                Tiket<span className="text-coral-500">Konser</span>
              </span>
              <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block -mt-1 font-display">
                Concert Experience
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-canvas border border-border rounded-full px-2 py-1">
            {currentNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-surface text-ink font-bold shadow-xs border border-border/60'
                      : 'text-ink-secondary hover:text-ink'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Favorites Button */}
                <Link
                  to="/favorites"
                  aria-label="Daftar Konser Favorit"
                  className="relative p-2.5 text-ink-secondary hover:text-ink rounded-xl hover:bg-stone-100 border border-transparent hover:border-border transition-all"
                  title="Daftar Favorit"
                >
                  <Heart className="w-5 h-5" />
                  {favCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-coral-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                      {favCount}
                    </span>
                  )}
                </Link>

                {/* Logged in Profile & Logout */}
                <div className="flex items-center gap-3 pl-3 border-l border-border">
                  <Link
                    to="/my-tickets"
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-stone-100 border border-transparent hover:border-border transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-coral-100 border border-coral-200 text-coral-600 font-bold text-xs flex items-center justify-center">
                      {user.avatar || 'U'}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-ink leading-tight font-display">{user.name}</p>
                      <p className="text-[10px] text-ink-muted font-medium capitalize">{user.role}</p>
                    </div>
                  </Link>

                  <button
                    onClick={logout}
                    aria-label="Keluar dari akun"
                    className="p-2 text-ink-muted hover:text-rose-600 rounded-xl hover:bg-stone-100 transition-colors"
                    title="Keluar"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              /* Guest Auth Actions */
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Daftar
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {isAuthenticated && (
              <Link
                to="/favorites"
                aria-label="Daftar Konser Favorit"
                className="relative p-2 text-ink-secondary hover:text-ink"
              >
                <Heart className="w-5 h-5" />
                {favCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-coral-500 text-white text-[8px] font-bold flex items-center justify-center">
                    {favCount}
                  </span>
                )}
              </Link>
            )}

            <button
              onClick={onOpenMobileMenu}
              aria-label="Buka Menu Navigasi"
              className="p-2 text-ink rounded-xl border border-border hover:bg-stone-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
