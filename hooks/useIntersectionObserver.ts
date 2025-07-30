'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setTarget = useCallback((element: HTMLElement | null) => {
    targetRef.current = element;
  }, []);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    // Create observer only when needed
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          
          const isVisible = entry.isIntersecting;
          setIsIntersecting(isVisible);
          
          if (isVisible && !hasIntersected) {
            setHasIntersected(true);
            
            // Disconnect if triggerOnce is true
            if (triggerOnce && observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        },
        {
          threshold,
          rootMargin
        }
      );
    }

    observerRef.current.observe(target);

    return () => {
      if (observerRef.current && target) {
        observerRef.current.unobserve(target);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasIntersected]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    setTarget,
    isIntersecting,
    hasIntersected
  };
}

// Batch intersection observer for multiple elements
export function useBatchIntersectionObserver(
  elements: HTMLElement[],
  options: UseIntersectionObserverOptions = {}
) {
  const [intersectingElements, setIntersectingElements] = useState<Set<HTMLElement>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        setIntersectingElements(prev => {
          const newSet = new Set(prev);
          
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              newSet.add(entry.target as HTMLElement);
            } else {
              newSet.delete(entry.target as HTMLElement);
            }
          });
          
          return newSet;
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
      }
    );

    elements.forEach(element => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elements, options.threshold, options.rootMargin]);

  return intersectingElements;
}

// Scroll-triggered animation hook
export function useScrollAnimation(className: string = 'animate-fade-in-up') {
  const { setTarget, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const ref = useCallback((element: HTMLElement | null) => {
    if (element) {
      setTarget(element);
      
      if (hasIntersected) {
        element.classList.add(className);
      }
    }
  }, [setTarget, hasIntersected, className]);

  return ref;
}

// Performance-focused visibility hook with throttling
export function useVisibility(throttleMs: number = 100) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkVisibility = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const visible = (
      rect.top < windowHeight &&
      rect.bottom > 0 &&
      rect.left < windowWidth &&
      rect.right > 0
    );

    setIsVisible(visible);
  }, []);

  const throttledCheck = useCallback(() => {
    if (timeoutRef.current) return;
    
    timeoutRef.current = setTimeout(() => {
      checkVisibility();
      timeoutRef.current = null;
    }, throttleMs);
  }, [checkVisibility, throttleMs]);

  useEffect(() => {
    const handleScroll = () => throttledCheck();
    const handleResize = () => throttledCheck();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial check
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [throttledCheck, checkVisibility]);

  const setRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
    if (element) {
      checkVisibility();
    }
  }, [checkVisibility]);

  return { isVisible, setRef };
}
