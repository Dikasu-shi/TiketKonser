import React from 'react';
import { CreditCard, QrCode, Building2, Smartphone, Check } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'bca_va',
    name: 'BCA Virtual Account',
    category: 'va',
    icon: Building2,
    fee: 'Gratis',
    desc: 'Otomatis terverifikasi dalam 1 menit',
    badge: 'Paling Populer'
  },
  {
    id: 'mandiri_va',
    name: 'Mandiri Virtual Account',
    category: 'va',
    icon: Building2,
    fee: 'Gratis',
    desc: 'Bayar via Livin by Mandiri atau ATM'
  },
  {
    id: 'qris_instant',
    name: 'QRIS Instant Pay',
    category: 'qris',
    icon: QrCode,
    fee: 'Gratis',
    desc: 'Scan dari GoPay, OVO, Dana, BCA Mobile & Semua M-Banking',
    badge: 'Instan'
  },
  {
    id: 'credit_card',
    name: 'Kartu Kredit / Debit Online',
    category: 'card',
    icon: CreditCard,
    fee: 'Biaya admin Rp 5.000',
    desc: 'Visa, Mastercard, JCB (3D Secure Terlindungi)'
  },
  {
    id: 'gopay_ewallet',
    name: 'GoPay / GoPay Later',
    category: 'ewallet',
    icon: Smartphone,
    fee: 'Gratis',
    desc: 'Hubungkan akun GoPay untuk checkout 1-klik'
  }
];

export const PaymentMethodSelector = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="space-y-3">
      {PAYMENT_METHODS.map((method) => {
        const Icon = method.icon;
        const isSelected = selectedMethod?.id === method.id;

        return (
          <div
            key={method.id}
            onClick={() => onSelectMethod(method)}
            className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 ${
              isSelected
                ? 'bg-surface border-coral-500 shadow-sm ring-1 ring-coral-500'
                : 'bg-surface border-border hover:border-ink/30 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-coral-500 text-white'
                    : 'bg-canvas text-ink-secondary border border-border'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-ink font-display">{method.name}</h4>
                  {method.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-coral-500/10 text-coral-600 text-[10px] font-bold border border-coral-500/20">
                      {method.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-muted mt-0.5">{method.desc}</p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                isSelected
                  ? 'border-coral-500 bg-coral-500 text-white'
                  : 'border-border bg-canvas'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>
        );
      })}
    </div>
  );
};
