import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

const SESSION_STORAGE_KEY = 'tiketkonser_demo_auth_user';
const REGISTERED_ACCOUNTS_STORAGE_KEY = 'tiketkonser_registered_accounts';

const getRegisteredAccounts = () => {
  try {
    const data = localStorage.getItem(REGISTERED_ACCOUNTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveRegisteredAccounts = (accounts) => {
  try {
    localStorage.setItem(REGISTERED_ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    // Ignore storage error
  }
};

export const AuthProvider = ({ children }) => {
  // Always start unauthenticated for a new browser session unless logged in within this tab session
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    try {
      if (user) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      } else {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }, [user]);

  const login = (email, password) => {
    if (!email || !password) {
      addToast('Harap masukkan email dan password.', 'warning');
      return { success: false, error: 'Email dan password wajib diisi' };
    }

    const cleanEmail = email.toLowerCase().trim();
    const allAccounts = getRegisteredAccounts();
    const existing = allAccounts.find(a => a.email.toLowerCase() === cleanEmail);

    if (!existing) {
      addToast('Email belum terdaftar. Silakan daftar terlebih dahulu.', 'error');
      return { success: false, error: 'Email belum terdaftar' };
    }

    // Check password
    if (existing.password !== password) {
      addToast('Password yang Anda masukkan salah.', 'error');
      return { success: false, error: 'Password salah' };
    }

    const sessionUser = {
      name: existing.name,
      email: existing.email,
      role: existing.role || 'Member',
      avatar: existing.avatar || existing.name[0].toUpperCase()
    };

    setUser(sessionUser);
    addToast(`Selamat datang kembali, ${sessionUser.name}!`, 'success');
    return { success: true, user: sessionUser };
  };

  const register = (name, email, password, confirmPassword) => {
    if (!name || !email || !password) {
      addToast('Harap lengkapi semua kolom pendaftaran.', 'warning');
      return { success: false, error: 'Kolom tidak lengkap' };
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      addToast('Format email tidak valid.', 'warning');
      return { success: false, error: 'Email tidak valid' };
    }

    // Password length validation
    if (password.length < 6) {
      addToast('Password minimal 6 karakter.', 'warning');
      return { success: false, error: 'Password terlalu pendek' };
    }

    // Password confirmation match
    if (confirmPassword !== undefined && password !== confirmPassword) {
      addToast('Konfirmasi password tidak sesuai.', 'warning');
      return { success: false, error: 'Konfirmasi password tidak cocok' };
    }

    // Check duplicate email
    const allAccounts = getRegisteredAccounts();
    if (allAccounts.some(a => a.email.toLowerCase() === cleanEmail)) {
      addToast('Akun dengan email tersebut sudah terdaftar.', 'error');
      return { success: false, error: 'Email sudah terdaftar' };
    }

    const newUser = {
      name: cleanName,
      email: cleanEmail,
      password,
      role: 'Member',
      avatar: cleanName[0].toUpperCase()
    };

    // Save to persistent localStorage accounts database
    const currentRegistered = getRegisteredAccounts();
    saveRegisteredAccounts([...currentRegistered, newUser]);

    // Create active session
    const sessionUser = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    };

    setUser(sessionUser);
    addToast(`Akun berhasil dibuat. Selamat datang, ${cleanName}!`, 'success');
    return { success: true, user: sessionUser };
  };

  const logout = () => {
    setUser(null);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore
    }
    addToast('Anda telah keluar dari akun.', 'info');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: Boolean(user)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

