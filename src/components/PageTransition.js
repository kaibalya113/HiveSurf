import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const PageTransition = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={`relative z-10 ${isDark ? 'text-white' : 'text-slate-900'}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 