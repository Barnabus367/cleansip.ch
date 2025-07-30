'use client'

/**
 * Advanced Animation System for CleanSip
 * Awwwards-level micro-interactions and animations
 */

import { useEffect, useRef, useState } from 'react'

// Material Design 3 Easing Functions
export const easings = {
  // Emphasized easing for significant UI changes
  emphasized: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
  emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',
  emphasizedAccelerate: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)',
  
  // Standard easing for common UI animations
  standard: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
  standardDecelerate: 'cubic-bezier(0.0, 0.0, 0, 1.0)',
  standardAccelerate: 'cubic-bezier(0.3, 0.0, 1.0, 1.0)',
  
  // Legacy support
  easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
} as const

// Animation Duration Scale (Material Design 3)
export const durations = {
  // Short duration - Small UI elements, simple transitions
  short1: 50,   // 50ms
  short2: 100,  // 100ms
  short3: 150,  // 150ms
  short4: 200,  // 200ms
  
  // Medium duration - Layout changes, content transitions
  medium1: 250, // 250ms
  medium2: 300, // 300ms
  medium3: 350, // 350ms
  medium4: 400, // 400ms
  
  // Long duration - Complex animations, page transitions
  long1: 450,   // 450ms
  long2: 500,   // 500ms
  long3: 550,   // 550ms
  long4: 600,   // 600ms
  
  // Extra long - Reveal animations, impressive effects
  extraLong1: 700, // 700ms
  extraLong2: 800, // 800ms
  extraLong3: 900, // 900ms
  extraLong4: 1000, // 1000ms
} as const

