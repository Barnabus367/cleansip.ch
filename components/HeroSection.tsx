'use client';

import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useMousePosition, useTouchPosition } from '../hooks/useMousePosition';
import { useConfetti, useParticleSystem } from '../hooks/useParticleSystem';
import { GlitchTypography, LiquidTypography } from './typography/LiquidTypography';

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
}

export default function HeroSection({ featuredPrice = 'CHF 14.90' }: HeroSectionProps) {
  // State management
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [supportsWebGL, setSupportsWebGL] = useState(true);

  // Refs
  const heroRef = useRef<HTMLElement>(null);
  const strawClickRef = useRef<HTMLDivElement>(null);

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

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('[data-scroll-animate]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={heroRef}
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
            <h3 className="text-2xl font-bold">🎉 CleanSip Easter Egg! 🎉</h3>
            <p className="text-sm mt-2">Du hast das Geheimnis entdeckt!</p>
          </div>
        </div>
      )}

      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 animate-gradient"></div>

      {/* Two-Column Grid Layout */}
      <div className="grid lg:grid-cols-2 min-h-screen max-w-[1600px] mx-auto relative z-10">
      
        {/* Left Column - Typography Focus */}
        <div className="relative px-6 lg:px-12 flex flex-col justify-center">
          
          {/* Small Intro - Swiss Typography Style */}
          <div className="absolute top-16 lg:top-24 left-6 lg:left-12" data-scroll-animate>
            <p className="text-xs tracking-[0.3em] text-secondary-500 font-light uppercase">
              Nie mehr
            </p>
          </div>
          
          {/* Main Typography Composition */}
          <div className="relative space-y-2 lg:space-y-4">
            
            {/* Hidden H1 for SEO */}
            <h1 className="sr-only" id="hero-heading">
              CleanSip - Nie mehr matschige Alternativen zu Plastikstrohhalmen
            </h1>
            
            {/* Liquid Typography - "MATSCHIGE" */}
            <div data-scroll-animate>
              <LiquidTypography
                text="MATSCHIGE"
                className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none text-secondary-800"
                isHovered={isHovered}
                animationTrigger={isLoaded}
              />
            </div>
            
            {/* Glitch Typography - "ALTERNATIVEN" */}
            <div 
              data-scroll-animate
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <GlitchTypography
                text="ALTERNATIVEN"
                className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none text-primary-600"
                isActive={isHovered}
              />
            </div>
            
            {/* Subtitle */}
            <div className="mt-6 sm:mt-8 lg:mt-12" data-scroll-animate>
              <div className="max-w-md">
                <p className="text-xs lg:text-sm text-secondary-500/60 leading-relaxed font-light">
                  CleanSip liefert Premium-Plastikstrohhalme für anspruchsvolle Event-Planer und Gastronomen in der Schweiz.
                </p>
              </div>
            </div>
            
          </div>
          
          {/* Info-Grid - Enhanced with animations */}
          <div className="mt-10" data-scroll-animate>
            <dl className="grid grid-cols-4 gap-x-8 text-xs uppercase tracking-widest">
              {[
                { label: 'Menge', value: '100 Stück' },
                { label: 'Preis', value: featuredPrice },
                { label: 'Material', value: '100% PP' },
                { label: 'Lieferung', value: '48h' }
              ].map((item, index) => (
                <div 
                  key={item.label}
                  className="transform transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <dt className="text-secondary-500/60 font-light">{item.label}</dt>
                  <dd className="text-secondary-800 font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
            
          {/* Enhanced CTA-Button */}
          <div className="mt-8 lg:mt-12" data-scroll-animate>
            <Link 
              href="/search/strohhalme"
              className="group inline-block transform transition-all duration-300 hover:scale-105"
              aria-label="Jetzt bestellen - Premium Plastikstrohhalme"
            >
              <div className="relative bg-primary-500 text-white px-8 py-3 shadow-md hover:bg-primary-600 hover:shadow-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 overflow-hidden">
                {/* Button background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <span className="relative text-xs tracking-[0.15em] font-medium uppercase">
                  JETZT BESTELLEN
                </span>
              </div>
            </Link>
          </div>
          
        </div>
        
        {/* Right Column - WebGL 3D Straw */}
        <div className="relative overflow-hidden">
          
          {/* 3D Straw Model */}
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
              // SVG Fallback for non-WebGL devices - completely separate from Canvas
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
          
          {/* Large Typography Element - Vertical "CLEAN" */}
          <div className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="writing-mode-vertical text-secondary-200/30 text-6xl lg:text-8xl font-black tracking-wider animate-pulse-slow">
              CLEAN
            </div>
          </div>
          
        </div>
        
      </div>
      
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
      
    </section>
  );
}
