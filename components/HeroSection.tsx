import Link from 'next/link';
import Straw from './Straw';

interface HeroSectionProps {
  featuredPrice?: string;
}

export default function HeroSection({ featuredPrice = 'CHF 14.90' }: HeroSectionProps) {
  return (
    <section 
      className="relative min-h-screen bg-white overflow-hidden" 
      aria-labelledby="hero-heading"
      data-testid="hero-section"
    >
      {/* Two-Column Grid Layout */}
      <div className="grid lg:grid-cols-2 min-h-screen max-w-[1600px] mx-auto">
      
        {/* Left Column - Typography Focus */}
        <div className="relative px-6 lg:px-12 flex flex-col justify-center">
          
          {/* Small Intro - Swiss Typography Style */}
          <div className="absolute top-16 lg:top-24 left-6 lg:left-12">
            <p className="text-xs tracking-[0.3em] text-secondary-500 font-light uppercase">
              Nie mehr
            </p>
          </div>
          
          {/* Main Typography Composition */}
          <div className="relative space-y-2 lg:space-y-4">
            
            {/* Primary Typography - Gemäß Spezifikation: MATSCHIGE in Petrol, ALTERNATIVEN in Mint-Türkis */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none"
              id="hero-heading"
              role="heading"
              aria-level={1}
            >
              <span className="block text-secondary-800">MATSCHIGE</span>
              <span className="block text-primary-600">ALTERNATIVEN</span>
            </h1>
            
            {/* Subtitle */}
            <div className="mt-6 sm:mt-8 lg:mt-12">
              <div className="max-w-md">
                <p className="text-xs lg:text-sm text-secondary-500/60 leading-relaxed font-light">
                  CleanSip liefert Premium-Plastikstrohhalme für anspruchsvolle Event-Planer und Gastronomen in der Schweiz.
                </p>
              </div>
            </div>
            
          </div>
          
          {/* Info-Grid - Gemäß Spezifikation als Grid mit vier Spalten */}
          <div className="mt-10">
            <dl 
              className="grid grid-cols-4 gap-x-8 text-xs uppercase tracking-widest"
              data-testid="info-grid"
            >
              <div>
                <dt className="text-secondary-500/60 font-light">Menge</dt>
                <dd className="text-secondary-800 font-medium">100 Stück</dd>
              </div>
              <div>
                <dt className="text-secondary-500/60 font-light">Preis</dt>
                <dd className="text-secondary-800 font-medium">{featuredPrice}</dd>
              </div>
              <div>
                <dt className="text-secondary-500/60 font-light">Material</dt>
                <dd className="text-secondary-800 font-medium">100% PP</dd>
              </div>
              <div>
                <dt className="text-secondary-500/60 font-light">Lieferung</dt>
                <dd className="text-secondary-800 font-medium">48h</dd>
              </div>
            </dl>
          </div>
            
          {/* CTA-Button - Mint-Brand-Farbton mit mittlerem Shadow */}
          <div className="mt-8 lg:mt-12">
            <Link 
              href="/search/strohhalme"
              className="group inline-block"
              aria-label="Jetzt bestellen - Premium Plastikstrohhalme"
            >
              <div className="bg-primary-500 text-white px-8 py-3 shadow-md hover:bg-primary-600 hover:shadow-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2">
                <span className="text-xs tracking-[0.15em] font-medium uppercase">
                  JETZT BESTELLEN
                </span>
              </div>
            </Link>
          </div>
          
        </div>
        
        {/* Right Column - Abstract Geometric Visualization mit Animation */}
        <div className="relative overflow-hidden">
          
          {/* Background Color Block mit Gradient Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 animate-gradient"></div>
          
          {/* Plastikstrohhalme - Optimiert mit Straw-Komponente */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-md">
              
              <div 
                className="flex gap-3 justify-center items-end h-full pt-20 pb-20 animate-float"
                data-testid="straws-container"
              >
                {[
                  { delay: 0, rotation: 'right' as const, height: 'medium' as const },
                  { delay: 0.1, rotation: 'left' as const, height: 'tall' as const },
                  { delay: 0.2, rotation: 'right' as const, height: 'short' as const },
                  { delay: 0.3, rotation: 'left' as const, height: 'extra-tall' as const },
                  { delay: 0.4, rotation: 'right' as const, height: 'medium' as const },
                  { delay: 0.5, rotation: 'left' as const, height: 'tall' as const },
                  { delay: 0.6, rotation: 'right' as const, height: 'short' as const },
                  { delay: 0.7, rotation: 'left' as const, height: 'medium' as const },
                  { delay: 0.8, rotation: 'right' as const, height: 'tall' as const },
                  { delay: 0.9, rotation: 'left' as const, height: 'extra-tall' as const }
                ].map((strawConfig, i) => (
                  <Straw 
                    key={i}
                    delay={strawConfig.delay}
                    rotation={strawConfig.rotation}
                    height={strawConfig.height}
                  />
                ))}
              </div>
              
              {/* Animated Accent Lines - subtiler */}
              <div className="absolute top-1/4 left-1/4 w-16 h-px bg-accent-500/30 opacity-60 animate-float"></div>
              <div className="absolute bottom-1/3 right-1/4 w-12 h-px bg-primary-500/40 opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
              
              {/* Swiss Cross Reference - kleine animierte Shape */}
              <div className="absolute top-1/6 right-1/6 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-px h-6 bg-secondary-500/20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-px bg-secondary-500/20"></div>
              </div>
              
            </div>
          </div>
          
          {/* Large Typography Element - Vertical "CLEAN" in sehr heller Petrol-Farbe */}
          <div className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2">
            <div className="writing-mode-vertical text-secondary-200/30 text-6xl lg:text-8xl font-black tracking-wider">
              CLEAN
            </div>
          </div>
          
          {/* SVG-Raster mit CSS-Variablen für Theme-Support */}
          <div 
            className="absolute inset-0"
            style={{ opacity: 'var(--svg-grid-opacity)' }}
          >
            <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path 
                    d="M 40 0 L 0 0 0 40" 
                    fill="none" 
                    stroke="var(--svg-grid-primary)" 
                    strokeWidth="var(--svg-grid-stroke-width)"
                  />
                </pattern>
              </defs>
              <rect 
                width="100%" 
                height="100%" 
                fill="url(#grid)" 
                className="animate-pulse-slow"
              />
            </svg>
          </div>
          
        </div>
        
      </div>
      
      {/* Subtle Brand Elements */}
      <div className="absolute top-6 lg:top-8 right-6 lg:right-8">
        <div className="w-2 h-2 bg-primary-500 opacity-60 animate-float"></div>
      </div>
      
      <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8">
        <div className="w-px h-8 bg-secondary-500/20"></div>
      </div>
      
    </section>
  );
}
