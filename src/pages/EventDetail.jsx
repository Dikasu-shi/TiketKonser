import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  ShieldCheck,
  Ticket,
  ChevronRight,
  Info,
  Users,
  CheckCircle2,
  Navigation,
  Sparkles
} from 'lucide-react';
import { CONCERTS } from '../data/concerts';
import { VENUES } from '../data/venues';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'lineup', 'venue', 'terms'

  const concert = CONCERTS.find((c) => c.id === id);

  if (!concert) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-ink font-display">Konser Tidak Ditemukan</h2>
        <p className="text-sm text-ink-secondary">Konser yang Anda cari mungkin telah selesai atau tautan tidak valid.</p>
        <Link to="/events">
          <Button variant="primary">Kembali ke Katalog Konser</Button>
        </Link>
      </div>
    );
  }

  const venue = VENUES[concert.venueId] || {
    name: concert.venueName,
    city: concert.city,
    address: `${concert.venueName}, ${concert.city}`,
    capacity: 50000,
    directions: 'Akses kendaraan umum dan shuttle bus tersedia di sekitar area stadion.'
  };

  const favorited = isFavorite(concert.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Tautan konser berhasil disalin ke clipboard!', 'success');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Breadcrumbs */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-6">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink transition-colors">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/events" className="hover:text-ink transition-colors">Konser</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-ink font-semibold truncate max-w-xs">{concert.title}</span>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[500px] bg-dark border border-border shadow-md flex flex-col justify-end p-6 sm:p-10 lg:p-12">
          {/* Banner Photo */}
          <img
            src={concert.bannerImage || concert.posterImage}
            alt={concert.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => {
              if (concert.posterImage && e.currentTarget.src !== concert.posterImage) {
                e.currentTarget.src = concert.posterImage;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/65 to-dark/25 pointer-events-none" />

          {/* Top Badges & Actions */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-full bg-coral-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                {concert.genre}
              </span>
              {concert.badge && (
                <span className="px-3.5 py-1 rounded-full bg-black/60 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  {concert.badge}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                aria-label="Bagikan Tautan Konser"
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-colors"
                title="Bagikan Tautan"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleFavorite(concert.id)}
                aria-label={favorited ? `Hapus ${concert.title} dari favorit` : `Simpan ${concert.title} ke favorit`}
                className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
                  favorited
                    ? 'bg-rose-500 text-white border-rose-400 scale-105 shadow-sm'
                    : 'bg-black/50 text-white hover:bg-black/80 border-white/20'
                }`}
                title={favorited ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Banner Content */}
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm font-semibold text-white/90">
              <span className="flex items-center gap-1.5 text-coral-400 font-bold">
                <Calendar className="w-4 h-4 text-coral-400 shrink-0" />
                {formatDate(concert.date)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-white/70 shrink-0" />
                Pintu Masuk: {concert.doorsOpen}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-white/70 shrink-0" />
                {concert.venueName}, {concert.city}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display drop-shadow-md">
              {concert.title}
            </h1>

            <p className="text-sm text-white/80 leading-relaxed line-clamp-2 max-w-2xl font-normal">
              {concert.description}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Booking Action Strip */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center text-coral-500 shrink-0">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-ink-muted block tracking-wider font-display">Harga Tiket Mulai Dari</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-display">
                  Rp {concert.startingPrice.toLocaleString('id-ID')}
                </span>
                <span className="text-xs text-ink-secondary font-medium">/ tiket</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link to={`/events/${concert.id}/tickets`} className="w-full sm:w-auto">
              <Button variant="primary" size="lg" icon={Ticket} fullWidth>
                Pilih Kategori & Pesan Tiket
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Details & Tabs Grid */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Tabbed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Selector */}
            <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto">
              {[
                { id: 'overview', label: 'Deskripsi Acara' },
                { id: 'lineup', label: 'Lineup & Artis' },
                { id: 'venue', label: 'Informasi Venue' },
                { id: 'terms', label: 'Syarat & Ketentuan' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-dark text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink hover:bg-surface border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-sm text-ink-secondary leading-relaxed"
              >
                <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-ink font-display">Tentang Konser</h3>
                  <p className="whitespace-pre-line leading-relaxed text-ink-secondary">
                    {concert.description}
                  </p>
                </div>

                {/* Available Tiers Overview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-ink font-display">Daftar Kategori Tiket</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {concert.ticketTiers.map((tier) => (
                      <div
                        key={tier.id}
                        className="p-5 rounded-xl bg-surface border border-border shadow-sm space-y-2 hover:border-coral-500/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-ink font-display">{tier.name.split('—')[0]}</h4>
                          <span className="text-xs font-bold text-coral-600 font-display">
                            Rp {tier.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <p className="text-xs text-ink-muted">Tipe: {tier.seatType}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Lineup */}
            {activeTab === 'lineup' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-ink font-display">Bintang Utama & Musisi Pengisi Acara</h3>
                  <div className="space-y-3">
                    {concert.lineup.map((performer, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 rounded-xl bg-canvas border border-border"
                      >
                        <div className="w-8 h-8 rounded-lg bg-coral-500/10 border border-coral-500/20 flex items-center justify-center text-coral-600 font-bold text-xs">
                          #{idx + 1}
                        </div>
                        <span className="text-sm font-bold text-ink">{performer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Venue */}
            {activeTab === 'venue' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-ink font-display">{venue.name}</h3>
                      <p className="text-xs text-ink-muted mt-1">{venue.address}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-canvas border border-border text-xs font-bold text-ink-secondary">
                      Kapasitas ~{venue.capacity.toLocaleString('id-ID')} Fans
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-canvas border border-border space-y-2">
                    <h4 className="text-xs font-bold text-coral-600 uppercase tracking-wider flex items-center gap-1.5 font-display">
                      <Navigation className="w-3.5 h-3.5" /> Petunjuk Arah & Transportasi
                    </h4>
                    <p className="text-xs text-ink-secondary leading-relaxed">{venue.directions}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Terms */}
            {activeTab === 'terms' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-ink font-display">Ketentuan Pembelian & Masuk Venue</h3>
                  <ul className="space-y-3">
                    {concert.terms.map((term, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-secondary">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Sticky Event Summary Box */}
          <div className="space-y-6 sticky top-28">
            <div className="p-6 rounded-2xl bg-surface border border-border space-y-6 shadow-sm">
              <h3 className="text-base font-bold text-ink tracking-tight font-display">Ringkasan Acara</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-coral-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-ink">{formatDate(concert.date)}</span>
                    <span className="text-ink-muted">Mulai {concert.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-coral-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-ink">{concert.venueName}</span>
                    <span className="text-ink-muted">{concert.city}, Indonesia</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-ink">E-Ticket Digital Instan</span>
                    <span className="text-ink-muted">Dilengkapi kode QR unik</span>
                  </div>
                </div>
              </div>

              <Link to={`/events/${concert.id}/tickets`}>
                <Button variant="primary" fullWidth size="md" icon={Ticket}>
                  Pesan Tiket Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
