import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Discover from './pages/Discover.jsx';
import YourCards from './pages/YourCards.jsx';
import CardDetail from './pages/CardDetail.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/your-cards" element={<YourCards />} />
          <Route path="/card/:cardName" element={<CardDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
