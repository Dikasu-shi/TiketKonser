# 🎟️ TiketKonser — Frontend Portfolio Edition

A commercial-grade, modern concert & music festival ticketing single-page web application built with **React, Vite, Tailwind CSS, React Router v6, Framer Motion, and Lucide Icons**.

> **Note**: This is a standalone, frontend-only demonstration project built for portfolio review. It is completely decoupled from any backend/PHP/Laravel server, utilizes realistic local mock datasets, and manages demo state via `localStorage`.

---

## 🚀 Quick Start (Running Locally)

To run the application locally on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open your browser at **`http://localhost:3000`** (or the port indicated in your terminal).

---

## ✨ Key Features & Architecture

1. **Discovery & Explore**:
   - Multi-facet live filtering (Category/Genre, City/Venue, Date Presets, Max Price Range).
   - Instant search across artists, tours, and stadiums.
   - Responsive mobile slide-over filter drawer.
   - Sorting by Price, Popularity, and Date.

2. **Event Details & Interactive Seating Map**:
   - Cinematic event backdrop banner with meta information.
   - Tabbed content: Event Description, Lineup Schedule, Venue Directions, and Entry Terms.
   - Dual Ticket Selection Modes:
     - **Mode 1**: Stepper quantity selector with real-time stock quota tracking.
     - **Mode 2**: Visual Interactive SVG Stadium Map with hover tooltips and direct seat block picking.

3. **Smart Cart & Checkout Simulation**:
   - 10-Minute Ticket Reservation Lock Countdown Timer.
   - Form validation for ticket holder/attendee details.
   - Payment method simulator: Virtual Account (BCA/Mandiri), QRIS Instant Pay, Credit Card (3D Secure), and E-Wallets.
   - Promo Code / Voucher Validator with automatic discount deduction (`TIKETPROMO`, `COLDPLAY10`, `MUSIC2026`).

4. **Digital Pass & Order Confirmation**:
   - Animated celebratory checkout with dynamic SVG QR Code.
   - Perforated concert ticket stub design.
   - 1-Click Print & PDF download simulation.

5. **My Tickets & Favorites (Wishlist)**:
   - Filter tickets by *Akan Datang (Upcoming)* and *Riwayat Selesai (Past)*.
   - QR Code Pass popup modal for gate check-in.
   - Saved concert wishlist synced with `localStorage`.

6. **Demo Authentication**:
   - 1-Click quick login buttons for portfolio reviewers (`Alexander Wijaya` & `Sarah Pratama`).

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer-motion.com/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **State Management**: React Context API (`AuthContext`, `FavoritesContext`, `BookingContext`, `ToastContext`)
