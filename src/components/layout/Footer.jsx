import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Globe } from 'lucide-react';

// Crisp SVGs for GitHub and LinkedIn
const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-dark text-white/70 pt-16 pb-12 mt-20">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Project Identity (6 cols on lg) */}
          <div className="lg:col-span-6 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-coral-500 flex items-center justify-center text-white shadow-sm">
                <Ticket className="w-5 h-5 -rotate-12" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight font-display">
                Tiket<span className="text-coral-500">Konser</span>
              </span>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Discover concerts, choose your tickets, and experience a seamless booking journey.
            </p>
          </div>

          {/* Column 2: Navigation (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-display">Navigasi</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">Jelajah Konser</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display">Connect</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group cursor-default">
                  <GithubIcon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  <span>GitHub ↗</span>
                </span>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group cursor-default">
                  <LinkedinIcon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  <span>LinkedIn ↗</span>
                </span>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group cursor-default">
                  <Globe className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  <span>My Portfolio ↗</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Dika Ahmad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
