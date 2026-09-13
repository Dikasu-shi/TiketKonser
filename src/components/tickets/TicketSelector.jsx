import React from 'react';
import { Minus, Plus, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TicketSelector = ({
  tiers = [],
  selectedTickets = {},
  onUpdateQty,
  maxPerOrder = 6
}) => {
  const currentTotal = Object.values(selectedTickets).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      {tiers.map((tier) => {
        const qty = selectedTickets[tier.id] || 0;
        const isSoldOut = tier.available <= 0;
        const isSelected = qty > 0;

        return (
          <div
            key={tier.id}
            className={`p-5 rounded-2xl border transition-all duration-200 ${
              isSelected
                ? 'bg-surface border-coral-500 shadow-sm ring-1 ring-coral-500'
                : isSoldOut
                ? 'bg-canvas/50 border-border opacity-60'
                : 'bg-surface border-border hover:border-ink/30 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Category Info */}
              <div className="space-y-2 flex-grow">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: tier.color || '#E4572E' }}
                  />
                  <h4 className="text-base font-bold text-ink tracking-tight font-display">{tier.name}</h4>
                  
                  {tier.available <= 10 && tier.available > 0 && (
                    <Badge variant="warning" size="xs">
                      Sisa {tier.available} Tiket
                    </Badge>
                  )}

                  {isSoldOut && (
                    <Badge variant="danger" size="xs">
                      Habis
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-ink-secondary font-medium">
                  Tipe Tempat Duduk: <span className="text-ink font-semibold">{tier.seatType}</span>
                </p>

                {/* Benefits / Perks */}
                {tier.perks && tier.perks.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-ink-muted">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Price & Stepper Control */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-border shrink-0">
                <div className="text-left sm:text-right">
                  <span className="block text-[10px] uppercase font-bold text-ink-muted font-display">Harga per Tiket</span>
                  <span className="text-base font-extrabold text-ink font-display">
                    Rp {tier.price.toLocaleString('id-ID')}
                  </span>
                </div>

                {!isSoldOut ? (
                  <div className="flex items-center gap-2 bg-canvas border border-border rounded-xl p-1 shadow-sm">
                    <button
                      type="button"
                      disabled={qty <= 0}
                      onClick={() => onUpdateQty(tier.id, qty - 1)}
                      className="w-7 h-7 rounded-lg bg-surface border border-border hover:bg-border/40 disabled:opacity-30 disabled:hover:bg-surface text-ink flex items-center justify-center transition-colors shadow-xs"
                      title="Kurangi"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-8 text-center text-xs font-bold text-ink font-display">
                      {qty}
                    </span>

                    <button
                      type="button"
                      disabled={qty >= tier.available || currentTotal >= maxPerOrder}
                      onClick={() => onUpdateQty(tier.id, qty + 1)}
                      className="w-7 h-7 rounded-lg bg-coral-500 hover:bg-coral-600 disabled:opacity-30 disabled:hover:bg-coral-500 text-white flex items-center justify-center transition-colors shadow-xs"
                      title="Tambah"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-ink-muted py-1.5 px-3 rounded-lg bg-canvas border border-border">
                    Tidak Tersedia
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
