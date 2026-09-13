import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, X, Compass, SearchX } from 'lucide-react';
import { useConcerts } from '../hooks/useConcerts';
import { SearchBar } from '../components/common/SearchBar';
import { ConcertGrid } from '../components/concerts/ConcertGrid';
import { FilterPanel } from '../components/concerts/FilterPanel';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  const {
    concerts,
    totalCount,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCity,
    setSelectedCity,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    dateFilter,
    setDateFilter,
    resetFilters
  } = useConcerts(initialCategory);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync initial query params
  useEffect(() => {
    if (initialQuery) setSearchQuery(initialQuery);
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialSort) setSortBy(initialSort);
  }, []);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-coral-500 text-xs font-bold uppercase tracking-widest font-display">
          <Compass className="w-4 h-4" />
          <span>Katalog Acara</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight font-display">
              Jelajah Konser Musik
            </h1>
            <p className="text-sm text-ink-secondary mt-1 max-w-2xl">
              Temukan jadwal tur konser dan festival musik musisi favorit Anda di berbagai kota dengan antarmuka interaktif dan katalog lengkap.
            </p>
          </div>

          {/* Counter Badge */}
          <span className="px-4 py-2 rounded-xl bg-surface border border-border text-xs font-bold text-ink-secondary shrink-0 shadow-sm">
            Menampilkan <span className="text-coral-500 font-extrabold">{totalCount}</span> Konser
          </span>
        </div>

        {/* Search and Mobile Filter Trigger */}
        <div className="flex items-center gap-3 pt-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            size="lg"
            placeholder="Cari artis, konser, atau lokasi stadion..."
          />

          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3.5 rounded-xl bg-surface border border-border text-ink text-xs font-bold shrink-0 hover:bg-canvas shadow-sm transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-coral-500" />
            <span>Filter</span>
          </button>
        </div>

        {/* Active Filters Summary */}
        {(selectedCategory !== 'all' || selectedCity !== 'all' || dateFilter !== 'all' || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-ink-muted font-semibold">Filter aktif:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface border border-border text-ink shadow-sm">
                <span>"{searchQuery}"</span>
                <X className="w-3.5 h-3.5 text-ink-muted hover:text-ink cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-coral-500/10 border border-coral-500/30 text-coral-600 font-medium">
                <span className="capitalize">{selectedCategory}</span>
                <X className="w-3.5 h-3.5 text-coral-500 hover:text-coral-700 cursor-pointer" onClick={() => setSelectedCategory('all')} />
              </span>
            )}

            {selectedCity !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface border border-border text-ink shadow-sm">
                <span className="capitalize">{selectedCity}</span>
                <X className="w-3.5 h-3.5 text-ink-muted hover:text-ink cursor-pointer" onClick={() => setSelectedCity('all')} />
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs font-bold text-coral-500 hover:underline ml-2"
            >
              Hapus Semua
            </button>
          </div>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filter Aside */}
        <aside className="hidden lg:block p-6 rounded-2xl bg-surface border border-border shadow-sm sticky top-28">
          <FilterPanel
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
            priceRange={priceRange}
            onChangePrice={setPriceRange}
            dateFilter={dateFilter}
            onSelectDate={setDateFilter}
            sortBy={sortBy}
            onSelectSort={setSortBy}
            onReset={resetFilters}
          />
        </aside>

        {/* Concert Listing */}
        <main className="lg:col-span-3">
          {totalCount > 0 ? (
            <ConcertGrid concerts={concerts} columns={3} />
          ) : (
            <EmptyState
              icon={SearchX}
              title="Konser Tidak Ditemukan"
              description="Tidak ada konser yang cocok dengan filter atau kata kunci Anda. Coba reset filter untuk melihat semua pertunjukan."
              actionLabel="Reset Semua Filter"
              onActionClick={resetFilters}
            />
          )}
        </main>
      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative mt-auto w-full max-h-[85vh] overflow-y-auto bg-surface border-t border-border rounded-t-3xl p-6 z-10 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h3 className="text-base font-bold text-ink font-display">Filter & Urutkan</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-ink-muted hover:text-ink rounded-lg hover:bg-canvas"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterPanel
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                priceRange={priceRange}
                onChangePrice={setPriceRange}
                dateFilter={dateFilter}
                onSelectDate={setDateFilter}
                sortBy={sortBy}
                onSelectSort={setSortBy}
                onReset={resetFilters}
                isMobile
              />

              <div className="pt-4 border-t border-border">
                <Button
                  variant="primary"
                  fullWidth
                  size="md"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Terapkan Filter ({totalCount} Hasil)
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
