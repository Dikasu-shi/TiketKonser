import React from 'react';
import { Link } from 'react-router-dom';
import { Disc3, Compass, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFound = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="relative w-28 h-28 mx-auto">
        <div className="w-full h-full rounded-full bg-surface border-4 border-border flex items-center justify-center text-coral-500 shadow-sm animate-spin-slow">
          <Disc3 className="w-14 h-14" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-coral-500 border-2 border-white" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-coral-500 uppercase tracking-widest font-display">
          Error 404 • Halaman Tidak Ditemukan
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight font-display">
          Nada Panggung Hilang!
        </h1>
        <p className="text-xs sm:text-sm text-ink-secondary max-w-md mx-auto leading-relaxed">
          Halaman konser atau rute yang Anda tuju sepertinya telah berpindah atau tidak tersedia dalam panggung kami.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link to="/">
          <Button variant="primary" size="md" icon={Home}>
            Kembali ke Beranda
          </Button>
        </Link>
        <Link to="/events">
          <Button variant="outline" size="md" icon={Compass}>
            Jelajah Semua Konser
          </Button>
        </Link>
      </div>
    </div>
  );
};
