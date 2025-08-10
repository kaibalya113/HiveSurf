import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Logo-inspired Background Elements Component
function LogoElements() {
  const { isDark } = useTheme();
  
  // Semi-circular arcs (sound waves) in upper left
  const soundWaves = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      size: 40 + i * 15,
      delay: i * 0.3,
      opacity: 0.3 - i * 0.05
    })), []
  );
  
  // Orbital elements
  const orbitalElements = useMemo(() => [
    {
      id: 'main-orbit',
      size: 200,
      position: { left: '50%', top: '30%' },
      color: isDark ? 'rgba(147, 51, 234, 0.3)' : 'rgba(147, 51, 234, 0.2)',
      dashArray: '5,5'
    },
    {
      id: 'secondary-orbit',
      size: 120,
      position: { left: '60%', top: '25%' },
      color: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)',
      dashArray: '3,3'
    }
  ], [isDark]);
  
  // Strategic dots
  const strategicDots = useMemo(() => [
    { id: 'center-dot', left: '50%', top: '30%', color: isDark ? '#0ea5e9' : '#0284c7', size: 4 },
    { id: 'purple-dot', left: '55%', top: '25%', color: isDark ? '#a855f7' : '#9333ea', size: 3 },
    { id: 'orange-dot', left: '75%', top: '20%', color: isDark ? '#f97316' : '#ea580c', size: 3 },
    { id: 'bottom-dot', left: '50%', top: '85%', color: isDark ? '#0ea5e9' : '#0284c7', size: 2 }
  ], [isDark]);
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Semi-circular arcs (sound waves) in upper left */}
      <div className="absolute top-20 left-20">
        {soundWaves.map((wave) => (
          <motion.div
            key={`wave-${wave.id}`}
            className="absolute"
            style={{
              width: wave.size,
              height: wave.size,
              border: `2px solid ${isDark ? 'rgba(156, 163, 175, 0.4)' : 'rgba(107, 114, 128, 0.3)'}`,
              borderTop: 'none',
              borderLeft: 'none',
              borderRadius: '0 0 100% 0',
              opacity: wave.opacity
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [wave.opacity, wave.opacity * 1.5, wave.opacity],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: wave.delay
            }}
          />
        ))}
      </div>
      
      {/* Orbital circles */}
      {orbitalElements.map((orbit) => (
        <motion.div
          key={orbit.id}
          className="absolute rounded-full border-2"
          style={{
            width: orbit.size,
            height: orbit.size,
            left: orbit.position.left,
            top: orbit.position.top,
            transform: 'translate(-50%, -50%)',
            borderColor: orbit.color,
            borderStyle: 'dashed'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Strategic dots */}
      {strategicDots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Curved trajectory line */}
      <motion.div
        className="absolute"
        style={{
          left: '75%',
          top: '20%',
          width: '100px',
          height: '100px',
          border: `2px solid ${isDark ? 'rgba(239, 68, 68, 0.4)' : 'rgba(220, 38, 38, 0.3)'}`,
          borderTop: 'none',
          borderRight: 'none',
          borderRadius: '0 0 0 100%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

// Digital Signature Component
function DigitalSignature() {
  const { isDark } = useTheme();
  
  // Memoize the particles array to prevent re-creation on every render
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5
    })), []
  );
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating digital particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 rounded-full ${
            isDark ? 'bg-cyan-400/30' : 'bg-blue-500/30'
          }`}
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
      
      {/* Digital signature text */}
      <motion.div
        className="absolute bottom-20 right-10 text-xs font-mono opacity-20"
        style={{ color: isDark ? '#0ea5e9' : '#0284c7' }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div>HIVE_SURF_2024</div>
        <div>DIGITAL_SIGNATURE</div>
        <div>VERIFIED</div>
      </motion.div>
      
      {/* Corner digital elements */}
      <div className="absolute top-10 left-10 w-16 h-16 pointer-events-none">
        <motion.div
          className={`w-full h-full border ${
            isDark ? 'border-cyan-400/20' : 'border-blue-500/20'
          }`}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="absolute top-20 right-20 w-12 h-12 pointer-events-none">
        <motion.div
          className={`w-full h-full border rounded-full ${
            isDark ? 'border-purple-400/20' : 'border-purple-500/20'
          }`}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}

const AnimatedBackground = () => {
  const { isDark } = useTheme();
  
  // Memoize the arrays at the top level
  const lines = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      top: `${20 + i * 15}%`,
      duration: 12 + i * 2,
      delay: i * 1.5
    })), []
  );

  const shapes = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${15 + i * 10}%`,
      top: `${25 + Math.sin(i) * 30}%`,
      duration: 10 + i * 0.8,
      delay: i * 0.5
    })), []
  );
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: isDark 
            ? 'radial-gradient(circle at 30% 70%, rgba(14, 165, 233, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(217, 70, 239, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)'
            : 'radial-gradient(circle at 30% 70%, rgba(2, 132, 199, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(192, 38, 211, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)'
        }}
      />
      
      {/* Logo-inspired Elements */}
      <LogoElements />
      
      {/* Digital Signature */}
      <DigitalSignature />
      
      {/* Moving digital lines */}
      <div className="absolute inset-0">
        {lines.map((line) => (
          <motion.div
            key={`line-${line.id}`}
            className={`absolute h-px w-full ${
              isDark ? 'bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent' 
                     : 'bg-gradient-to-r from-transparent via-blue-500/20 to-transparent'
            }`}
            style={{
              top: line.top,
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              ease: "linear",
              delay: line.delay
            }}
          />
        ))}
      </div>
      
      {/* Floating geometric shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={`shape-${shape.id}`}
          className={`absolute w-2 h-2 ${
            isDark ? 'bg-gradient-to-r from-cyan-400 to-purple-400' : 'bg-gradient-to-r from-blue-500 to-purple-500'
          } rounded-full opacity-20`}
          style={{
            left: shape.left,
            top: shape.top,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground; 