import React, { useState } from 'react';
import { Tag, Check, X, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../common/Button';

export const PromoCodeInput = () => {
  const [code, setCode] = useState('');
  const { appliedPromo, applyPromoCode, removePromoCode } = useBooking();

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const success = applyPromoCode(code);
    if (success) setCode('');
  };

  return (
    <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
          <Tag className="w-3.5 h-3.5 text-coral-500" /> Kode Voucher / Promo
        </label>
        <span className="text-[11px] text-ink-muted">Coba: <span className="font-mono font-bold text-coral-600">TIKETPROMO</span></span>
      </div>

      {appliedPromo ? (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
          <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="font-bold text-emerald-800 font-display">{appliedPromo.code}</p>
              <p className="text-[11px] text-emerald-700">{appliedPromo.description}</p>
            </div>
          </div>
          <button
            onClick={removePromoCode}
            className="text-emerald-700 hover:text-rose-600 p-1 transition-colors"
            title="Hapus promo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Masukkan kode promo..."
            className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase text-ink placeholder-ink-muted focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
          />
          <Button type="submit" variant="secondary" size="sm" disabled={!code.trim()}>
            Terapkan
          </Button>
        </form>
      )}
    </div>
  );
};
