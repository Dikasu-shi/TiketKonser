import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Ticket, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) return;
    const res = register(name, email, password, confirmPassword);
    if (res?.success) {
      const redirectTarget = location.state?.from || '/events';
      navigate(redirectTarget, { replace: true });
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-coral-500 flex items-center justify-center text-white mx-auto shadow-sm mb-4">
          <Ticket className="w-6 h-6 -rotate-12" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight font-display">
          Daftar Akun TiketKonser
        </h1>
        <p className="text-xs sm:text-sm text-ink-secondary">
          Nikmati kemudahan pesan tiket konser dan simpan e-ticket dalam satu akun.
        </p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-sm space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
            <User className="w-3.5 h-3.5 text-coral-500" /> Nama Lengkap
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Lengkap Anda"
            className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
            <Mail className="w-3.5 h-3.5 text-coral-500" /> Alamat Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
            <Lock className="w-3.5 h-3.5 text-coral-500" /> Buat Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 6 karakter"
            className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
            <Lock className="w-3.5 h-3.5 text-coral-500" /> Konfirmasi Password
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ulangi password"
            className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
          />
        </div>

        <Button type="submit" variant="primary" fullWidth size="lg" icon={ArrowRight} iconPosition="right">
          Buat Akun Saya
        </Button>

        <div className="text-center text-xs text-ink-secondary pt-2">
          Sudah memiliki akun?{' '}
          <Link to="/login" state={location.state} className="text-coral-600 font-bold hover:underline">
            Masuk di Sini
          </Link>
        </div>
      </form>
    </div>
  );
};
