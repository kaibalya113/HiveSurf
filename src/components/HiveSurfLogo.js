import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const HiveSurfLogo = ({ size = 40, animated = true, className = "" }) => {
  const { isDark } = useTheme();
  
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.15,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const waveVariants = {
    animate: {
      y: [0, -8, 0],
      scaleY: [1, 1.2, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const hexagonVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const particleVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(14, 165, 233, 0.3)",
        "0 0 40px rgba(14, 165, 233, 0.6)",
        "0 0 20px rgba(14, 165, 233, 0.3)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Memoize the particles array at the top level
  const particles = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${50 + Math.cos(i * Math.PI / 3) * 60}%`,
      top: `${50 + Math.sin(i * Math.PI / 3) * 60}%`,
      duration: 3 + i * 0.5,
      delay: i * 0.2
    })), []
  );

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      variants={animated ? logoVariants : {}}
      initial="initial"
      animate="animate"
      whileHover={animated ? "hover" : {}}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${isDark ? 'rgba(14, 165, 233, 0.2)' : 'rgba(2, 132, 199, 0.2)'} 0%, transparent 70%)`,
        }}
        variants={animated ? glowVariants : {}}
        animate={animated ? "animate" : {}}
      />

      {/* Main hexagon (hive) */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="absolute inset-0"
        variants={animated ? hexagonVariants : {}}
        animate={animated ? "animate" : {}}
      >
        {/* Outer glow ring */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="hiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#0ea5e9" : "#0284c7"} />
            <stop offset="50%" stopColor={isDark ? "#06b6d4" : "#0891b2"} />
            <stop offset="100%" stopColor={isDark ? "#0891b2" : "#0c4a6e"} />
          </linearGradient>
          
          <linearGradient id="surfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#d946ef" : "#c026d3"} />
            <stop offset="50%" stopColor={isDark ? "#f97316" : "#ea580c"} />
            <stop offset="100%" stopColor={isDark ? "#0ea5e9" : "#0284c7"} />
          </linearGradient>
        </defs>

        {/* Hive structure with enhanced design */}
        <polygon
          points="50,10 80,25 80,65 50,80 20,65 20,25"
          fill="url(#hiveGradient)"
          stroke={isDark ? "#0ea5e9" : "#0284c7"}
          strokeWidth="2"
          filter="url(#glow)"
        />
        
        {/* Inner hexagon pattern */}
        <polygon
          points="50,20 70,30 70,60 50,70 30,60 30,30"
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"}
          strokeWidth="1"
          strokeDasharray="2,2"
        />
        
        {/* Hive cells with particles */}
        <motion.circle 
          cx="35" cy="35" r="3" 
          fill={isDark ? "#0ea5e9" : "#0284c7"} 
          opacity="0.9"
          variants={animated ? particleVariants : {}}
          animate={animated ? "animate" : {}}
        />
        <motion.circle 
          cx="65" cy="35" r="3" 
          fill={isDark ? "#d946ef" : "#c026d3"} 
          opacity="0.9"
          variants={animated ? particleVariants : {}}
          animate={animated ? { ...particleVariants.animate, transition: { ...particleVariants.animate.transition, delay: 0.3 } } : {}}
        />
        <motion.circle 
          cx="50" cy="50" r="3" 
          fill={isDark ? "#f97316" : "#ea580c"} 
          opacity="0.9"
          variants={animated ? particleVariants : {}}
          animate={animated ? { ...particleVariants.animate, transition: { ...particleVariants.animate.transition, delay: 0.6 } } : {}}
        />
        <motion.circle 
          cx="35" cy="65" r="3" 
          fill={isDark ? "#06b6d4" : "#0891b2"} 
          opacity="0.9"
          variants={animated ? particleVariants : {}}
          animate={animated ? { ...particleVariants.animate, transition: { ...particleVariants.animate.transition, delay: 0.9 } } : {}}
        />
        <motion.circle 
          cx="65" cy="65" r="3" 
          fill={isDark ? "#e879f9" : "#a21caf"} 
          opacity="0.9"
          variants={animated ? particleVariants : {}}
          animate={animated ? { ...particleVariants.animate, transition: { ...particleVariants.animate.transition, delay: 1.2 } } : {}}
        />
      </motion.svg>

      {/* Surf wave elements */}
      {animated && (
        <>
          <motion.div
            className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-2 rounded-full opacity-70`}
            style={{
              background: `linear-gradient(90deg, ${isDark ? '#0ea5e9' : '#0284c7'}, ${isDark ? '#d946ef' : '#c026d3'})`
            }}
            variants={waveVariants}
            animate="animate"
          />
          <motion.div
            className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1.5 rounded-full opacity-50`}
            style={{
              background: `linear-gradient(90deg, ${isDark ? '#06b6d4' : '#0891b2'}, ${isDark ? '#f97316' : '#ea580c'})`
            }}
            variants={waveVariants}
            animate="animate"
            transition={{ delay: 0.5 }}
          />
          <motion.div
            className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full opacity-30`}
            style={{
              background: `linear-gradient(90deg, ${isDark ? '#0891b2' : '#0c4a6e'}, ${isDark ? '#e879f9' : '#a21caf'})`
            }}
            variants={waveVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
        </>
      )}

      {/* Central surf element with enhanced animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
        style={{
          background: `radial-gradient(circle, ${isDark ? '#ffffff' : '#f8fafc'}, ${isDark ? 'rgba(255,255,255,0.8)' : 'rgba(248,250,252,0.8)'})`,
          boxShadow: `0 0 10px ${isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.3)'}`
        }}
        animate={animated ? {
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8],
          rotate: [0, 180, 360],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles around the logo */}
      {animated && (
        <>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-primary-400' : 'bg-primary-600'} opacity-60`}
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
                rotate: [0, 360],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default HiveSurfLogo; 