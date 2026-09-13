import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import {
  Sparkles,
  Building2,
  CreditCard,
  Smartphone,
  Copy,
  Check,
  CheckCircle2,
  ShieldCheck,
  Lock,
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const PaymentSimulationModal = ({
  isOpen,
  onClose,
  paymentMethod,
  totalAmount = 0,
  customerName = '',
  customerPhone = '',
  onConfirmPayment,
  isProcessing = false
}) => {
  const [copied, setCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Card form state for Credit Card simulation
  const [cardData, setCardData] = useState({
    cardNumber: '4000 1234 5678 9010',
    cardHolder: customerName || 'Budi Pratama',
    expiry: '12/28',
    cvv: '888'
  });

  useEffect(() => {
    if (customerName) {
      setCardData(prev => ({
        ...prev,
        cardHolder: prev.cardHolder || customerName
      }));
    }
  }, [customerName]);

  const getVaNumber = () => {
    if (paymentMethod?.id === 'bca_va') {
      return '1234 5678 9012 3456';
    }
    if (paymentMethod?.id === 'mandiri_va') {
      return '8800 1234 5678 9012';
    }
    return '1234 5678 9012 3456';
  };

  const handleCopyVa = () => {
    const rawNumber = getVaNumber().replace(/\s/g, '');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rawNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      // Format 16 digits with spaces
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
      setCardData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'expiry') {
      // Format MM/YY
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      if (cleaned.length >= 2) {
        setCardData(prev => ({ ...prev, [name]: `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` }));
      } else {
        setCardData(prev => ({ ...prev, [name]: cleaned }));
      }
    } else if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 3);
      setCardData(prev => ({ ...prev, [name]: cleaned }));
    } else {
      setCardData(prev => ({ ...prev, [name]: value }));
    }
  };

  const isCard = paymentMethod?.id === 'credit_card';
  const isGoPay = paymentMethod?.id === 'gopay_ewallet';
  const isVa = paymentMethod?.id === 'bca_va' || paymentMethod?.id === 'mandiri_va';

  const modalTitle = isCard
    ? 'Kartu Kredit / Debit Online'
    : isGoPay
    ? 'Pembayaran GoPay'
    : (paymentMethod?.name || 'Virtual Account');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="max-w-md"
    >
      <div className="space-y-6 text-center">
        {/* VA FLOW (BCA / Mandiri) */}
        {isVa && (
          <div className="space-y-4 text-left">
            {/* VA Number Card */}
            <div className="p-4 rounded-2xl bg-canvas border border-border space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-ink font-bold text-xs font-display">
                  <Building2 className="w-4 h-4 text-coral-500" />
                  <span>{paymentMethod?.name}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Otomatis Terverifikasi
                </span>
              </div>

              <div className="pt-1">
                <span className="text-[11px] text-ink-muted block">Nomor Virtual Account:</span>
                <div className="flex items-center justify-between gap-2 mt-1 bg-surface p-3 rounded-xl border border-border">
                  <span className="font-mono font-extrabold text-base sm:text-lg text-ink tracking-wider select-all">
                    {getVaNumber()}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyVa}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-canvas border border-border hover:bg-stone-100 text-xs font-semibold text-ink transition-colors shrink-0"
                    title="Salin Nomor VA"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 text-[11px]">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-ink-muted" />
                        <span className="text-[11px]">Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-ink-muted flex justify-between pt-1">
                <span>Nama Penerima:</span>
                <span className="font-bold text-ink truncate max-w-[200px]">
                  TIKETKONSER / {customerName || 'Pembeli'}
                </span>
              </div>
            </div>

            {/* Instruction Accordion */}
            <div className="rounded-xl border border-border overflow-hidden bg-surface text-xs">
              <button
                type="button"
                onClick={() => setShowInstructions(!showInstructions)}
                className="w-full px-4 py-3 flex items-center justify-between font-bold text-ink text-left bg-canvas hover:bg-stone-100/80 transition-colors"
              >
                <span className="flex items-center gap-1.5 font-display">
                  <HelpCircle className="w-3.5 h-3.5 text-coral-500" />
                  Petunjuk Pembayaran Virtual Account
                </span>
                <ChevronDown className={`w-4 h-4 text-ink-muted transition-transform ${showInstructions ? 'rotate-180' : ''}`} />
              </button>

              {showInstructions && (
                <div className="p-4 space-y-2 text-ink-secondary text-[11px] leading-relaxed border-t border-border">
                  {paymentMethod?.id === 'bca_va' ? (
                    <ol className="list-decimal list-inside space-y-1.5 pl-1">
                      <li>Buka aplikasi <strong>BCA mobile</strong>, <strong>myBCA</strong>, atau kunjungi <strong>ATM BCA</strong>.</li>
                      <li>Pilih menu <strong>m-Transfer</strong> → <strong>BCA Virtual Account</strong>.</li>
                      <li>Masukkan nomor VA: <strong className="font-mono text-ink">{getVaNumber()}</strong>.</li>
                      <li>Periksa nama pemesan & nominal tagihan sudah sesuai.</li>
                      <li>Setelah transfer berhasil, klik tombol <strong>"Saya Sudah Membayar"</strong> di bawah.</li>
                    </ol>
                  ) : (
                    <ol className="list-decimal list-inside space-y-1.5 pl-1">
                      <li>Buka aplikasi <strong>Livin' by Mandiri</strong> atau kunjungi <strong>ATM Mandiri</strong>.</li>
                      <li>Pilih menu <strong>Bayar</strong> → <strong>Virtual Account / Multi Payment</strong>.</li>
                      <li>Masukkan nomor VA: <strong className="font-mono text-ink">{getVaNumber()}</strong>.</li>
                      <li>Periksa detail tagihan tiket konser Anda.</li>
                      <li>Setelah transfer berhasil, klik tombol <strong>"Saya Sudah Membayar"</strong> di bawah.</li>
                    </ol>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CREDIT / DEBIT CARD FLOW */}
        {isCard && (
          <div className="space-y-4 text-left">
            <div className="p-4 rounded-2xl bg-canvas border border-border space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center gap-2 text-ink font-bold text-xs font-display">
                  <CreditCard className="w-4 h-4 text-coral-500" />
                  <span>Rincian Kartu Kredit / Debit</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>3D Secure</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-ink block font-display">Nomor Kartu</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardData.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="4000 1234 5678 9010"
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs font-mono text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-ink block font-display">Nama Pemegang Kartu</label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={cardData.cardHolder}
                    onChange={handleCardInputChange}
                    placeholder="Nama pada kartu"
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-ink block font-display">Masa Berlaku</label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardData.expiry}
                      onChange={handleCardInputChange}
                      placeholder="MM/YY"
                      className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs font-mono text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-ink block font-display">CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      maxLength={3}
                      value={cardData.cvv}
                      onChange={handleCardInputChange}
                      placeholder="123"
                      className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs font-mono text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-ink-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Transaksi terenkripsi secara aman dengan standar PCI-DSS & 3D Secure.</span>
              </div>
            </div>
          </div>
        )}

        {/* GOPAY FLOW */}
        {isGoPay && (
          <div className="space-y-4 text-left">
            <div className="p-4 rounded-2xl bg-canvas border border-border space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center gap-2 text-ink font-bold text-xs font-display">
                  <Smartphone className="w-4 h-4 text-coral-500" />
                  <span>GoPay Instant Checkout</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Terhubung
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-ink-secondary">
                  <span>Nomor HP Akun:</span>
                  <span className="font-mono font-bold text-ink">{customerPhone || '0812-3456-7890'}</span>
                </div>
                <div className="flex justify-between items-center text-ink-secondary">
                  <span>Saldo GoPay:</span>
                  <span className="font-bold text-emerald-600">Rp 2.500.000</span>
                </div>
                <div className="flex justify-between items-center text-ink-secondary pt-2 border-t border-border">
                  <span>Nominal Tagihan:</span>
                  <span className="font-bold text-coral-600">Rp {totalAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-surface border border-border text-[11px] text-ink-secondary leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Pembayaran instan 1-klik via saldo GoPay tanpa biaya admin tambahan.</span>
              </div>
            </div>
          </div>
        )}

        {/* Total Price Summary */}
        <div className="p-4 rounded-xl bg-canvas border border-border text-left space-y-1.5 text-xs">
          <div className="flex justify-between items-center text-ink-secondary">
            <span>Metode Terpilih:</span>
            <span className="font-bold text-ink">{paymentMethod?.name}</span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-border">
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
            icon={isCard ? Lock : CheckCircle2}
            loading={isProcessing}
            disabled={isProcessing}
            onClick={onConfirmPayment}
          >
            {isProcessing
              ? 'Memverifikasi Pembayaran...'
              : isCard
              ? `Bayar Rp ${totalAmount.toLocaleString('id-ID')}`
              : isGoPay
              ? 'Konfirmasi Pembayaran'
              : 'Saya Sudah Membayar'}
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
