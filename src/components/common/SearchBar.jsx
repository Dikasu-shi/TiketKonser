import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Cari konser, artis, atau kota...',
  className = '',
  onClear,
  size = 'md'
}) => {
  return (
    <div className={`relative flex items-center w-full bg-surface border border-border rounded-xl focus-within:border-coral-500 focus-within:ring-1 focus-within:ring-coral-500 transition-all shadow-sm ${className}`}>
      <Search className={`text-ink-muted shrink-0 ml-3.5 ${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      
      <input
        type="text"
        value={value}
        aria-label={placeholder}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent border-0 text-ink placeholder-ink-muted focus:outline-none focus:ring-0 px-3 ${
          size === 'lg' ? 'py-3 text-sm sm:text-base' : 'py-2.5 text-xs sm:text-sm'
        }`}
      />

      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Hapus pencarian"
          className="mr-3 p-1 text-ink-muted hover:text-ink rounded-md hover:bg-stone-100 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
