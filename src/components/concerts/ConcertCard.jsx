import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { Badge } from '../common/Badge';

export const ConcertCard = ({ concert, layout = 'grid' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(concert.id);

  // Format date
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const totalAvailable = concert.ticketTiers.reduce((acc, t) => acc + (t.available || 0), 0);

  return (
    <div
      className="group relative flex flex-col h-full bg-surface border border-border hover:border-border-dark rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 transform-gpu hover:-translate-y-1"
    >
      {/* Photo Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={concert.posterImage || concert.bannerImage}
          alt={`Poster konser ${concert.title} oleh ${concert.artist}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {totalAvailable <= 0 ? (
            <Badge variant="danger" size="xs">Sold Out</Badge>
          ) : totalAvailable <= 20 ? (
            <Badge variant="warning" size="xs">Hampir Habis</Badge>
          ) : (
            <Badge variant="success" size="xs">Tersedia</Badge>
          )}

          {concert.badge && (
            <span className="px-2 py-0.5 rounded-md bg-dark/80 text-[9px] font-semibold text-white uppercase tracking-wider backdrop-blur-xs">
              {concert.badge}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(concert.id);
          }}
          aria-label={favorited ? `Hapus ${concert.title} dari favorit` : `Simpan ${concert.title} ke favorit`}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 shadow-sm ${
            favorited
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-ink-secondary hover:text-rose-500 hover:bg-white'
          }`}
          title={favorited ? 'Hapus dari favorit' : 'Simpan ke favorit'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Genre Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-0.5 rounded-md bg-white/95 border border-border text-[10px] font-bold text-ink uppercase tracking-wider shadow-xs">
            {concert.genre}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata */}
          <div className="flex flex-col gap-1 text-[11px] font-medium text-ink-secondary">
            <span className="flex items-center gap-1.5 text-coral-600 font-semibold">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              {formatDate(concert.date)} • {concert.time}
            </span>
            <span className="flex items-center gap-1.5 text-ink-muted truncate" title={`${concert.venueName}, ${concert.city}`}>
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {concert.venueName}, {concert.city}
            </span>
          </div>

          {/* Title */}
          <Link to={`/events/${concert.id}`} className="block group-hover:text-coral-500 transition-colors">
            <h3 className="text-base font-bold text-ink leading-snug line-clamp-2">
              {concert.title}
            </h3>
          </Link>
        </div>

        {/* Price & Action */}
        <div className="pt-3.5 border-t border-border/80 flex items-center justify-between">
          <div>
            <span className="block text-[9px] uppercase font-bold text-ink-muted tracking-wider">Mulai Dari</span>
            <span className="text-sm font-extrabold text-ink tracking-tight">
              Rp {concert.startingPrice.toLocaleString('id-ID')}
            </span>
          </div>

          <Link
            to={`/events/${concert.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-canvas hover:bg-coral-500 hover:text-white border border-border text-xs font-bold text-ink transition-all group-hover:border-coral-500"
          >
            <span>Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
