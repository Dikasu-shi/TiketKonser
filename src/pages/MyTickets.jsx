import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Ticket,
  Calendar,
  MapPin,
  QrCode,
  Download,
  Clock,
  Printer,
  ChevronRight,
  ShieldCheck,
  Compass,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';

export const MyTickets = () => {
  const { isAuthenticated } = useAuth();
  const { bookingsHistory } = useBooking();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'past'
  const [selectedQrOrder, setSelectedQrOrder] = useState(null);

  const now = new Date('2026-09-01');

  const upcomingTickets = bookingsHistory.filter(order => new Date(order.date) >= now);
  const pastTickets = bookingsHistory.filter(order => new Date(order.date) < now);

  const displayedOrders = activeTab === 'upcoming' ? upcomingTickets : pastTickets;

  // Graceful handling for unauthenticated guest visitor
  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="max-w-md mx-auto text-center space-y-6 p-8 sm:p-10 rounded-3xl bg-surface border border-border shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-coral-50 border border-coral-200 text-coral-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-ink tracking-tight font-display">
              Masuk untuk Melihat E-Ticket
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Silakan masuk ke akun Anda untuk melihat tiket konser yang telah dipesan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="primary" fullWidth size="md" icon={ArrowRight} iconPosition="right">
                Masuk ke Akun
              </Button>
            </Link>
            <Link to="/events" className="w-full sm:w-auto">
              <Button variant="outline" fullWidth size="md" icon={Compass}>
                Jelajah Konser
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8 pb-20">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-coral-500 text-xs font-bold uppercase tracking-widest mb-1 font-display">
            <Ticket className="w-4 h-4" />
            <span>Dashboard Tiket Saya</span>
          </div>
          <h1 className="text-3xl font-extrabold text-ink tracking-tight font-display">
            Koleksi E-Ticket Konser
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Akses seluruh barcode dan bukti e-ticket Anda untuk verifikasi pintu masuk venue.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-canvas border border-border p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-dark text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink'
            }`}
          >
            Akan Datang ({upcomingTickets.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'past'
                ? 'bg-dark text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink'
            }`}
          >
            Riwayat Selesai ({pastTickets.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {displayedOrders.length > 0 ? (
        <div className="space-y-6">
          {displayedOrders.map((order) => (
            <motion.div
              key={order.orderId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-surface border border-border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-coral-500/40 transition-colors"
            >
              {/* Event & Ticket Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={order.posterImage}
                  alt={order.concertTitle}
                  className="w-full sm:w-28 h-36 rounded-2xl object-cover shrink-0 border border-border"
                />

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                      {order.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-coral-600">
                      #{order.orderId}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-ink tracking-tight leading-snug font-display">
                    {order.concertTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-ink-secondary font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-coral-500" />
                      {new Date(order.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-coral-500" />
                      {order.time}
                    </span>
                    <span className="flex items-center gap-1.5 truncate max-w-xs">
                      <MapPin className="w-3.5 h-3.5 text-coral-500" />
                      {order.venue}, {order.city}
                    </span>
                  </div>

                  <p className="text-xs text-ink-secondary">
                    Kategori:{' '}
                    <span className="text-ink font-bold">
                      {order.tickets.map(t => `${t.quantity}× ${t.tierName}`).join(', ')}
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-border">
                <Button
                  variant="primary"
                  size="sm"
                  icon={QrCode}
                  onClick={() => setSelectedQrOrder(order)}
                >
                  Tampilkan QR Pass
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  icon={Printer}
                  onClick={() => window.print()}
                >
                  Unduh / Cetak E-Ticket
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Ticket}
          title={activeTab === 'upcoming' ? 'Belum Ada Tiket Dipesan' : 'Belum Ada Riwayat Konser'}
          description="Anda belum memiliki tiket konser dalam sesi ini. Temukan dan pesan tiket konser impian Anda sekarang!"
          actionLabel="Jelajah Konser Sekarang"
          actionLink="/events"
        />
      )}

      {/* QR Code Pass Modal */}
      {selectedQrOrder && (
        <Modal
          isOpen={!!selectedQrOrder}
          onClose={() => setSelectedQrOrder(null)}
          title="Digital Ticket Pass"
        >
          <div className="space-y-6 text-center">
            <div className="p-4 rounded-2xl bg-canvas border border-border inline-block">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TIKETKONSER-ORDER-${selectedQrOrder.orderId}`}
                alt="QR Pass"
                className="w-48 h-48 mx-auto rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-coral-600 bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
                #{selectedQrOrder.orderId}
              </span>
              <h3 className="text-lg font-bold text-ink font-display">
                {selectedQrOrder.concertTitle}
              </h3>
              <p className="text-xs text-ink-secondary">
                {selectedQrOrder.venue}, {selectedQrOrder.city} • {selectedQrOrder.time}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-ink-secondary">Pemesan:</span>
                <span className="font-bold text-ink">{selectedQrOrder.attendee?.fullName || selectedQrOrder.customerName || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Kategori:</span>
                <span className="font-bold text-ink">
                  {selectedQrOrder.tickets?.map(t => `${t.quantity}x ${t.tierName}`).join(', ')}
                </span>
              </div>
              {((selectedQrOrder.seats && selectedQrOrder.seats.length > 0) || (selectedQrOrder.selectedSeats && selectedQrOrder.selectedSeats.length > 0)) && (
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Nomor Kursi:</span>
                  <span className="font-bold text-ink">
                    {selectedQrOrder.seats
                      ? selectedQrOrder.seats.map(s => s.seatNumber || s.id || s).join(', ')
                      : selectedQrOrder.selectedSeats.join(', ')}
                  </span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-ink-secondary">
              Tunjukkan QR code ini saat verifikasi tiket di lokasi venue.
            </p>

            <Button
              variant="primary"
              fullWidth
              onClick={() => setSelectedQrOrder(null)}
            >
              Tutup
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
