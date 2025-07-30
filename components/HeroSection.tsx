'use client';

import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { usePerformanceMonitor } from '../hooks/use-performance-monitor';
import { useMousePosition, useTouchPosition } from '../hooks/useMousePosition';
import { useConfetti, useParticleSystem } from '../hooks/useParticleSystem';
import {
  useInViewAnimation,
  useMagneticInteraction,
  useParallaxScroll,
  useStaggerAnimation
} from '../lib/animations';
import { Container, Flex, Grid, Section, Stack } from '../lib/layout';

// Dynamic import for Three.js component to reduce initial bundle
const StrawModel = dynamic(() => import('./three/StrawModel'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-pulse">
        <svg width="100" height="300" viewBox="0 0 100 300" className="text-primary-500">
          <rect x="45" y="0" width="10" height="300" fill="currentColor" opacity="0.3" />
        </svg>
      </div>
    </div>
  ),
});

interface HeroSectionProps {
  featuredPrice?: string;
  featuredImage?: {
    url: string;
    altText: string;
  };
}

export default function HeroSection({ 
  featuredPrice = 'CHF 9.90', 
  featuredImage 
}: HeroSectionProps) {
  // Performance monitoring
  usePerformanceMonitor('HeroSection');
  
  // State management
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [supportsWebGL, setSupportsWebGL] = useState(true);

  // Refs
  const heroRef = useRef<HTMLElement>(null);
  const strawClickRef = useRef<HTMLDivElement>(null);

  // Enhanced animation hooks
  const { elementRef: heroAnimRef, isInView: heroInView } = useInViewAnimation(0.1, true, '-100px');
  const staggerRef = useStaggerAnimation<HTMLDivElement>(100, heroInView);
  const { elementRef: primaryCTARef, isHovered: primaryCTAHovered } = useMagneticInteraction();
  const { elementRef: secondaryCTARef, isHovered: secondaryCTAHovered } = useMagneticInteraction();
  const imageRef = useParallaxScroll(0.1);

  // Custom hooks
  const mousePosition = useMousePosition({ throttle: 16 });
  const touchPosition = useTouchPosition();
  const { particles, spawnParticlesAt } = useParticleSystem({
    maxParticles: 50,
    spawnRate: 0.3,
    colors: ['#00BFA6', '#003B46', '#FFD54F'],
  });
  const { confetti, burst } = useConfetti();

  // WebGL support detection
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setSupportsWebGL(!!gl);
  }, []);

  // Load animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Easter egg handler
  const handleStrawClick = useCallback(() => {
    setClickCount(prev => prev + 1);
    
    if (strawClickRef.current) {
      const rect = strawClickRef.current.getBoundingClientRect();
      spawnParticlesAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
    }

    if (clickCount >= 4) { // 5 clicks total
      setShowEasterEgg(true);
      if (strawClickRef.current) {
        const rect = strawClickRef.current.getBoundingClientRect();
        burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 100);
      }
      
      setTimeout(() => {
        setShowEasterEgg(false);
        setClickCount(0);
      }, 5000);
    }
  }, [clickCount, spawnParticlesAt, burst]);

  return (
    <Section 
      ref={heroAnimRef}
      className="relative min-h-screen bg-white overflow-hidden" 
      aria-labelledby="hero-heading"
      data-testid="hero-section"
    >
      {/* Particle System Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-particle-float"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: `translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>

      {/* Confetti System */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.x}px`,
              top: `${piece.y}px`,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              opacity: piece.opacity,
              transform: `translate(-50%, -50%) rotate(${piece.life * 0.1}deg)`,
            }}
          />
        ))}
      </div>

      {/* Easter Egg Message */}
      {showEasterEgg && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <div className="bg-primary-500 text-white px-8 py-4 rounded-lg text-center animate-bounce">
            <h3 className="text-heading-lg font-bold">🎉 CleanSip Easter Egg! 🎉</h3>
            <p className="text-body-sm mt-2">Du hast das Geheimnis entdeckt!</p>
          </div>
        </div>
      )}

      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 animate-gradient"></div>

      {/* Hero Content */}
      <Container className="relative z-10 min-h-screen">
        <Grid className="min-h-screen" cols={2} gap="none" align="center">
        
          {/* Left Column - Main Content */}
          <div ref={staggerRef}>
            <Flex direction="column" justify="center" className="px-6 lg:px-12 py-20 lg:py-0">
              
              {/* Revolutionary Trust Badge */}
              <div className={`mb-6 transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center gap-2 bg-red-50 border-2 border-red-500 px-4 py-2 animate-pulse">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                  <span className="text-body-sm font-bold text-red-700">2'847 Schweizer sind heute auf Plastik umgestellt</span>
                </div>
              </div>
              
              {/* Rebellious Main Headline */}
              <Stack spacing="lg" className={`mb-8 transition-all duration-700 delay-100 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 className="text-display-lg lg:text-display-xl font-black leading-tight text-secondary-800" id="hero-heading">
                  <span className="text-red-600 animate-pulse">SCHLUSS MIT</span><br />
                  <span className="text-secondary-800">PAPIER</span><span className="text-primary-600">MATSCH</span>
                </h1>
                
                <p className="text-heading-md lg:text-heading-lg text-secondary-700 max-w-2xl leading-relaxed font-semibold">
                  Endlich wieder Strohhalme, die nicht nach <span className="text-red-600 font-black">30 Sekunden aufweichen</span>. 
                  <br /><span className="text-primary-600">Warum Kompromisse eingehen, wenn es auch stabil geht?</span>
                </p>
                
                <p className="text-body-lg text-gray-600 max-w-lg italic">
                  "Während andere auf Pappe kauen, geniessen Sie Ihr Getränk wie es sein soll."
                </p>
              </Stack>
              
              {/* Integrated Trust Badges - Rebellious Style */}
              <Grid cols={3} gap="md" className={`mb-8 transition-all duration-700 delay-200 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="text-center bg-secondary-800 text-white p-4 border-2 border-black transform hover:scale-105 transition-transform">
                  <div className="text-heading-lg font-bold text-primary-500">100%</div>
                  <div className="text-body-xs uppercase tracking-wider">Formstabil</div>
                </div>
                <div className="text-center bg-primary-600 text-white p-4 border-2 border-black transform hover:scale-105 transition-transform">
                  <div className="text-heading-lg font-bold">48h</div>
                  <div className="text-body-xs uppercase tracking-wider">Lieferung</div>
                </div>
                <div className="text-center bg-accent-500 text-black p-4 border-2 border-black transform hover:scale-105 transition-transform">
                  <div className="text-heading-lg font-bold">BPA</div>
                  <div className="text-body-xs uppercase tracking-wider">Frei</div>
                </div>
              </Grid>
            
              {/* Rebellious Value Propositions */}
              <Stack spacing="md" className={`mb-10 transition-all duration-700 delay-300 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Flex align="center" gap="md" className="bg-red-50 p-3 border-l-4 border-red-500">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <span className="text-body-md text-secondary-800 font-bold">Schluss mit matschigen Papier-Fetzen im Drink</span>
                </Flex>
                
                <Flex align="center" gap="md" className="bg-primary-50 p-3 border-l-4 border-primary-500">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span className="text-body-md text-secondary-800 font-bold">Stabil wie am ersten Tag - auch nach Stunden</span>
                </Flex>
                
                <Flex align="center" gap="md" className="bg-accent-50 p-3 border-l-4 border-accent-500">
                  <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <span className="text-body-md text-secondary-800 font-bold">Express-Lieferung: Morgen bestellt, übermorgen da</span>
                </Flex>
              </Stack>
                
              {/* Revolutionary CTA Buttons with Magnet Effect */}
              <div className={`mb-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Link 
                  ref={primaryCTARef as any}
                  href="/search/strohhalme"
                  className={`group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-5 font-black text-body-lg border-2 border-black shadow-brutal hover:shadow-brutal-hover transition-all duration-300 uppercase tracking-wider ${primaryCTAHovered ? 'scale-105' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    JETZT BESTELLEN
                    <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </Link>
                
                <Link 
                  ref={secondaryCTARef as any}
                  href="#cleansip-unterschied"
                  className={`group relative overflow-hidden bg-secondary-800 text-white px-10 py-5 font-black text-body-lg border-2 border-black hover:bg-secondary-700 transition-all duration-300 uppercase tracking-wider smooth-scroll ${secondaryCTAHovered ? 'scale-105' : ''}`}
                >
                  <span className="flex items-center justify-center">
                    WARUM CLEANSIP?
                    <svg className="w-6 h-6 ml-3 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  </span>
                </Link>
              </div>
              
              {/* Emotional Trust Indicators */}
              <div className={`pt-6 border-t border-gray-300 transition-all duration-700 delay-500 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="text-center">
                  <p className="text-body-lg font-bold text-secondary-800 mb-4">"Schlürfen statt kämpfen" 🥤</p>
                  <Flex align="center" justify="center" gap="xl" className="text-body-sm text-gray-700">
                    <Flex align="center" gap="sm">
                      <div className="flex text-accent-500">
                        {"★".repeat(5)}
                      </div>
                      <span className="font-bold">4.8/5 Google Reviews</span>
                    </Flex>
                    <Flex align="center" gap="sm">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold">Schweizer Qualität</span>
                    </Flex>
                  </Flex>
                </div>
              </div>
              
            </Flex>
          </div>
          
          {/* Right Column - Product Visual & Social Proof */}
          <div className="relative overflow-hidden bg-white border-l-2 border-black lg:block hidden">
            
            {/* Product Image */}
            {featuredImage && (
              <div ref={imageRef as any} className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative max-w-md mx-auto">
                  <div className="aspect-square relative group">
                    <img 
                      src={featuredImage.url} 
                      alt={featuredImage.altText || "Premium CleanSip Strohhalme"}
                      className="w-full h-full object-cover rounded-lg shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Floating badges with enhanced animations */}
                    <div className={`absolute -top-4 -right-4 bg-primary-500 text-white px-3 py-1 text-body-xs font-bold border-2 border-black transform rotate-12 shadow-lg transition-all duration-700 delay-600 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                      BESTSELLER
                    </div>
                    
                    <div className={`absolute -bottom-4 -left-4 bg-green-500 text-white px-3 py-1 text-body-xs font-bold border-2 border-black transform -rotate-12 shadow-lg transition-all duration-700 delay-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      BPA-FREI
                    </div>
                  </div>
                  
                  {/* Customer photos overlay with enhanced animation */}
                  <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-800 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 shadow-brutal">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-body-xs font-bold text-gray-800">
                          +50
                        </div>
                      </div>
                      <div className="text-body-xs font-bold text-black">
                        Diese Woche bestellt
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Fallback 3D visualization */}
            {!featuredImage && (
              <div 
                ref={strawClickRef}
                className="absolute inset-0 cursor-pointer"
                onClick={handleStrawClick}
              >
                {supportsWebGL ? (
                  <Suspense fallback={<div className="animate-pulse bg-primary-100 w-full h-full" />}>
                    <Canvas
                      camera={{ position: [0, 0, 5], fov: 50 }}
                      dpr={[1, 2]}
                      performance={{ min: 0.5 }}
                    >
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[10, 10, 5]} intensity={1} />
                      <StrawModel 
                        mousePosition={{
                          x: touchPosition.isActive ? touchPosition.normalizedX : mousePosition.normalizedX,
                          y: touchPosition.isActive ? touchPosition.normalizedY : mousePosition.normalizedY
                        }}
                        isHovered={isHovered}
                      />
                    </Canvas>
                  </Suspense>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <div 
                      className="animate-float"
                      style={{
                        transform: `perspective(1000px) rotateY(${(mousePosition.normalizedX - 0.5) * 30}deg) rotateX(${(mousePosition.normalizedY - 0.5) * -30}deg)`
                      }}
                    >
                      <div 
                        className="w-5 h-80 mx-auto rounded-full bg-gradient-to-r from-primary-500/80 via-primary-500/50 to-primary-500/80 shadow-lg"
                        style={{
                          background: 'linear-gradient(to right, #00BFA6CC, #00BFA680, #00BFA6CC)'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Bottom social proof bar with enhanced animations */}
            <div className={`absolute bottom-0 left-0 right-0 bg-white border-t-2 border-black p-4 transition-all duration-700 delay-900 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Flex justify="between" align="center" className="text-body-sm">
                <Flex align="center" gap="md">
                  <Flex align="center" gap="xs">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 font-medium">4.8/5</span>
                  </Flex>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">500+ Bewertungen</span>
                </Flex>
                
                <Flex align="center" gap="sm" className="text-green-600 font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Auf Lager</span>
                </Flex>
              </Flex>
            </div>
            
          </div>
        
        </Grid>
      </Container>
      
      {/* Subtle Brand Elements with Enhanced Animation */}
      <div className="absolute top-6 lg:top-8 right-6 lg:right-8">
        <div className="w-2 h-2 bg-primary-500 opacity-60 animate-float"></div>
      </div>
      
      <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8">
        <div className="w-px h-8 bg-secondary-500/20 animate-float-delayed"></div>
      </div>

      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="absolute top-4 left-4 bg-primary-500 text-white px-4 py-2 rounded transform -translate-y-full focus:translate-y-0 transition-transform duration-300 z-50"
      >
        Zum Hauptinhalt springen
      </a>
      
    </Section>
  );
}
