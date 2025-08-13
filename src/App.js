import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary-500 px-4 py-2 rounded-lg hover:bg-primary-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Custom hook to handle clean URLs
function useCleanURLs() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Function to update browser URL to appear clean
    const updateBrowserURL = () => {
      const path = location.pathname;
      if (path && path !== '/') {
        // Create a clean URL without the hash
        const cleanURL = `https://kaibalya113.github.io/HiveSurf${path}`;
        
        // Update the browser's address bar to show clean URL
        window.history.replaceState(null, '', cleanURL);
        
        // Update page title
        const pageTitles = {
          '/home': 'HiveSurf - Home',
          '/about': 'HiveSurf - About',
          '/services': 'HiveSurf - Services',
          '/contact': 'HiveSurf - Contact'
        };
        
        if (pageTitles[path]) {
          document.title = pageTitles[path];
        }
      }
    };

    // Update URL after routing is complete
    const timer = setTimeout(updateBrowserURL, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Custom navigation function
  const navigateTo = (path) => {
    navigate(path);
    
    // Immediately update the browser URL
    const cleanURL = `https://kaibalya113.github.io/HiveSurf${path}`;
    window.history.replaceState(null, '', cleanURL);
  };

  return { navigateTo, currentPath: location.pathname };
}

function AnimatedRoutes() {
  const location = useLocation();
  const { navigateTo } = useCleanURLs();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    console.log('App: Initializing...');
    
    // Ensure the app is fully loaded before showing content
    const handleAppReady = () => {
      console.log('App: Document ready, setting app ready');
      setIsAppReady(true);
    };

    // Listen for when the app is ready
    if (document.readyState === 'complete') {
      console.log('App: Document already complete');
      handleAppReady();
    } else {
      console.log('App: Waiting for document to load...');
      window.addEventListener('load', handleAppReady);
      return () => window.removeEventListener('load', handleAppReady);
    }
  }, []);

  useEffect(() => {
    if (isAppReady) {
      console.log('App: Starting loading timer...');
      // Show loading screen for a minimum time to ensure smooth experience
      const timer = setTimeout(() => {
        console.log('App: Loading complete, showing app');
        setIsLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isAppReady]);

  // Global effect to continuously update URL bar to appear clean
  useEffect(() => {
    if (!isLoading && isAppReady) {
      const updateURLBar = () => {
        // Get the current hash
        const hash = window.location.hash;
        if (hash && hash !== '#/') {
          // Extract the path from hash
          const path = hash.replace('#', '');
          if (path && path !== '/') {
            // Create clean URL
            const cleanURL = `https://kaibalya113.github.io/HiveSurf${path}`;
            // Update browser URL without hash
            window.history.replaceState(null, '', cleanURL);
          }
        }
      };

      // Update immediately
      updateURLBar();

      // Set up interval to continuously update
      const interval = setInterval(updateURLBar, 100);

      // Also listen for hash changes
      const handleHashChange = () => {
        setTimeout(updateURLBar, 50);
      };

      window.addEventListener('hashchange', handleHashChange);

      return () => {
        clearInterval(interval);
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, [isLoading, isAppReady]);

  console.log('App: Render state - isLoading:', isLoading, 'isAppReady:', isAppReady);

  if (isLoading || !isAppReady) {
    console.log('App: Showing loading screen');
    return <LoadingScreen />;
  }

  console.log('App: Showing main app');
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="App min-h-screen relative">
            {/* Content */}
            <div className="relative z-10">
              <Navbar />
              <Suspense fallback={<LoadingScreen />}>
                <AnimatedRoutes />
              </Suspense>
              <Footer />
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 