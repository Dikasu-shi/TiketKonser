import React from 'react';
import { Smartphone, Check, Sparkles } from 'lucide-react';

export const QRIS_PROVIDERS = [
  { id: 'gopay', name: 'GoPay', type: 'E-Wallet' },
  { id: 'ovo', name: 'OVO', type: 'E-Wallet' },
  { id: 'dana', name: 'DANA', type: 'E-Wallet' },
  { id: 'shopeepay', name: 'ShopeePay', type: 'E-Wallet' },
  { id: 'bca_mobile', name: 'BCA Mobile', type: 'M-Banking' },
  { id: 'livin_mandiri', name: "Livin' by Mandiri", type: 'M-Banking' },
  { id: 'brimo', name: 'BRImo', type: 'M-Banking' }
];

export const QrisProviderSelector = ({ selectedProvider, onSelectProvider }) => {
  return (
    <div className="p-5 rounded-2xl bg-canvas border border-border space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-ink font-display">
            Pilihan Aplikasi / Layanan QRIS
          </h4>
          <p className="text-[11px] text-ink-muted mt-0.5">
            Pilih aplikasi e-wallet atau m-banking yang akan Anda gunakan untuk scan QR.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {QRIS_PROVIDERS.map((provider) => {
          const isSelected = selectedProvider?.id === provider.id;

          return (
            <button
              type="button"
              key={provider.id}
              onClick={() => onSelectProvider(provider)}
              className={`p-3 rounded-xl border text-left transition-all duration-150 flex items-center justify-between gap-2 ${
                isSelected
                  ? 'bg-surface border-coral-500 shadow-xs ring-1 ring-coral-500'
                  : 'bg-surface border-border hover:border-ink/30'
              }`}
            >
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate font-display ${
                  isSelected ? 'text-coral-600' : 'text-ink'
                }`}>
                  {provider.name}
                </p>
                <span className="text-[10px] text-ink-muted block truncate">
                  {provider.type}
                </span>
              </div>

              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'border-coral-500 bg-coral-500 text-white'
                    : 'border-border bg-canvas'
                }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-ink-muted leading-relaxed">
        QR Code pembayaran akan ditampilkan setelah Anda menekan tombol <strong className="text-ink">Bayar</strong>.
      </p>
    </div>
  );
};
