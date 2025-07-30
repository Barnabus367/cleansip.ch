'use client';

import { useCallback, useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

interface UseMousePositionOptions {
  debounce?: number;
  throttle?: number;
}

export function useMousePosition(options: UseMousePositionOptions = {}): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5
  });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const normalizedX = e.clientX / window.innerWidth;
    const normalizedY = e.clientY / window.innerHeight;
    
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
      normalizedX,
      normalizedY
    });
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (options.throttle) {
        // Throttle implementation
        if (timeoutId) return;
        timeoutId = setTimeout(() => {
          updateMousePosition(e);
          timeoutId = null as any;
        }, options.throttle);
      } else if (options.debounce) {
        // Debounce implementation
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => updateMousePosition(e), options.debounce);
      } else {
        updateMousePosition(e);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [updateMousePosition, options.throttle, options.debounce]);

  return mousePosition;
}

// Smooth mouse position hook with interpolation
export function useSmoothMousePosition(smoothing: number = 0.1): MousePosition {
  const rawPosition = useMousePosition({ throttle: 16 }); // ~60fps
  const [smoothPosition, setSmoothPosition] = useState<MousePosition>(rawPosition);

  useEffect(() => {
    const animate = () => {
      setSmoothPosition(prev => ({
        x: prev.x + (rawPosition.x - prev.x) * smoothing,
        y: prev.y + (rawPosition.y - prev.y) * smoothing,
        normalizedX: prev.normalizedX + (rawPosition.normalizedX - prev.normalizedX) * smoothing,
        normalizedY: prev.normalizedY + (rawPosition.normalizedY - prev.normalizedY) * smoothing,
      }));
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [rawPosition, smoothing]);

  return smoothPosition;
}

// Mouse velocity hook for advanced interactions
export function useMouseVelocity() {
  const [velocity, setVelocity] = useState({ x: 0, y: 0, magnitude: 0 });
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const position = useMousePosition({ throttle: 16 });

  useEffect(() => {
    const deltaX = position.x - prevPosition.x;
    const deltaY = position.y - prevPosition.y;
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    setVelocity({ x: deltaX, y: deltaY, magnitude });
    setPrevPosition({ x: position.x, y: position.y });
  }, [position, prevPosition]);

  return velocity;
}

// Touch support for mobile
export function useTouchPosition() {
  const [touchPosition, setTouchPosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
    isActive: false
  });

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        const normalizedX = touch.clientX / window.innerWidth;
        const normalizedY = touch.clientY / window.innerHeight;
        
        setTouchPosition({
          x: touch.clientX,
          y: touch.clientY,
          normalizedX,
          normalizedY,
          isActive: true
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        const normalizedX = touch.clientX / window.innerWidth;
        const normalizedY = touch.clientY / window.innerHeight;
        
        setTouchPosition(prev => ({
          ...prev,
          x: touch.clientX,
          y: touch.clientY,
          normalizedX,
          normalizedY
        }));
      }
    };

    const handleTouchEnd = () => {
      setTouchPosition(prev => ({ ...prev, isActive: false }));
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return touchPosition;
}
