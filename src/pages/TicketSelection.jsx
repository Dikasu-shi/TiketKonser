import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, LayoutGrid, Map, Ticket, ShieldCheck, Clock } from 'lucide-react';
import { CONCERTS } from '../data/concerts';
import { useBooking } from '../context/BookingContext';
import { TicketSelector } from '../components/tickets/TicketSelector';
import { InteractiveSeatMap } from '../components/tickets/InteractiveSeatMap';
import { OrderSummaryCard } from '../components/tickets/OrderSummaryCard';
import { Button } from '../components/common/Button';

export const TicketSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selectedConcert,
    selectedTickets,
    setConcertForBooking,
    updateTicketQty,
    getTotalTicketCount
  } = useBooking();

  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const concert = CONCERTS.find((c) => c.id === id);

  useEffect(() => {
    if (concert && (!selectedConcert || selectedConcert.id !== concert.id)) {
      setConcertForBooking(concert);
    }
  }, [concert, selectedConcert]);

  if (!concert) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-ink font-display">Konser Tidak Ditemukan</h2>
        <Link to="/events">
          <Button variant="primary">Kembali ke Katalog</Button>
        </Link>
      </div>
    );
  }

  const handleSelectTierFromMap = (tier) => {
    const currentQty = selectedTickets[tier.id] || 0;
    updateTicketQty(tier.id, currentQty + 1);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8 pb-24">
      {/* Header and View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <Link
            to={`/events/${concert.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Detail Acara</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-display">
            Pilih Kategori & Tiket
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
            {concert.title} • {concert.venueName}
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center bg-canvas border border-border p-1 rounded-xl shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-dark text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Daftar Kategori</span>
          </button>

          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'map'
                ? 'bg-dark text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Denah Interaktif</span>
          </button>
        </div>
      </div>

      {/* Main Selection Area & Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Selector or Map */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {viewMode === 'list' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-ink tracking-tight font-display">Pilih Jumlah Tiket</h3>
                <p className="text-xs text-ink-muted">Maksimal 6 tiket per akun dalam satu sesi transaksi.</p>
              </div>

              <TicketSelector
                tiers={concert.ticketTiers}
                selectedTickets={selectedTickets}
                onUpdateQty={updateTicketQty}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-ink tracking-tight font-display">Denah Tata Letak Stadion</h3>
                <p className="text-xs text-ink-muted">Klik pada area blok denah stadion untuk menambahkan kuantitas tiket.</p>
              </div>

              <InteractiveSeatMap
                tiers={concert.ticketTiers}
                selectedTickets={selectedTickets}
                onSelectTier={handleSelectTierFromMap}
                venueName={concert.venueName}
              />
            </div>
          )}
        </div>

        {/* Right Column: Sticky Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <OrderSummaryCard onProceed={() => navigate('/checkout')} />
        </div>
      </div>
    </div>
  );
};
