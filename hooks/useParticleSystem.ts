'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleSystemOptions {
  maxParticles?: number;
  spawnRate?: number;
  particleLife?: number;
  colors?: string[];
  sizes?: { min: number; max: number };
  velocity?: { min: number; max: number };
  enableNoise?: boolean;
}

export function useParticleSystem(options: ParticleSystemOptions = {}) {
  const {
    maxParticles = 50,
    spawnRate = 0.5,
    particleLife = 5000,
    colors = ['#00BFA6', '#003B46', '#FFD54F'],
    sizes = { min: 2, max: 6 },
    velocity = { min: -0.5, max: 0.5 },
    enableNoise = true
  } = options;

  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);
  const particleIdCounter = useRef<number>(0);

  const createParticle = useCallback((x?: number, y?: number): Particle => {
    return {
      id: particleIdCounter.current++,
      x: x ?? Math.random() * window.innerWidth,
      y: y ?? Math.random() * window.innerHeight,
      vx: velocity.min + Math.random() * (velocity.max - velocity.min),
      vy: velocity.min + Math.random() * (velocity.max - velocity.min),
      size: sizes.min + Math.random() * (sizes.max - sizes.min),
      opacity: 0.6 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)] || '#00BFA6',
      life: 0,
      maxLife: particleLife * (0.5 + Math.random() * 0.5)
    };
  }, [colors, sizes, velocity, particleLife]);

  const updateParticles = useCallback((timestamp: number) => {
    setParticles(prevParticles => {
      let newParticles = [...prevParticles];

      // Spawn new particles
      if (timestamp - lastSpawnTime.current > 1000 / spawnRate && newParticles.length < maxParticles) {
        newParticles.push(createParticle());
        lastSpawnTime.current = timestamp;
      }

      // Update existing particles
      newParticles = newParticles.map(particle => {
        const updatedParticle = { ...particle };
        
        // Update position
        updatedParticle.x += updatedParticle.vx;
        updatedParticle.y += updatedParticle.vy;
        
        // Add noise for organic movement
        if (enableNoise) {
          const noise = Math.sin(timestamp * 0.001 + particle.id) * 0.1;
          updatedParticle.x += noise;
          updatedParticle.y += Math.cos(timestamp * 0.0008 + particle.id) * 0.1;
        }
        
        // Update life
        updatedParticle.life += 16; // Assume 60fps
        
        // Fade out based on life
        const lifeRatio = updatedParticle.life / updatedParticle.maxLife;
        updatedParticle.opacity = (1 - lifeRatio) * 0.8;
        
        return updatedParticle;
      });

      // Remove dead particles
      newParticles = newParticles.filter(particle => particle.life < particle.maxLife);

      return newParticles;
    });

    animationFrameRef.current = requestAnimationFrame(updateParticles);
  }, [createParticle, maxParticles, spawnRate, enableNoise]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateParticles);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateParticles]);

  const spawnParticlesAt = useCallback((x: number, y: number, count: number = 5) => {
    const newParticles = Array.from({ length: count }, () => createParticle(x, y));
    setParticles(prev => [...prev, ...newParticles].slice(-maxParticles));
  }, [createParticle, maxParticles]);

  const clearParticles = useCallback(() => {
    setParticles([]);
  }, []);

  return {
    particles,
    spawnParticlesAt,
    clearParticles
  };
}

// Confetti system for easter egg
export function useConfetti() {
  const [confetti, setConfetti] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const createConfettiPiece = useCallback((x: number, y: number): Particle => {
    return {
      id: Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * -15 - 5,
      size: 3 + Math.random() * 6,
      opacity: 1,
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'][Math.floor(Math.random() * 5)] || '#FF6B6B',
      life: 0,
      maxLife: 3000 + Math.random() * 2000
    };
  }, []);

  const updateConfetti = useCallback((timestamp: number) => {
    setConfetti(prevConfetti => {
      const updatedConfetti = prevConfetti.map(piece => {
        const updated = { ...piece };
        
        // Physics
        updated.x += updated.vx;
        updated.y += updated.vy;
        updated.vy += 0.3; // Gravity
        updated.vx *= 0.99; // Air resistance
        
        // Rotation effect
        updated.vx += Math.sin(timestamp * 0.01 + piece.id) * 0.1;
        
        updated.life += 16;
        updated.opacity = Math.max(0, 1 - (updated.life / updated.maxLife));
        
        return updated;
      });

      return updatedConfetti.filter(piece => 
        piece.life < piece.maxLife && piece.y < window.innerHeight + 100
      );
    });

    if (confetti.length > 0) {
      animationFrameRef.current = requestAnimationFrame(updateConfetti);
    }
  }, [confetti.length]);

  useEffect(() => {
    if (confetti.length > 0) {
      animationFrameRef.current = requestAnimationFrame(updateConfetti);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [confetti.length, updateConfetti]);

  const burst = useCallback((x: number, y: number, count: number = 50) => {
    const newConfetti = Array.from({ length: count }, () => createConfettiPiece(x, y));
    setConfetti(prev => [...prev, ...newConfetti]);
  }, [createConfettiPiece]);

  return {
    confetti,
    burst
  };
}
