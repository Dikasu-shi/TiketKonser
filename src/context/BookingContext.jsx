import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMOS } from '../data/promos';
import { useToast } from './ToastContext';

const BookingContext = createContext(null);
const isLegacyDummyOrder = (order) => {
  if (!order) return true;
  const name = (order.attendee?.fullName || order.customerName || '').toLowerCase();
  const orderId = order.orderId || '';
  if (name.includes('abdul') || orderId === 'TK-2026-40552' || orderId === 'TK-2026-31329' || orderId === 'TK-2026-17989') {
    return true;
  }
  return false;
};

export const BookingProvider = ({ children }) => {
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState({}); // { [tierId]: qty }
  const [selectedSeats, setSelectedSeats] = useState([]); // array of seat objects
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes lock session
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const [bookingsHistory, setBookingsHistory] = useState(() => {
    try {
      // Clear legacy storage keys if present
      localStorage.removeItem('tiketkonser_demo_orders_history');
      localStorage.removeItem('tiketkonser_orders_history');

      const saved = sessionStorage.getItem(STORAGE_BOOKINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validOrders = parsed.filter(o => !isLegacyDummyOrder(o));
          if (validOrders.length !== parsed.length) {
            sessionStorage.setItem(STORAGE_BOOKINGS, JSON.stringify(validOrders));
          }
          return validOrders;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const { addToast } = useToast();

  // Save bookings history to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_BOOKINGS, JSON.stringify(bookingsHistory));
    } catch (e) {
      console.error('Failed to save bookings history', e);
    }
  }, [bookingsHistory]);

  // Reservation countdown timer
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerActive) {
      setIsTimerActive(false);
      addToast('Waktu pemesanan habis. Kuota tiket telah dilepas.', 'warning');
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerSeconds, addToast]);

  const setConcertForBooking = (concert) => {
    setSelectedConcert(concert);
    setSelectedTickets({});
    setSelectedSeats([]);
    setAppliedPromo(null);
    setTimerSeconds(600);
    setIsTimerActive(true);
  };

  const updateTicketQty = (tierId, qty) => {
    setSelectedTickets(prev => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[tierId];
      } else {
        next[tierId] = qty;
      }
      return next;
    });
  };

  const toggleSeatSelection = (seat, tier) => {
    setSelectedSeats(prev => {
      const exists = prev.some(s => s.id === seat.id);
      if (exists) {
        // remove seat
        const updated = prev.filter(s => s.id !== seat.id);
        // update ticket qty
        updateTicketQty(tier.id, (selectedTickets[tier.id] || 1) - 1);
        return updated;
      } else {
        // max 6 total tickets
        const currentTotal = Object.values(selectedTickets).reduce((a, b) => a + b, 0);
        if (currentTotal >= 6) {
          addToast('Maksimal pembelian 6 tiket per transaksi.', 'warning');
          return prev;
        }
        // add seat
        updateTicketQty(tier.id, (selectedTickets[tier.id] || 0) + 1);
        return [...prev, { ...seat, tierId: tier.id, tierName: tier.name, price: tier.price }];
      }
    });
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const promo = PROMOS.find(p => p.code === cleanCode);

    if (!promo) {
      addToast('Kode promo tidak valid atau telah kadaluarsa.', 'error');
      return false;
    }

    const currentSubtotal = calculateSubtotal();
    if (promo.minPurchase && currentSubtotal < promo.minPurchase) {
      addToast(`Minimal pembelian untuk promo ini adalah Rp ${promo.minPurchase.toLocaleString('id-ID')}`, 'warning');
      return false;
    }

    setAppliedPromo(promo);
    addToast(`Voucher ${promo.code} berhasil diterapkan!`, 'success');
    return true;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast('Kode promo dibatalkan.', 'info');
  };

  const calculateSubtotal = () => {
    if (!selectedConcert) return 0;
    return Object.entries(selectedTickets).reduce((total, [tierId, qty]) => {
      const tier = selectedConcert.ticketTiers.find(t => t.id === tierId);
      return total + (tier ? tier.price * qty : 0);
    }, 0);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    const subtotal = calculateSubtotal();
    if (appliedPromo.discountPercent) {
      const calc = (subtotal * appliedPromo.discountPercent) / 100;
      return appliedPromo.maxDiscount ? Math.min(calc, appliedPromo.maxDiscount) : calc;
    }
    if (appliedPromo.discountFixed) {
      return Math.min(appliedPromo.discountFixed, subtotal);
    }
    return 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0) return 0;
    const discount = calculateDiscount();
    const serviceFee = 25000 * getTotalTicketCount();
    const tax = Math.round((subtotal - discount) * 0.11); // 11% Tax
    return Math.max(0, subtotal - discount + serviceFee + tax);
  };

  const getTotalTicketCount = () => {
    return Object.values(selectedTickets).reduce((a, b) => a + b, 0);
  };

  const createBooking = (attendeeData, paymentMethod) => {
    if (!selectedConcert) return null;

    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const serviceFee = 25000 * getTotalTicketCount();
    const tax = Math.round((subtotal - discount) * 0.11);
    const totalAmount = calculateTotal();

    const orderId = `TK-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const ticketsList = Object.entries(selectedTickets).map(([tierId, qty]) => {
      const tier = selectedConcert.ticketTiers.find(t => t.id === tierId);
      return {
        tierId,
        tierName: tier ? tier.name : tierId,
        price: tier ? tier.price : 0,
        quantity: qty,
        subtotal: tier ? tier.price * qty : 0,
        seatType: tier ? tier.seatType : 'Standard'
      };
    });

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      concertId: selectedConcert.id,
      concertTitle: selectedConcert.title,
      artist: selectedConcert.artist,
      date: selectedConcert.date,
      time: selectedConcert.time,
      venue: selectedConcert.venueName,
      city: selectedConcert.city,
      posterImage: selectedConcert.posterImage,
      tickets: ticketsList,
      seats: selectedSeats,
      attendee: attendeeData,
      customerName: attendeeData?.fullName || attendeeData?.name || '',
      paymentMethod,
      subtotal,
      discount,
      serviceFee,
      tax,
      totalAmount,
      status: 'CONFIRMED',
      qrCodeString: `TK-VERIFIED-${selectedConcert.id.toUpperCase()}-${orderId}`
    };

    setBookingsHistory(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setIsTimerActive(false);

    return newOrder;
  };

  const clearCurrentBooking = () => {
    setSelectedConcert(null);
    setSelectedTickets({});
    setSelectedSeats([]);
    setAppliedPromo(null);
    setIsTimerActive(false);
  };

  return (
    <BookingContext.Provider value={{
      selectedConcert,
      selectedTickets,
      selectedSeats,
      appliedPromo,
      timerSeconds,
      isTimerActive,
      lastOrder,
      bookingsHistory,
      setConcertForBooking,
      updateTicketQty,
      toggleSeatSelection,
      applyPromoCode,
      removePromoCode,
      calculateSubtotal,
      calculateDiscount,
      calculateTotal,
      getTotalTicketCount,
      createBooking,
      clearCurrentBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
