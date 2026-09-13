import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { CONCERTS } from '../data/concerts';

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'tiketkonser_demo_favorites';

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (e) {
      console.error('Failed to save favorites to sessionStorage', e);
    }
  }, [favoriteIds]);

  const toggleFavorite = (concertId) => {
    const concert = CONCERTS.find(c => c.id === concertId);
    const title = concert ? concert.title : 'Konser';

    setFavoriteIds((prev) => {
      const exists = prev.includes(concertId);
      if (exists) {
        addToast(`Dihapus dari daftar favorit: ${title}`, 'info');
        return prev.filter(id => id !== concertId);
      } else {
        addToast(`Ditambahkan ke favorit: ${title}`, 'success');
        return [...prev, concertId];
      }
    });
  };

  const isFavorite = (concertId) => favoriteIds.includes(concertId);

  const favoriteConcerts = CONCERTS.filter(c => favoriteIds.includes(c.id));

  return (
    <FavoritesContext.Provider value={{
      favoriteIds,
      favoriteConcerts,
      toggleFavorite,
      isFavorite,
      count: favoriteIds.length
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
