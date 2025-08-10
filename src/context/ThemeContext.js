import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Initialize state from localStorage during component creation
    const savedTheme = localStorage.getItem('hivesurf-theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsDark(prev => !prev);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  }, []);

  // Save theme preference only when it changes
  useEffect(() => {
    localStorage.setItem('hivesurf-theme', isDark ? 'dark' : 'light');
    
    // Update document body classes
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  const theme = useMemo(() => ({
    isDark,
    isTransitioning,
    toggleTheme,
    colors: isDark ? {
      primary: '#0ea5e9',
      secondary: '#d946ef',
      accent: '#f97316',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f8fafc',
      textSecondary: '#cbd5e1',
      border: 'rgba(255, 255, 255, 0.1)',
      glass: 'rgba(255, 255, 255, 0.1)',
    } : {
      primary: '#0284c7',
      secondary: '#c026d3',
      accent: '#ea580c',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#475569',
      border: 'rgba(0, 0, 0, 0.1)',
      glass: 'rgba(255, 255, 255, 0.8)',
    }
  }), [isDark, isTransitioning, toggleTheme]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`theme-transition ${isTransitioning ? 'transitioning' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}; 