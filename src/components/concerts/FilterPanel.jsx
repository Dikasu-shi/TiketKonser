import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { RotateCcw, SlidersHorizontal, Check, Calendar, MapPin, DollarSign, ArrowUpDown } from 'lucide-react';

export const FilterPanel = ({
  selectedCategory,
  onSelectCategory,
  selectedCity,
  onSelectCity,
  priceRange,
  onChangePrice,
  dateFilter,
  onSelectDate,
  sortBy,
  onSelectSort,
  onReset,
  className = '',
  isMobile = false
}) => {
  const cities = [
    { id: 'all', name: 'Semua Kota' },
    { id: 'jakarta', name: 'Jakarta' },
    { id: 'tangerang', name: 'Tangerang' }
  ];

  const datePresets = [
    { id: 'all', name: 'Semua Tanggal' },
    { id: 'this-month', name: 'Bulan Ini (Sep 2026)' },
    { id: 'next-month', name: 'Bulan Depan (Okt 2026)' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Paling Direkomendasikan' },
    { id: 'trending', name: 'Sedang Trending' },
    { id: 'price-asc', name: 'Harga: Termurah ke Termahal' },
    { id: 'price-desc', name: 'Harga: Termahal ke Termurah' },
    { id: 'date-asc', name: 'Tanggal: Terdekat' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-coral-500" />
          <h3 className="text-xs font-bold text-ink tracking-wider uppercase font-display">Filter Konser</h3>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-coral-500 transition-colors"
          title="Reset semua filter"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort Option */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-coral-500" /> Urutkan Berdasarkan
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSelectSort(e.target.value)}
          className="w-full bg-canvas border border-border text-ink text-xs font-medium rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition-colors cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.id} value={opt.id} className="bg-surface text-ink">
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      {/* Genre Categories */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-ink">Kategori / Genre</label>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-coral-500/10 text-coral-600 border border-coral-500/30'
                : 'text-ink-secondary hover:text-ink hover:bg-canvas'
            }`}
          >
            <span>Semua Genre</span>
            {selectedCategory === 'all' && <Check className="w-4 h-4 text-coral-500" />}
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-coral-500/10 text-coral-600 border border-coral-500/30'
                  : 'text-ink-secondary hover:text-ink hover:bg-canvas'
              }`}
            >
              <span>{cat.name}</span>
              {selectedCategory === cat.slug && <Check className="w-4 h-4 text-coral-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-ink flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-coral-500" /> Lokasi Kota
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCity === city.id
                  ? 'bg-dark text-white shadow-sm'
                  : 'text-ink-secondary hover:text-ink hover:bg-canvas border border-transparent'
              }`}
            >
              <span>{city.name}</span>
              {selectedCity === city.id && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-ink flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-coral-500" /> Waktu Konser
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {datePresets.map((d) => (
            <button
              key={d.id}
              onClick={() => onSelectDate(d.id)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                dateFilter === d.id
                  ? 'bg-dark text-white shadow-sm'
                  : 'text-ink-secondary hover:text-ink hover:bg-canvas border border-transparent'
              }`}
            >
              <span>{d.name}</span>
              {dateFilter === d.id && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-ink flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-coral-500" /> Maks. Harga Tiket
          </label>
          <span className="text-xs font-bold text-coral-600 font-display">
            Rp {priceRange.toLocaleString('id-ID')}
          </span>
        </div>
        <input
          type="range"
          min="800000"
          max="10000000"
          step="200000"
          value={priceRange}
          onChange={(e) => onChangePrice(Number(e.target.value))}
          className="w-full accent-coral-500 cursor-pointer h-2 bg-border rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[11px] text-ink-muted font-medium">
          <span>Rp 800rb</span>
          <span>Rp 10jt+</span>
        </div>
      </div>
    </div>
  );
};
