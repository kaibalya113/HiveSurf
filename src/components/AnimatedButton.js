import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon,
  ...props 
}) => {
  const { isDark } = useTheme();

  const variants = {
    primary: {
      className: `bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/25`,
      hover: { scale: 1.05, y: -2 },
      tap: { scale: 0.95 }
    },
    secondary: {
      className: isDark 
        ? `glass-effect text-white hover:bg-white/20 border border-white/20`
        : `glass-effect text-slate-800 hover:bg-slate-100/80 border border-slate-300/50 shadow-lg`,
      hover: { scale: 1.05, y: -2 },
      tap: { scale: 0.95 }
    },
    outline: {
      className: `border-2 border-primary-500 ${isDark ? 'text-primary-400' : 'text-primary-600'} hover:bg-primary-500 hover:text-white`,
      hover: { scale: 1.05, y: -2 },
      tap: { scale: 0.95 }
    }
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const selectedVariant = variants[variant];
  const selectedSize = sizes[size];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : selectedVariant.hover}
      whileTap={disabled ? {} : selectedVariant.tap}
      className={`
        ${selectedVariant.className}
        ${selectedSize}
        rounded-lg font-semibold transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center space-x-2
        relative overflow-hidden
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
      <span>{children}</span>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default AnimatedButton; 