import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const OrderTimer = () => {
  const { timerSeconds, isTimerActive } = useBooking();

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const isUrgent = timerSeconds < 180; // Under 3 mins

  if (!isTimerActive) return null;

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-4 transition-colors shadow-sm ${
        isUrgent
          ? 'bg-rose-50/80 border-rose-200 text-rose-900'
          : 'bg-amber-50/60 border-amber-200 text-amber-900'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div className={`p-2.5 rounded-xl ${isUrgent ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-700'}`}>
          <Clock className="w-5 h-5 animate-spin-slow" />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-ink font-display">Selesaikan Pembayaran Anda</h4>
          <p className="text-xs text-ink-secondary mt-0.5">Tiket Anda diamankan sementara hingga batas waktu berakhir.</p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <span className="block text-[10px] uppercase font-bold text-ink-muted font-display">Sisa Waktu</span>
        <span className={`text-xl sm:text-2xl font-mono font-extrabold tracking-widest ${isUrgent ? 'text-rose-600' : 'text-amber-700'}`}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
};
