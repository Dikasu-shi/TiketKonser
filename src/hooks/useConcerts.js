import { useState, useMemo } from 'react';
import { CONCERTS } from '../data/concerts';

export const useConcerts = (initialCategory = 'all') => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCity, setSelectedCity] = useState('all');
  const [priceRange, setPriceRange] = useState(10000000); // Max default price
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'date-asc'
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'this-month', 'next-month'

  const filteredConcerts = useMemo(() => {
    return CONCERTS.filter((concert) => {
      // 1. Search Query (Title, Artist, Venue, City)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = concert.title.toLowerCase().includes(q);
        const matchArtist = concert.artist.toLowerCase().includes(q);
        const matchVenue = concert.venueName.toLowerCase().includes(q);
        const matchCity = concert.city.toLowerCase().includes(q);
        const matchGenre = concert.genre.toLowerCase().includes(q);
        if (!matchTitle && !matchArtist && !matchVenue && !matchCity && !matchGenre) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'all') {
        if (concert.categoryId !== selectedCategory) return false;
      }

      // 3. City Filter
      if (selectedCity !== 'all') {
        if (concert.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
      }

      // 4. Max Price Filter
      if (concert.startingPrice > priceRange) {
        return false;
      }

      // 5. Date Filter
      if (dateFilter !== 'all') {
        const concertDate = new Date(concert.date);
        const now = new Date('2026-09-01');
        if (dateFilter === 'this-month') {
          if (concertDate.getMonth() !== now.getMonth() || concertDate.getFullYear() !== now.getFullYear()) {
            return false;
          }
        } else if (dateFilter === 'next-month') {
          const nextMonth = (now.getMonth() + 1) % 12;
          if (concertDate.getMonth() !== nextMonth) {
            return false;
          }
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'trending') return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      // Default: Featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedCity, priceRange, sortBy, dateFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCity('all');
    setPriceRange(10000000);
    setSortBy('featured');
    setDateFilter('all');
  };

  return {
    concerts: filteredConcerts,
    totalCount: filteredConcerts.length,
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
  };
};
