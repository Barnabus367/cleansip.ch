'use client';

import { useEffect, useRef, useState } from 'react';

interface LiquidTypographyProps {
  text: string;
  className?: string;
  isHovered?: boolean;
  animationTrigger?: boolean;
}

export function LiquidTypography({ 
  text, 
  className = '', 
  isHovered = false,
  animationTrigger = false 
}: LiquidTypographyProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animationTrigger) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [animationTrigger]);

  return (
    <div className={`relative ${className}`}>
      {/* SVG Filters for liquid effect */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="liquid-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              baseFrequency="0.02 0.1"
              numOctaves="3"
              result="turbulence"
              seed={isHovered ? 5 : 1}
            >
              <animate
                attributeName="baseFrequency"
                values={isHovered ? "0.02 0.1; 0.04 0.2; 0.02 0.1" : "0.02 0.1"}
                dur="3s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={isHovered ? "8" : "2"}
              result="displacement"
            >
              <animate
                attributeName="scale"
                values={isHovered ? "2; 12; 2" : "2"}
                dur="2s"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
            
            <feGaussianBlur
              in="displacement"
              stdDeviation={isHovered ? "1" : "0.5"}
              result="blur"
            />
            
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>

          <filter id="drip-filter" x="-50%" y="-50%" width="200%" height="300%">
            <feTurbulence
              baseFrequency="0.1 0.02"
              numOctaves="2"
              result="drip-turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="drip-turbulence"
              scale="15"
              result="drip-displacement"
            />
            <feOffset
              in="drip-displacement"
              dx="0"
              dy={isHovered ? "20" : "0"}
              result="drip-offset"
            >
              <animate
                attributeName="dy"
                values={isHovered ? "0; 30; 0" : "0"}
                dur="3s"
                repeatCount="indefinite"
              />
            </feOffset>
          </filter>
        </defs>
      </svg>

      {/* Main text with liquid effect */}
      <div 
        ref={textRef}
        className={`
          relative z-10 transition-all duration-1000 ease-out
          ${isHovered ? 'filter-liquid-drip' : 'filter-liquid-subtle'}
          ${isAnimating ? 'animate-liquid-load' : ''}
        `}
        style={{
          filter: isHovered ? 'url(#drip-filter)' : 'url(#liquid-filter)',
          transform: isHovered ? 'translateY(5px)' : 'translateY(0px)',
        }}
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`
              inline-block transition-all duration-300 ease-out
              ${isAnimating ? 'animate-stagger-in' : ''}
            `}
            style={{
              animationDelay: `${index * 50}ms`,
              transform: isHovered && char !== ' ' ? 
                `translateY(${Math.sin(index * 0.5) * 3}px) rotate(${Math.sin(index) * 2}deg)` : 
                'translateY(0px) rotate(0deg)',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Drip particles when hovered */}
      {isHovered && (
        <div className="absolute top-full left-0 w-full overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-current opacity-60 rounded-full animate-drip"
              style={{
                left: `${20 + i * 15}%`,
                width: `${4 + Math.random() * 6}px`,
                height: `${8 + Math.random() * 12}px`,
                animationDelay: `${i * 200}ms`,
                animationDuration: `${1000 + Math.random() * 1000}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function GlitchTypography({ 
  text, 
  className = '', 
  isActive = false 
}: {
  text: string;
  className?: string;
  isActive?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* SVG Filters for glitch effect */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glitch-filter">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />
            <feOffset
              in="red"
              dx={isActive ? "3" : "0"}
              dy="0"
              result="red-offset"
            >
              <animate
                attributeName="dx"
                values={isActive ? "0; 3; -2; 3; 0" : "0"}
                dur="0.2s"
                repeatCount="indefinite"
              />
            </feOffset>
            
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="cyan"
            />
            <feOffset
              in="cyan"
              dx={isActive ? "-2" : "0"}
              dy="0"
              result="cyan-offset"
            >
              <animate
                attributeName="dx"
                values={isActive ? "0; -2; 3; -2; 0" : "0"}
                dur="0.3s"
                repeatCount="indefinite"
              />
            </feOffset>
            
            <feBlend mode="screen" in="red-offset" in2="cyan-offset" />
          </filter>
        </defs>
      </svg>

      {/* Main text */}
      <div 
        className={`
          relative z-10 transition-all duration-100
          ${isActive ? 'animate-glitch-shake' : ''}
        `}
        style={{
          filter: isActive ? 'url(#glitch-filter)' : 'none',
        }}
      >
        {text}
      </div>

      {/* Glitch lines overlay */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white opacity-30 animate-glitch-lines"
              style={{
                top: `${20 + i * 30}%`,
                left: '0%',
                width: '100%',
                height: '2px',
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
