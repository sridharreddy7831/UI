import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

function App() {
  return (
    <SmoothScroll>
      <BrowserRouter>
        <PublicLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/collections/:slug" element={<CollectionPage />} />
            <Route
              path="/admin"
              element={
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
              }
            />
          </Routes>
        </PublicLayout>
      </BrowserRouter>
    </SmoothScroll>
  );
}

export default App;
