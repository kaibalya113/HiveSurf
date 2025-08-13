import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

function AnimatedSphere() {
  return (
    <Sphere args={[1, 100, 200]} scale={2.4}>
      <meshStandardMaterial
        color="#0ea5e9"
        wireframe
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const loadingSteps = [
        { text: 'Loading assets...', progress: 25 },
        { text: 'Preparing components...', progress: 50 },
        { text: 'Setting up routing...', progress: 75 },
        { text: 'Almost ready...', progress: 90 },
        { text: 'Launching HiveSurf...', progress: 100 }
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < loadingSteps.length) {
          setLoadingText(loadingSteps[currentStep].text);
          setProgress(loadingSteps[currentStep].progress);
          currentStep++;
        } else {
          clearInterval(interval);
        }
      }, 400);

      return () => clearInterval(interval);
    } catch (error) {
      console.error('LoadingScreen error:', error);
      setHasError(true);
    }
  }, []);

  // Fallback loading screen if there's an error
  if (hasError) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">HiveSurf</h1>
          <p className="text-lg text-slate-300 mb-8">Riding the wave of innovation</p>
          <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse" />
          </div>
          <p className="text-sm text-slate-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
      <div className="relative">
        {/* 3D Canvas */}
        <div className="absolute inset-0 w-64 h-64">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        {/* Loading Text */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold gradient-text font-display">
              HiveSurf
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-slate-300 mb-8"
          >
            Riding the wave of innovation
          </motion.div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="text-sm text-slate-400 mb-2">{loadingText}</div>
            <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              />
            </div>
            <div className="text-xs text-slate-500 mt-1">{progress}%</div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-sm text-slate-400"
          >
            Loading amazing experiences...
          </motion.div>
        </div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default LoadingScreen; 