import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const res = login(email, password);
    if (res?.success) {
      navigate(-1); // Back to previous page
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
          Masuk ke TiketKonser
        </h1>
        <p className="text-xs sm:text-sm text-ink-secondary">
          Akses riwayat e-ticket dan kelola pesanan konser Anda.
        </p>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-sm space-y-5">
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
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-ink flex items-center gap-1.5 font-display">
              <Lock className="w-3.5 h-3.5 text-coral-500" /> Password
            </label>
            <a href="#forgot" className="text-xs text-coral-600 hover:underline">Lupa password?</a>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-canvas border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
          />
        </div>

        <Button type="submit" variant="primary" fullWidth size="lg" icon={ArrowRight} iconPosition="right">
          Masuk Sekarang
        </Button>

        <div className="text-center text-xs text-ink-secondary pt-2">
          Belum punya akun?{' '}
          <Link to="/register" className="text-coral-600 font-bold hover:underline">
            Daftar Gratis
          </Link>
        </div>
      </form>
    </div>
  );
};
