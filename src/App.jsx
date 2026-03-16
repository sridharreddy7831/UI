import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CollectionPage from './pages/CollectionPage';
import WhatsAppButton from './components/ui/WhatsAppButton';

import SmoothScroll from './components/ui/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/collections/:slug" element={<CollectionPage />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </SmoothScroll>
  );
}

export default App;
