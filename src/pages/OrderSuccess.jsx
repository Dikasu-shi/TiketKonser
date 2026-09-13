import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Download,
  Calendar,
  MapPin,
  Ticket,
  QrCode,
  ArrowRight,
  Home,
  Clock,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/common/Button';

export const OrderSuccess = () => {
  const { lastOrder, bookingsHistory } = useBooking();
  const navigate = useNavigate();

  const order = lastOrder || bookingsHistory[0];

  useEffect(() => {
    // Trigger celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-ink font-display">Tidak Ada Bukti Pesanan</h2>
        <Link to="/events">
          <Button variant="primary">Jelajah Konser</Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Success Hero Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-3"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block font-display">
          Pembayaran Berhasil Dikonfirmasi
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight font-display">
          Selamat! E-Ticket Anda Telah Siap.
        </h1>
        <p className="text-sm text-ink-secondary max-w-md mx-auto">
          E-ticket digital dan bukti transaksi telah dikonfirmasi untuk akun <span className="text-ink font-semibold">{order.attendee.email}</span>.
        </p>
      </motion.div>

      {/* Digital Ticket Pass Stub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative rounded-3xl bg-surface border border-border shadow-sm overflow-hidden"
      >
        {/* Top Segment: Event Overview */}
        <div className="p-6 sm:p-8 space-y-6 border-b border-dashed border-border relative">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-ink-muted">Order ID</span>
              <p className="text-lg sm:text-xl font-mono font-extrabold text-coral-600 tracking-wider">
                {order.orderId}
              </p>
            </div>

            <span className="self-start px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              {order.status}
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink leading-tight font-display">
              {order.concertTitle}
            </h2>
            <p className="text-xs text-coral-600 font-bold mt-1">Artis: {order.artist}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ink-secondary">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-coral-500 shrink-0" />
              <span>{new Date(order.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-coral-500 shrink-0" />
              <span>Waktu: {order.time}</span>
            </div>
            <div className="flex items-center gap-2.5 sm:col-span-2">
              <MapPin className="w-4 h-4 text-coral-500 shrink-0" />
              <span>{order.venue}, {order.city}</span>
            </div>
          </div>
        </div>

        {/* Perforated Stub Cutouts */}
        <div className="absolute top-[48%] -left-4 w-8 h-8 rounded-full bg-canvas border border-border pointer-events-none hidden sm:block" />
        <div className="absolute top-[48%] -right-4 w-8 h-8 rounded-full bg-canvas border border-border pointer-events-none hidden sm:block" />

        {/* Bottom Segment: Ticket Holder & QR Code */}
        <div className="p-6 sm:p-8 bg-canvas/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3 w-full sm:w-auto text-xs">
            <div>
              <span className="block text-[10px] uppercase font-bold text-ink-muted font-display">Pemegang Tiket</span>
              <span className="font-bold text-ink text-sm">{order.attendee.fullName}</span>
            </div>
            {order.attendee.identityNumber || order.attendee.idCard ? (
              <div>
                <span className="block text-[10px] uppercase font-bold text-ink-muted font-display">
                  {order.attendee.identityType || 'Identitas'}
                </span>
                <span className="font-mono text-ink-secondary">{order.attendee.identityNumber || order.attendee.idCard}</span>
              </div>
            ) : (
              <div>
                <span className="block text-[10px] uppercase font-bold text-ink-muted font-display">Email Konfirmasi</span>
                <span className="text-ink-secondary">{order.attendee.email}</span>
              </div>
            )}
            <div>
              <span className="block text-[10px] uppercase font-bold text-ink-muted font-display">Kategori Tiket</span>
              <span className="font-bold text-coral-600">
                {order.tickets.map(t => `${t.quantity}× ${t.tierName}`).join(', ')}
              </span>
            </div>
          </div>

          {/* QR Code Pass */}
          <div className="p-4 bg-white rounded-2xl shrink-0 flex flex-col items-center gap-2 shadow-sm border border-border">
            <svg viewBox="0 0 100 100" className="w-28 h-28">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <rect x="10" y="10" width="25" height="25" fill="#171717" rx="2" />
              <rect x="15" y="15" width="15" height="15" fill="white" />
              <rect x="18" y="18" width="9" height="9" fill="#171717" />

              <rect x="65" y="10" width="25" height="25" fill="#171717" rx="2" />
              <rect x="70" y="15" width="15" height="15" fill="white" />
              <rect x="73" y="18" width="9" height="9" fill="#171717" />

              <rect x="10" y="65" width="25" height="25" fill="#171717" rx="2" />
              <rect x="15" y="70" width="15" height="15" fill="white" />
              <rect x="18" y="73" width="9" height="9" fill="#171717" />

              <rect x="42" y="12" width="6" height="6" fill="#171717" />
              <rect x="52" y="12" width="6" height="12" fill="#171717" />
              <rect x="42" y="24" width="16" height="6" fill="#171717" />
              <rect x="12" y="42" width="6" height="16" fill="#171717" />
              <rect x="24" y="42" width="12" height="6" fill="#171717" />
              <rect x="42" y="42" width="16" height="16" fill="#171717" rx="1" />
              <rect x="65" y="42" width="8" height="8" fill="#171717" />
              <rect x="78" y="42" width="12" height="6" fill="#171717" />
              <rect x="42" y="65" width="6" height="25" fill="#171717" />
              <rect x="54" y="70" width="14" height="6" fill="#171717" />
              <rect x="74" y="65" width="16" height="16" fill="#171717" />
              <rect x="54" y="82" width="36" height="8" fill="#171717" />
            </svg>
            <span className="text-[10px] font-mono font-bold text-ink uppercase tracking-wider">
              SCAN AT ENTRANCE
            </span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 no-print print:hidden">
        <Button
          variant="secondary"
          size="md"
          icon={Printer}
          onClick={handlePrint}
        >
          Cetak E-Ticket Pass
        </Button>

        <Link to="/my-tickets">
          <Button variant="primary" size="md" icon={Ticket}>
            Lihat di Tiket Saya
          </Button>
        </Link>

        <Link to="/">
          <Button variant="outline" size="md" icon={Home}>
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
};
