import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import PWARegistration from './components/PWARegistration';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen relative">
          {/* Global Animated Background */}
          <div className="fixed inset-0 z-0">
            <AnimatedBackground />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </AnimatePresence>
            <Footer />
            <PWARegistration />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 