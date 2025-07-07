import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Discover from './pages/Discover.jsx';
import YourCards from './pages/YourCards.jsx';
import CardDetail from './pages/CardDetail.jsx';
import Search from './pages/Search.jsx';
import './utils/App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Global gradient background for all pages */}
      <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-b from-[#181c2e] via-[#2a1a3a] to-black -z-10" aria-hidden="true" />
      <Router>
        <div className="App">
          <Navbar scrolled={scrolled} />
          <div className="page-container">
            <Routes>
              {/* Search is now the landing page */}
              <Route path="/" element={<Search />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/your-cards" element={<YourCards />} />
              <Route path="/card/:cardName" element={<CardDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