// Magnetic Interaction Hook
export function useMagneticInteraction(strength = 0.3, returnSpeed = 0.15) {
  const elementRef = useRef<HTMLElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    let animationFrame: number | undefined
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return
      
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.05)`
    }
    
    const handleMouseEnter = () => {
      setIsHovered(true)
      element.style.transition = `transform ${durations.short4}ms ${easings.emphasized}`
    }
    
    const handleMouseLeave = () => {
      setIsHovered(false)
      element.style.transition = `transform ${durations.medium2}ms ${easings.emphasizedDecelerate}`
      element.style.transform = 'translate3d(0px, 0px, 0) scale(1)'
    }
    
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [strength, isHovered])
  
  return { elementRef, isHovered }
}

// Parallax Scroll Hook
export function useParallaxScroll(speed = 0.5, offset = 0) {
  const elementRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    let ticking = false
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset
      const elementTop = element.offsetTop
      const elementHeight = element.offsetHeight
      const windowHeight = window.innerHeight
      
      // Only animate when element is in viewport
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = (scrolled - elementTop + offset) * speed
        element.style.transform = `translate3d(0, ${yPos}px, 0)`
      }
      
      ticking = false
    }
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', requestTick)
    }
  }, [speed, offset])
  
  return elementRef
}

// Intersection Observer Hook with Animation Trigger
export function useInViewAnimation(
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '0px'
) {
  const elementRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        
        const inView = entry.isIntersecting
        
        if (triggerOnce) {
          if (inView && !hasTriggered) {
            setIsInView(true)
            setHasTriggered(true)
          }
        } else {
          setIsInView(inView)
        }
      },
      { threshold, rootMargin }
    )
    
    observer.observe(element)
    
    return () => observer.disconnect()
  }, [threshold, triggerOnce, rootMargin, hasTriggered])
  
  return { elementRef, isInView }
}

// Stagger Animation Hook
export function useStaggerAnimation<T extends HTMLElement>(
  delay = 100,
  trigger = true
) {
  const containerRef = useRef<T>(null)
  
  useEffect(() => {
    if (!trigger) return
    
    const container = containerRef.current
    if (!container) return
    
    const children = Array.from(container.children) as HTMLElement[]
    
    children.forEach((child, index) => {
      child.style.animationDelay = `${index * delay}ms`
      child.classList.add('animate-fade-in-up')
    })
  }, [delay, trigger])
  
  return containerRef
}

// Mouse Trail Effect Hook
export function useMouseTrail(trailLength = 20, fadeSpeed = 0.95) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; opacity: number }>>([])
  
  useEffect(() => {
    let animationFrame: number
    
    const updateTrail = () => {
      setTrail(currentTrail => 
        currentTrail
          .map(point => ({ ...point, opacity: point.opacity * fadeSpeed }))
          .filter(point => point.opacity > 0.01)
      )
      animationFrame = requestAnimationFrame(updateTrail)
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setTrail(currentTrail => [
        { x: e.clientX, y: e.clientY, opacity: 1 },
        ...currentTrail.slice(0, trailLength - 1)
      ])
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    animationFrame = requestAnimationFrame(updateTrail)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [trailLength, fadeSpeed])
  
  return trail
}

// Smooth Number Counter Hook
export function useCountUp(
  end: number,
  duration = 2000,
  start = 0,
  trigger = true
) {
  const [count, setCount] = useState(start)
  
  useEffect(() => {
    if (!trigger) return
    
    let startTime: number
    let animationFrame: number
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Eased progress for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const currentCount = start + (end - start) * easedProgress
      
      setCount(Math.floor(currentCount))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, start, trigger])
  
  return count
}

// Text Reveal Animation Hook
export function useTextReveal(text: string, trigger = true, speed = 50) {
  const [visibleText, setVisibleText] = useState('')
  
  useEffect(() => {
    if (!trigger) return
    
    let index = 0
    const interval = setInterval(() => {
      if (index <= text.length) {
        setVisibleText(text.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)
    
    return () => clearInterval(interval)
  }, [text, trigger, speed])
  
  return visibleText
}

// Performance-optimized Animation Class Generator
export function createAnimationClass(
  name: string,
  duration: keyof typeof durations,
  easing: keyof typeof easings,
  delay = 0,
  fillMode: 'none' | 'forwards' | 'backwards' | 'both' = 'both'
) {
  return {
    animation: `${name} ${durations[duration]}ms ${easings[easing]} ${delay}ms ${fillMode}`,
  }
}

// Advanced CSS-in-JS Animation Utilities
export const animations = {
  // Entrance animations
  fadeInUp: createAnimationClass('fadeInUp', 'medium2', 'emphasized'),
  fadeInDown: createAnimationClass('fadeInDown', 'medium2', 'emphasized'),
  fadeInLeft: createAnimationClass('fadeInLeft', 'medium2', 'emphasized'),
  fadeInRight: createAnimationClass('fadeInRight', 'medium2', 'emphasized'),
  
  // Scale animations
  scaleIn: createAnimationClass('scaleIn', 'short4', 'emphasized'),
  scaleOut: createAnimationClass('scaleOut', 'short4', 'emphasized'),
  
  // Rotation animations
  rotateIn: createAnimationClass('rotateIn', 'medium3', 'emphasized'),
  
  // Slide animations
  slideInUp: createAnimationClass('slideInUp', 'medium4', 'emphasized'),
  slideInDown: createAnimationClass('slideInDown', 'medium4', 'emphasized'),
  
  // Elastic animations
  bounceIn: createAnimationClass('bounceIn', 'long2', 'easeOut'),
  
  // Continuous animations
  float: {
    animation: `float ${durations.extraLong4 * 6}ms ${easings.easeInOut} infinite`,
  },
  pulse: {
    animation: `pulse ${durations.medium4 * 4}ms ${easings.easeInOut} infinite`,
  },
  glow: {
    animation: `glow ${durations.long1 * 4}ms ${easings.easeInOut} infinite alternate`,
  },
}

export default {
  easings,
  durations,
  animations,
  useMagneticInteraction,
  useParallaxScroll,
  useInViewAnimation,
  useStaggerAnimation,
  useMouseTrail,
  useCountUp,
  useTextReveal,
  createAnimationClass,
}
