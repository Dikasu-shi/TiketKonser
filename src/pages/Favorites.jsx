import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, Trash2, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { ConcertGrid } from '../components/concerts/ConcertGrid';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

export const Favorites = () => {
  const { favoriteConcerts, count } = useFavorites();

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest mb-1 font-display">
            <Heart className="w-4 h-4 fill-current" />
            <span>Daftar Keinginan</span>
          </div>
          <h1 className="text-3xl font-extrabold text-ink tracking-tight font-display">
            Konser Musik Favorit
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Pantau ketersediaan tiket dan jadwal tur konser yang telah Anda simpan.
          </p>
        </div>

        <span className="px-4 py-2 rounded-xl bg-surface border border-border text-xs font-bold text-ink-secondary shadow-sm">
          Total: <span className="text-rose-500 font-extrabold">{count}</span> Konser
        </span>
      </div>

      {/* Grid or Empty */}
      {count > 0 ? (
        <ConcertGrid concerts={favoriteConcerts} columns={4} />
      ) : (
        <EmptyState
          icon={Heart}
          title="Daftar Favorit Masih Kosong"
          description="Anda belum menyimpan konser musik favorit. Klik ikon hati pada kartu konser untuk menyimpannya di sini."
          actionLabel="Jelajahi Konser Sekarang"
          actionLink="/events"
        />
      )}
    </div>
  );
};
