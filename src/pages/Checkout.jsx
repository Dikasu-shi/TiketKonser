import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, IdCard, ShieldCheck, Lock, CreditCard, Ticket } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { OrderTimer } from '../components/checkout/OrderTimer';
import { PaymentMethodSelector, PAYMENT_METHODS } from '../components/checkout/PaymentMethodSelector';
import { PromoCodeInput } from '../components/checkout/PromoCodeInput';
import { QrisProviderSelector } from '../components/checkout/QrisProviderSelector';
import { QrisPaymentModal } from '../components/checkout/QrisPaymentModal';
import { Button } from '../components/common/Button';

export const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  const {
    selectedConcert,
    selectedTickets,
    calculateSubtotal,
    calculateDiscount,
    calculateTotal,
    getTotalTicketCount,
    createBooking
  } = useBooking();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    identityType: 'KTP',
    identityNumber: ''
  });

  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0]);
  const [selectedQrisProvider, setSelectedQrisProvider] = useState(null);
  const [showQrisPayment, setShowQrisPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalTickets = getTotalTicketCount();
  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = calculateTotal();
  const serviceFee = totalTickets * 25000;
  const tax = Math.round((subtotal - discount) * 0.11);

  React.useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  if (!selectedConcert || totalTickets <= 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-ink font-display">Tidak Ada Pesanan Aktif</h2>
        <p className="text-xs text-ink-secondary">Silakan pilih konser dan kategori tiket terlebih dahulu.</p>
        <Link to="/events">
          <Button variant="primary">Jelajah Konser</Button>
        </Link>
      </div>
    );
  }

  const getIdentityPlaceholder = (type) => {
    switch (type) {
      case 'SIM':
        return 'Masukkan nomor SIM';
      case 'Passport':
        return 'Masukkan nomor paspor';
      case 'KTP':
      default:
        return 'Masukkan nomor KTP';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const executeFinalBooking = (paymentMethod) => {
    setIsProcessing(true);

    // Simulate payment gateway processing
    setTimeout(() => {
      const order = createBooking(
        {
          ...formData,
          idCard: formData.identityNumber || ''
        },
        paymentMethod
      );
      setIsProcessing(false);
      setShowQrisPayment(false);
      addToast('Pembayaran berhasil dikonfirmasi!', 'success');
      navigate('/success');
    }, 1600);
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      addToast('Harap lengkapi semua data kontak pembeli tiket.', 'warning');
      return;
    }

    if (selectedConcert?.requiresIdentity) {
      if (!formData.identityType || !formData.identityNumber?.trim()) {
        addToast('Harap lengkapi jenis dan nomor identitas untuk konser ini.', 'warning');
        return;
      }
    }

    // QRIS Flow: require provider selection before opening payment QR
    if (selectedPayment?.id === 'qris_instant') {
      if (!selectedQrisProvider) {
        addToast('Silakan pilih salah satu layanan / aplikasi QRIS terlebih dahulu.', 'warning');
        return;
      }
      setShowQrisPayment(true);
      return;
    }

    // Normal payment methods (VA / Card / Direct)
    executeFinalBooking(selectedPayment);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8 pb-24">
      {/* Back Link and Header */}
      <div className="pb-6 border-b border-border">
        <Link
          to={`/events/${selectedConcert.id}/tickets`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Pemilihan Tiket</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-display">
          Checkout & Pembayaran
        </h1>
        <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
          Lengkapi data pemegang tiket dan pilih metode pembayaran favorit Anda.
        </p>
      </div>

      {/* Countdown Timer */}
      <OrderTimer />

      <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Payment Methods */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Step 1: Customer Data */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-5 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 border-b border-border">
              <div className="w-7 h-7 rounded-lg bg-dark text-white flex items-center justify-center font-bold text-xs font-display">
                1
              </div>
              <h3 className="text-base font-bold text-ink tracking-tight font-display">Data Pemesan / Pemegang Tiket</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
                  <User className="w-3.5 h-3.5 text-coral-500" /> Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Contoh: Budi Pratama"
                  className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
                  <Mail className="w-3.5 h-3.5 text-coral-500" /> Alamat Email *
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="nama@email.com"
                  className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                />
              </div>

              {/* Phone */}
              <div className={`space-y-1.5 ${!selectedConcert.requiresIdentity ? 'sm:col-span-2' : ''}`}>
                <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
                  <Phone className="w-3.5 h-3.5 text-coral-500" /> Nomor Handphone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="081234567890"
                  className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                />
              </div>

              {/* Conditional Identity Verification Fields */}
              {selectedConcert.requiresIdentity && (
                <>
                  {/* Identity Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
                      <IdCard className="w-3.5 h-3.5 text-coral-500" /> Jenis Identitas *
                    </label>
                    <select
                      name="identityType"
                      value={formData.identityType}
                      onChange={handleInputChange}
                      className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 cursor-pointer"
                    >
                      <option value="KTP">KTP</option>
                      <option value="SIM">SIM</option>
                      <option value="Passport">Passport</option>
                    </select>
                  </div>

                  {/* Identity Number */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
                      <IdCard className="w-3.5 h-3.5 text-coral-500" /> Nomor Identitas ({formData.identityType}) *
                    </label>
                    <input
                      type="text"
                      required
                      name="identityNumber"
                      value={formData.identityNumber}
                      onChange={handleInputChange}
                      placeholder={getIdentityPlaceholder(formData.identityType)}
                      className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink font-mono focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                    />
                  </div>

                  {/* Helper Text */}
                  <div className="sm:col-span-2 pt-1 flex items-start gap-2 text-xs text-ink-muted leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-coral-500 shrink-0 mt-0.5" />
                    <span>Konser ini mewajibkan verifikasi identitas resmi sesuai dengan kebijakan ticketing promotor acara.</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-5 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 border-b border-border">
              <div className="w-7 h-7 rounded-lg bg-dark text-white flex items-center justify-center font-bold text-xs font-display">
                2
              </div>
              <h3 className="text-base font-bold text-ink tracking-tight font-display">Pilih Metode Pembayaran</h3>
            </div>

            <PaymentMethodSelector
              selectedMethod={selectedPayment}
              onSelectMethod={(method) => {
                setSelectedPayment(method);
                setShowQrisPayment(false);
              }}
            />

            {/* QRIS Provider Selection (Only when QRIS is active, NO QR displayed yet) */}
            {selectedPayment?.id === 'qris_instant' && (
              <QrisProviderSelector
                selectedProvider={selectedQrisProvider}
                onSelectProvider={setSelectedQrisProvider}
              />
            )}
          </div>

          {/* Promo Code Input */}
          <PromoCodeInput />
        </div>

        {/* Right Column: Invoice Summary Card */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className="bg-surface border border-border rounded-2xl p-6 space-y-6 shadow-sm sticky top-28">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <Ticket className="w-5 h-5 text-coral-500" />
              <h3 className="text-base font-bold text-ink tracking-tight font-display">Detail Tagihan</h3>
            </div>

            {/* Event Info Card */}
            <div className="flex gap-3 items-center p-3 rounded-xl bg-canvas border border-border">
              <img
                src={selectedConcert.posterImage || selectedConcert.bannerImage}
                alt={selectedConcert.title}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-ink truncate font-display">{selectedConcert.title}</h4>
                <p className="text-[11px] text-ink-muted truncate">{selectedConcert.venueName}</p>
                <p className="text-[11px] text-coral-600 font-semibold">{selectedConcert.time}</p>
              </div>
            </div>

            {/* Ticket Items */}
            <div className="space-y-2.5 text-xs">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block font-display">
                Item Tiket ({totalTickets})
              </span>

              {Object.entries(selectedTickets).map(([tierId, qty]) => {
                const tier = selectedConcert.ticketTiers.find((t) => t.id === tierId);
                if (!tier || qty <= 0) return null;

                return (
                  <div key={tierId} className="flex justify-between items-center text-xs text-ink-secondary">
                    <div>
                      <p className="font-bold text-ink font-display">{tier.name.split('—')[0]}</p>
                      <p className="text-[11px] text-ink-muted">{qty} × Rp {tier.price.toLocaleString('id-ID')}</p>
                    </div>
                    <span className="font-bold text-ink font-display">
                      Rp {(tier.price * qty).toLocaleString('id-ID')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price Calculations */}
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

            {/* Complete Payment Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={isProcessing}
              disabled={isProcessing}
              icon={Lock}
            >
              {isProcessing
                ? 'Memproses Transaksi...'
                : selectedPayment?.id === 'qris_instant' && !selectedQrisProvider
                ? 'Pilih Layanan QRIS'
                : `Bayar Rp ${total.toLocaleString('id-ID')}`}
            </Button>

            {selectedPayment?.id === 'qris_instant' && !selectedQrisProvider && (
              <p className="text-[11px] text-coral-600 font-medium text-center">
                Pilih salah satu layanan QRIS di sebelah kiri untuk melanjutkan.
              </p>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Konfirmasi instan & e-ticket terintegrasi</span>
            </div>
          </div>
        </div>
      </form>

      {/* Dedicated QRIS Payment Modal (Appears ONLY AFTER clicking Bayar) */}
      <QrisPaymentModal
        isOpen={showQrisPayment}
        onClose={() => setShowQrisPayment(false)}
        totalAmount={total}
        provider={selectedQrisProvider}
        onConfirmPayment={() =>
          executeFinalBooking({
            ...selectedPayment,
            provider: selectedQrisProvider?.name,
            name: `QRIS • ${selectedQrisProvider?.name}`
          })
        }
        isProcessing={isProcessing}
      />
    </div>
  );
};
