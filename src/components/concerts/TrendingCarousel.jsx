import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const TrendingCarousel = ({ concerts = [] }) => {
  const trendingConcerts = concerts.filter(c => c.trending).slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {trendingConcerts.map((concert, idx) => (
        <div
          key={concert.id}
          className="relative group rounded-2xl overflow-hidden bg-surface border border-border hover:border-border-dark transition-all duration-200 shadow-card hover:shadow-card-hover transform-gpu hover:-translate-y-1 flex flex-col justify-between"
        >
          {/* Photo */}
          <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
            <img
              src={concert.bannerImage || concert.posterImage}
              alt={concert.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            />
            
            {/* Numbered Editorial Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark text-white text-[10px] font-bold tracking-wider">
              <Flame className="w-3.5 h-3.5 text-coral-400" />
              <span>SPOTLIGHT #{idx + 1}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-5 flex flex-col justify-between space-y-4 flex-grow">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-coral-600 mb-1.5">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{new Date(concert.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="text-border-dark">•</span>
                <MapPin className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                <span className="truncate text-ink-secondary">{concert.city}</span>
              </div>

              <h4 className="text-base font-bold text-ink leading-snug group-hover:text-coral-600 transition-colors line-clamp-1">
                {concert.title}
              </h4>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/80">
              <div>
                <span className="block text-[9px] uppercase font-bold text-ink-muted">Mulai</span>
                <span className="text-sm font-extrabold text-ink">
                  Rp {concert.startingPrice.toLocaleString('id-ID')}
                </span>
              </div>

              <Link to={`/events/${concert.id}`}>
                <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                  Pesan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
