import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

const Earth3D = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef();
  const { isDark } = useTheme();
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [textureError, setTextureError] = useState(false);
  
  // Try to load Earth textures with error handling
  const textureUrls = [
    '/earth_texture.jpg',
    '/earth_bump.jpg', 
    '/earth_specular.jpg',
    '/earth_clouds.png'
  ];

  let earthTexture, earthBumpMap, earthSpecularMap, cloudsTexture;

  try {
    [earthTexture, earthBumpMap, earthSpecularMap, cloudsTexture] = useTexture(textureUrls, 
      () => setTexturesLoaded(true),
      (error) => {
        console.warn('Earth textures not found, using fallback:', error);
        setTextureError(true);
        setTexturesLoaded(true);
      }
    );
  } catch (error) {
    console.warn('Earth textures not found, using fallback:', error);
    setTextureError(true);
    setTexturesLoaded(true);
  }

  // Slow rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002; // Very slow rotation
    }
  });

  // Theme-based lighting colors with smooth transitions
  const [lightingState, setLightingState] = useState({
    ambientLightColor: isDark ? '#1e293b' : '#f1f5f9',
    directionalLightColor: isDark ? '#0ea5e9' : '#0284c7',
    pointLightColor: isDark ? '#d946ef' : '#c026d3',
    earthColor: isDark ? '#1e40af' : '#3b82f6',
    landColor: isDark ? '#059669' : '#10b981',
    waterColor: isDark ? '#0c4a6e' : '#0ea5e9'
  });

  // Handle theme changes with smooth transitions
  useEffect(() => {
    const newLightingState = {
      ambientLightColor: isDark ? '#1e293b' : '#f1f5f9',
      directionalLightColor: isDark ? '#0ea5e9' : '#0284c7',
      pointLightColor: isDark ? '#d946ef' : '#c026d3',
      earthColor: isDark ? '#1e40af' : '#3b82f6',
      landColor: isDark ? '#059669' : '#10b981',
      waterColor: isDark ? '#0c4a6e' : '#0ea5e9'
    };
    
    // Update lighting state with a slight delay for smooth transition
    const timeoutId = setTimeout(() => {
      setLightingState(newLightingState);
    }, 150); // Match the theme transition timing
    
    return () => clearTimeout(timeoutId);
  }, [isDark]);

  // Memoize the particles array at the top level
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.sin(i * 0.5) * (1.5 + Math.random() * 0.5),
      y: Math.cos(i * 0.3) * (1.5 + Math.random() * 0.5),
      z: Math.sin(i * 0.7) * (1.5 + Math.random() * 0.5),
      opacity: 0.3 + Math.random() * 0.4
    })), []
  );

  return (
    <group position={position} scale={scale} className="earth-theme-transition">
      {/* Ambient light for overall illumination */}
      <ambientLight 
        intensity={isDark ? 0.3 : 0.6} 
        color={lightingState.ambientLightColor}
      />
      
      {/* Main directional light (sun) */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={isDark ? 0.8 : 1.2}
        color={lightingState.directionalLightColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Secondary point light for atmosphere */}
      <pointLight
        position={[-5, 5, 5]}
        intensity={isDark ? 0.4 : 0.6}
        color={lightingState.pointLightColor}
        distance={20}
      />

      {/* Earth sphere */}
      <Sphere ref={meshRef} args={[1, 64, 64]} castShadow receiveShadow>
        {texturesLoaded && !textureError ? (
          <meshPhongMaterial
            map={earthTexture}
            bumpMap={earthBumpMap}
            bumpScale={0.05}
            specularMap={earthSpecularMap}
            specular={isDark ? '#0ea5e9' : '#0284c7'}
            shininess={isDark ? 30 : 50}
            transparent={true}
            opacity={0.9}
          />
        ) : (
          <meshPhongMaterial
            color={lightingState.earthColor}
            specular={isDark ? '#0ea5e9' : '#0284c7'}
            shininess={isDark ? 30 : 50}
            transparent={true}
            opacity={0.9}
          />
        )}
      </Sphere>

      {/* Atmospheric glow effect */}
      <Sphere args={[1.1, 32, 32]}>
        <meshBasicMaterial
          color={lightingState.directionalLightColor}
          transparent={true}
          opacity={0.1}
          side="back"
        />
      </Sphere>

      {/* Cloud layer - only show if textures are loaded */}
      {texturesLoaded && !textureError && cloudsTexture && (
        <Sphere args={[1.02, 64, 64]}>
          <meshPhongMaterial
            map={cloudsTexture}
            transparent={true}
            opacity={0.3}
            blending="additive"
          />
        </Sphere>
      )}

      {/* Fallback land masses for when textures aren't available */}
      {textureError && (
        <>
          {/* Simple land mass representation */}
          <Sphere args={[1.01, 32, 32]} position={[0.1, 0.2, 0]}>
            <meshPhongMaterial
              color={lightingState.landColor}
              transparent={true}
              opacity={0.4}
            />
          </Sphere>
          <Sphere args={[1.01, 24, 24]} position={[-0.3, -0.1, 0.5]}>
            <meshPhongMaterial
              color={lightingState.landColor}
              transparent={true}
              opacity={0.3}
            />
          </Sphere>
        </>
      )}

      {/* Floating particles around Earth */}
      {particles.map((particle) => (
        <Sphere key={particle.id} args={[0.01, 8, 8]} position={[
          particle.x,
          particle.y,
          particle.z
        ]}>
          <meshBasicMaterial
            color={lightingState.pointLightColor}
            transparent={true}
            opacity={particle.opacity}
          />
        </Sphere>
      ))}
    </group>
  );
};

export default Earth3D; 