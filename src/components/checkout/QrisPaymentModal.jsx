import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { QrCode, Sparkles, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const QrisPaymentModal = ({
  isOpen,
  onClose,
  totalAmount = 0,
  provider,
  onConfirmPayment,
  isProcessing = false
}) => {
  const [countdown, setCountdown] = useState(600); // 10 minutes timer

  useEffect(() => {
    if (!isOpen) {
      setCountdown(600);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pembayaran QRIS"
      maxWidth="max-w-md"
    >
      <div className="space-y-6 text-center">
        {/* Top Info Banner */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-coral-50 border border-coral-200 text-xs">
          <div className="flex items-center gap-2 text-coral-700 font-semibold font-display">
            <Clock className="w-4 h-4 text-coral-500 shrink-0" />
            <span>Selesaikan Pembayaran Dalam:</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono font-bold text-coral-700">
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-1">
          <p className="text-xs text-ink-secondary">
            Buka aplikasi <strong className="text-ink font-bold">{provider?.name || 'pembayaran Anda'}</strong> dan scan kode QR di bawah ini:
          </p>
        </div>

        {/* QRIS Frame */}
        <div className="p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col items-center gap-3 mx-auto max-w-[280px]">
          {/* QRIS Top Badge */}
          <div className="flex items-center justify-between w-full px-1">
            <span className="text-[12px] font-black tracking-widest text-ink font-mono uppercase">
              QRIS
            </span>
            <span className="text-[10px] font-bold text-ink-muted tracking-wider uppercase">
              {provider?.name || 'GPN'}
            </span>
          </div>

          {/* Dummy QR Matrix */}
          <div className="p-2 bg-white rounded-xl border border-border">
            <svg viewBox="0 0 100 100" className="w-44 h-44">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              {/* Corner 1: Top-Left */}
              <rect x="6" y="6" width="26" height="26" fill="#171717" rx="3" />
              <rect x="11" y="11" width="16" height="16" fill="white" rx="1" />
              <rect x="15" y="15" width="8" height="8" fill="#E4572E" rx="1" />

              {/* Corner 2: Top-Right */}
              <rect x="68" y="6" width="26" height="26" fill="#171717" rx="3" />
              <rect x="73" y="11" width="16" height="16" fill="white" rx="1" />
              <rect x="77" y="15" width="8" height="8" fill="#E4572E" rx="1" />

              {/* Corner 3: Bottom-Left */}
              <rect x="6" y="68" width="26" height="26" fill="#171717" rx="3" />
              <rect x="11" y="73" width="16" height="16" fill="white" rx="1" />
              <rect x="15" y="77" width="8" height="8" fill="#E4572E" rx="1" />

              {/* Timing Patterns */}
              <rect x="36" y="10" width="28" height="4" fill="#171717" />
              <rect x="36" y="18" width="8" height="8" fill="#171717" />
              <rect x="48" y="18" width="16" height="4" fill="#171717" />
              <rect x="10" y="36" width="4" height="28" fill="#171717" />
              <rect x="18" y="36" width="8" height="8" fill="#171717" />
              <rect x="18" y="48" width="4" height="16" fill="#171717" />

              {/* Center Matrix Simulation */}
              <rect x="36" y="36" width="28" height="28" fill="#171717" rx="2" />
              <rect x="40" y="40" width="20" height="20" fill="white" rx="1" />
              <rect x="44" y="44" width="12" height="12" fill="#E4572E" rx="1" />

              {/* Data Cells */}
              <rect x="68" y="36" width="8" height="12" fill="#171717" />
              <rect x="80" y="36" width="14" height="8" fill="#171717" />
              <rect x="68" y="52" width="26" height="4" fill="#171717" />
              <rect x="72" y="60" width="10" height="8" fill="#171717" />
              <rect x="86" y="60" width="8" height="16" fill="#171717" />

              <rect x="36" y="68" width="8" height="8" fill="#171717" />
              <rect x="48" y="68" width="16" height="4" fill="#171717" />
              <rect x="36" y="80" width="28" height="8" fill="#171717" />
              <rect x="68" y="80" width="14" height="8" fill="#171717" />
              <rect x="86" y="80" width="8" height="8" fill="#171717" />
            </svg>
          </div>

          <div className="text-center space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-ink block">
              TIKETKONSER
            </span>
            <span className="text-[9px] font-mono text-ink-muted block">
              NMID: ID1020268899001
            </span>
          </div>
        </div>

        {/* Total & Payment Channel Details */}
        <div className="p-4 rounded-xl bg-canvas border border-border text-left space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-ink-secondary">Metode:</span>
            <span className="font-bold text-ink">QRIS • {provider?.name || 'E-Wallet'}</span>
          </div>
          <div className="flex justify-between items-baseline pt-1 border-t border-border">
            <span className="text-ink-secondary font-medium">Total Pembayaran:</span>
            <span className="font-extrabold text-coral-600 text-base font-display">
              Rp {totalAmount.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Button
            type="button"
            variant="primary"
            fullWidth
            size="lg"
            icon={CheckCircle2}
            loading={isProcessing}
            disabled={isProcessing}
            onClick={onConfirmPayment}
          >
            {isProcessing ? 'Memverifikasi Pembayaran...' : 'Saya Sudah Membayar'}
          </Button>

          <Button
            type="button"
            variant="ghost"
            fullWidth
            size="sm"
            disabled={isProcessing}
            onClick={onClose}
          >
            Ubah Metode Pembayaran
          </Button>
        </div>
      </div>
    </Modal>
  );
};
