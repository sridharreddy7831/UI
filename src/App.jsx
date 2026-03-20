import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CollectionPage from './pages/CollectionPage';
import PortfolioPage from './pages/PortfolioPage';
import TestimonialsPage from './pages/TestimonialsPage';
import WhatsAppButton from './components/ui/WhatsAppButton';

import SmoothScroll from './components/ui/SmoothScroll';
import ButterflyAnimation from './components/butterfly';

function App() {
  return (
    <SmoothScroll>
      <ButterflyAnimation butterflyCount={6} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/collections/:slug" element={<CollectionPage />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </SmoothScroll>
  );
}

export default App;

