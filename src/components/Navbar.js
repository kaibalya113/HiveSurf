import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import HiveSurfLogo from './HiveSurfLogo';
import StartNowModal from './StartNowModal';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link to="/home" className="flex items-center space-x-3">
              <HiveSurfLogo size={40} />
              <span className="text-2xl font-bold gradient-text font-display">
                HiveSurf
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary-400'
                      : isDark ? 'text-slate-300 hover:text-primary-400' : 'text-slate-600 hover:text-primary-400'
                  }`}
                >
                  {item.name}
                </Link>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            <motion.a
              href="tel:+917008310868"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <Phone size={16} />
              <span className="text-sm font-medium">+91 7008310868</span>
            </motion.a>
            
            <motion.button
              onClick={() => setShowStartModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass-effect"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 glass-effect rounded-lg overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-sm font-medium transition-colors duration-200 ${
                        location.pathname === item.path
                          ? 'text-primary-400'
                          : isDark ? 'text-slate-300 hover:text-primary-400' : 'text-slate-600 hover:text-primary-400'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex justify-center mb-4">
                    <ThemeToggle />
                  </div>
                  
                  <motion.a
                    href="tel:+917008310868"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-primary-400 mb-4"
                  >
                    <Phone size={16} />
                    <span className="text-sm font-medium">+91 7008310868</span>
                  </motion.a>
                  
                  <motion.button
                    onClick={() => {
                      setShowStartModal(true);
                      setIsOpen(false);
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium"
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Start Now Modal */}
      <StartNowModal 
        isOpen={showStartModal} 
        onClose={() => setShowStartModal(false)} 
      />
    </motion.nav>
  );
};

export default Navbar; 