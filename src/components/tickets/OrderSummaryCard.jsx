import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, ArrowRight, ShieldCheck, Clock, Trash2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../common/Button';

export const OrderSummaryCard = ({ onProceed, showCheckoutButton = true }) => {
  const {
    selectedConcert,
    selectedTickets,
    calculateSubtotal,
    calculateDiscount,
    calculateTotal,
    getTotalTicketCount,
    updateTicketQty,
    timerSeconds,
    isTimerActive
  } = useBooking();

  const navigate = useNavigate();

  const totalTickets = getTotalTicketCount();
  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = calculateTotal();
  const serviceFee = totalTickets * 25000;
  const tax = Math.round((subtotal - discount) * 0.11);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!selectedConcert) return null;

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 space-y-6 shadow-sm sticky top-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Ticket className="w-5 h-5 text-coral-500" />
          <h3 className="text-base font-bold text-ink tracking-tight font-display">Ringkasan Pesanan</h3>
        </div>

        {isTimerActive && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>
        )}
      </div>

      {/* Selected Concert Header */}
      <div className="flex gap-3 items-center">
        <img
          src={selectedConcert.posterImage || selectedConcert.bannerImage}
          alt={selectedConcert.title}
          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-border"
        />
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-ink truncate font-display">{selectedConcert.title}</h4>
          <p className="text-[11px] text-ink-muted truncate">{selectedConcert.venueName}</p>
          <p className="text-[11px] text-coral-600 font-semibold">{selectedConcert.time}</p>
        </div>
      </div>

      {/* Selected Tickets Breakdown */}
      <div className="space-y-3">
        <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block font-display">
          Tiket Dipilih ({totalTickets})
        </span>

        {totalTickets > 0 ? (
          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
            {Object.entries(selectedTickets).map(([tierId, qty]) => {
              const tier = selectedConcert.ticketTiers.find((t) => t.id === tierId);
              if (!tier || qty <= 0) return null;

              return (
                <div key={tierId} className="flex items-center justify-between text-xs p-3 rounded-xl bg-canvas border border-border">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-ink truncate font-display">{tier.name.split('—')[0]}</p>
                    <p className="text-[11px] text-ink-muted">
                      {qty} × Rp {tier.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-ink font-display">
                      Rp {(tier.price * qty).toLocaleString('id-ID')}
                    </span>
                    <button
                      onClick={() => updateTicketQty(tierId, 0)}
                      className="text-ink-muted hover:text-rose-600 p-1 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-ink-muted italic py-2">Belum ada tiket yang dipilih.</p>
        )}
      </div>

      {/* Financial Details */}
      {totalTickets > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-border text-xs text-ink-secondary">
          <div className="flex justify-between">
            <span>Subtotal Tiket</span>
            <span className="text-ink font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Potongan Diskon</span>
              <span>-Rp {discount.toLocaleString('id-ID')}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Biaya Layanan & Platform</span>
            <span className="text-ink font-semibold">Rp {serviceFee.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex justify-between">
            <span>Pajak Hiburan (11%)</span>
            <span className="text-ink font-semibold">Rp {tax.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex justify-between items-baseline pt-3 border-t border-border text-ink">
            <span className="text-sm font-bold font-display">Total Pembayaran</span>
            <span className="text-xl font-extrabold text-coral-600 font-display">
              Rp {total.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      )}

      {/* CTA Button */}
      {showCheckoutButton && (
        <Button
          variant="primary"
          fullWidth
          size="lg"
          disabled={totalTickets <= 0}
          onClick={onProceed || (() => navigate('/checkout'))}
          icon={ArrowRight}
          iconPosition="right"
        >
          {totalTickets > 0 ? 'Lanjutkan ke Pembayaran' : 'Pilih Minimal 1 Tiket'}
        </Button>
      )}

      {/* Trust & Guarantee */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-ink-muted font-medium text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Selesaikan pemesanan sebelum waktu habis.</span>
      </div>
    </div>
  );
};
