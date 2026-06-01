import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import PortfolioPage from './pages/PortfolioPage';
import TestimonialsPage from './pages/TestimonialsPage';
import WhatsAppButton from './components/ui/WhatsAppButton';
import SmoothScroll from './components/ui/SmoothScroll';
import ButterflyAnimation from './components/butterfly';

// 🚀 PERF: Lazy-load the 76KB admin page — regular visitors never download it
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

// Butterfly is only shown on public pages, not the admin panel
const PublicLayout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && <ButterflyAnimation butterflyCount={6} />}
      {!isAdmin && <WhatsAppButton />}
      {children}
    </>
  );
};

// Luxury page transitions config
const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1], // Luxury easeOutExpo
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><PortfolioPage /></PageTransition>} />
        <Route path="/testimonials" element={<PageTransition><TestimonialsPage /></PageTransition>} />
        <Route path="/collections/:slug" element={<PageTransition><CollectionPage /></PageTransition>} />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
                    <p className="text-[#4A2E2A] font-serif">Loading admin panel…</p>
                  </div>
                </div>
              }>
                <AdminPage />
              </Suspense>
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <PublicLayout>
          <AnimatedRoutes />
        </PublicLayout>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
