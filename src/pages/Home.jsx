import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  Ticket,
  Search,
  Sparkles,
  Flame,
  Music2,
  Calendar,
  MapPin
} from 'lucide-react';
import { CONCERTS } from '../data/concerts';
import { CATEGORIES } from '../data/categories';
import { ConcertGrid } from '../components/concerts/ConcertGrid';
import { CategoryCard } from '../components/concerts/CategoryCard';
import { TrendingCarousel } from '../components/concerts/TrendingCarousel';
import { Button } from '../components/common/Button';

export const Home = () => {
  const [heroSearch, setHeroSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/events?q=${encodeURIComponent(heroSearch)}`);
    } else {
      navigate('/events');
    }
  };

  const featuredConcerts = CONCERTS.filter((c) => {
    if (activeTab === 'all') return true;
    return c.categoryId === activeTab;
  }).slice(0, 8);

  const quickTags = ['Coldplay', 'Bruno Mars', 'Taylor Swift', 'BLACKPINK', 'EDM Festival'];
  const spotlightConcert = CONCERTS[0]; // Coldplay

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 sm:pb-24">
      {/* Editorial Hero Section */}
      <section className="relative pt-6 sm:pt-10">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="relative rounded-3xl bg-surface border border-border p-6 sm:p-10 lg:p-12 xl:p-14 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Editorial Headline & Search */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-coral-50 border border-coral-200 text-coral-600 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-coral-500" />
                  <span>Platform Tiket Konser & Festival Musik Live</span>
                </div>

                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-ink tracking-tight leading-[1.08]">
                  Experience the <br />
                  <span className="text-coral-500">Music Live.</span>
                </h1>

                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-xl">
                  Jelajahi konser, pilih area lewat denah interaktif, dan pesan tiket dengan mudah.
                </p>

                {/* Search Bar Form */}
                <form onSubmit={handleSearchSubmit} className="pt-2">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl bg-canvas border border-border p-1.5 rounded-2xl shadow-xs focus-within:border-coral-500 focus-within:ring-1 focus-within:ring-coral-500 transition-all">
                    <div className="flex items-center gap-3 px-3 flex-grow">
                      <Search className="w-5 h-5 text-ink-muted shrink-0" />
                      <input
                        type="text"
                        value={heroSearch}
                        onChange={(e) => setHeroSearch(e.target.value)}
                        placeholder="Cari artis, konser, atau venue stadion..."
                        className="w-full bg-transparent border-0 text-ink placeholder-ink-muted focus:outline-none focus:ring-0 text-xs sm:text-sm py-2"
                      />
                    </div>
                    <Button type="submit" variant="primary" size="md" icon={Compass} iconPosition="right">
                      Jelajah Acara
                    </Button>
                  </div>

                  {/* Popular Tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
                    <span className="text-ink-muted font-semibold">Populer:</span>
                    {quickTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => navigate(`/events?q=${encodeURIComponent(tag)}`)}
                        className="px-2.5 py-1 rounded-md bg-canvas hover:bg-stone-200 border border-border text-ink-secondary hover:text-ink transition-colors font-medium"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </form>

                {/* Feature highlight pills */}
                <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-ink-secondary font-medium">
                  <span className="flex items-center gap-1.5 text-ink">
                    <Zap className="w-4 h-4 text-coral-500" /> Denah Stadion Interaktif
                  </span>
                  <span className="flex items-center gap-1.5 text-ink">
                    <Ticket className="w-4 h-4 text-coral-500" /> E-Tiket dengan QR Code
                  </span>
                  <span className="flex items-center gap-1.5 text-ink">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> 10 Menit untuk Checkout
                  </span>
                </div>
              </div>

              {/* Right Column: Featured Spotlight Showcase Card */}
              {spotlightConcert && (
                <div className="lg:col-span-5">
                  <div className="relative group rounded-2xl overflow-hidden bg-surface border border-border shadow-card hover:shadow-card-hover transition-all duration-200">
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <img
                        src={spotlightConcert.posterImage || spotlightConcert.bannerImage}
                        alt={spotlightConcert.title}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
                      
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-md bg-coral-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                        <Flame className="w-3.5 h-3.5 text-white" />
                        <span>Featured Spotlight</span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-md bg-white/90 text-xs font-bold text-ink">
                          {spotlightConcert.genre}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-xs font-semibold text-coral-300 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {spotlightConcert.date} • {spotlightConcert.time}
                        </span>
                        <h3 className="text-xl font-extrabold text-white leading-tight mt-1">
                          {spotlightConcert.title}
                        </h3>
                        <p className="text-xs text-stone-300 truncate mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          {spotlightConcert.venueName}, {spotlightConcert.city}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 flex items-center justify-between bg-surface border-t border-border">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-ink-muted block">Harga Tiket Mulai</span>
                        <span className="text-lg font-black text-ink">
                          Rp {spotlightConcert.startingPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <Link to={`/events/${spotlightConcert.id}`}>
                        <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                          Pesan Tiket
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Genre Section */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-coral-600 text-xs font-bold uppercase tracking-widest mb-1">
              <Music2 className="w-4 h-4" />
              <span>Jelajah Berdasarkan Genre</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Pilih Suasana Musik Favoritmu
            </h2>
          </div>
          <Link to="/events" className="text-xs font-bold text-coral-600 hover:text-coral-700 flex items-center gap-1">
            <span>Lihat Semua Kategori</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Spotlight Trending Section */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-coral-600 text-xs font-bold uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 text-coral-500" />
              <span>Trending Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Paling Banyak Dicari Minggu Ini
            </h2>
          </div>
          <Link to="/events?sort=trending">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              Lihat Trending
            </Button>
          </Link>
        </div>

        <TrendingCarousel concerts={CONCERTS} />
      </section>

      {/* Upcoming Concerts Grid */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-bold text-coral-600 uppercase tracking-widest block mb-1">
              Jadwal Panggung
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Konser Musik Mendatang
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 bg-surface p-1 rounded-xl border border-border overflow-x-auto max-w-full shadow-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-ink text-white shadow-xs'
                  : 'text-ink-secondary hover:text-ink hover:bg-stone-100'
              }`}
            >
              Semua
            </button>
            {CATEGORIES.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === cat.slug
                    ? 'bg-ink text-white shadow-xs'
                    : 'text-ink-secondary hover:text-ink hover:bg-stone-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <ConcertGrid concerts={featuredConcerts} columns={4} />

        <div className="mt-12 text-center">
          <Link to="/events">
            <Button variant="outline" size="lg" icon={Compass} iconPosition="right">
              Jelajahi Seluruh Konser ({CONCERTS.length} Acara)
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
