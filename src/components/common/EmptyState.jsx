import React from 'react';
import { Ticket, SearchX, Heart, Frown } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: Icon = SearchX,
  title = 'Tidak Ada Hasil Ditemukan',
  description = 'Coba ubah kata kunci pencarian atau sesuaikan filter untuk melihat konser lainnya.',
  actionLabel,
  actionLink,
  onActionClick
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center text-coral-500 mb-4 shadow-sm">
        <Icon className="w-8 h-8 text-coral-500" />
      </div>

      <h3 className="text-lg font-bold text-ink mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6">{description}</p>

      {actionLabel && actionLink && (
        <Link to={actionLink}>
          <Button variant="primary" size="sm">
            {actionLabel}
          </Button>
        </Link>
      )}

      {actionLabel && onActionClick && !actionLink && (
        <Button variant="secondary" size="sm" onClick={onActionClick}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
