import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { BookingProvider } from './context/BookingContext';
import { ToastContainer } from './components/common/ToastContainer';
import { Navbar } from './components/layout/Navbar';
import { MobileNavbar } from './components/layout/MobileNavbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { EventDetail } from './pages/EventDetail';
import { TicketSelection } from './pages/TicketSelection';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { MyTickets } from './pages/MyTickets';
import { Favorites } from './pages/Favorites';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

// Helper component to scroll window to top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

export function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ToastProvider>
      <AuthProvider>
        <FavoritesProvider>
          <BookingProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-canvas text-ink">
                {/*  */}
                <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

                {/*  */}
                <MobileNavbar
                  isOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                />

                {/*  */}
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Explore />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/events/:id/tickets" element={<TicketSelection />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<OrderSuccess />} />
                    <Route path="/my-tickets" element={<MyTickets />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>

                {/*  */}
                <Footer />

                {/*  */}
                <ToastContainer />
              </div>
            </BrowserRouter>
          </BookingProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
