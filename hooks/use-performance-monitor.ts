'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
    getComponentConfig,
    isPerformanceMonitoringEnabled,
    PERFORMANCE_CONFIG
} from '../lib/performance-config'

// Performance monitoring types
interface PerformanceMetrics {
  fps: number
  avgFrameTime: number
  worstFrameTime: number
  jankFrames: number
  totalFrames: number
}

interface WebVitalsMetrics {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
}

// Default performance thresholds from configuration
const DEFAULT_THRESHOLDS = PERFORMANCE_CONFIG.thresholds

// Performance logger utility
class PerformanceLogger {
  private static instance: PerformanceLogger
  private metrics: Map<string, PerformanceMetrics> = new Map()
  private webVitals: WebVitalsMetrics = {}
  
  static getInstance(): PerformanceLogger {
    if (!PerformanceLogger.instance) {
      PerformanceLogger.instance = new PerformanceLogger()
    }
    return PerformanceLogger.instance
  }
  
  logMetrics(componentName: string, metrics: PerformanceMetrics): void {
    this.metrics.set(componentName, metrics)
    
    if (process.env.NODE_ENV === 'development') {
      if (metrics.fps < DEFAULT_THRESHOLDS.fps.warning) {
        console.group(`🐌 Performance Warning: ${componentName}`)
        console.warn(`FPS: ${metrics.fps.toFixed(1)} (target: ${DEFAULT_THRESHOLDS.fps.target})`)
        console.warn(`Avg frame time: ${metrics.avgFrameTime.toFixed(2)}ms`)
        console.warn(`Worst frame: ${metrics.worstFrameTime.toFixed(2)}ms`)
        console.warn(`Jank frames: ${metrics.jankFrames}/${metrics.totalFrames}`)
        console.groupEnd()
      } else {
        console.log(`✅ ${componentName}: ${metrics.fps.toFixed(1)}fps`)
      }
    }
  }
  
  logWebVital(metric: keyof WebVitalsMetrics, value: number): void {
    this.webVitals[metric] = value
    
    if (process.env.NODE_ENV === 'development') {
      const webVitalThreshold = DEFAULT_THRESHOLDS.webVitals[metric]
      const threshold = webVitalThreshold ? webVitalThreshold.good : undefined
      const status = threshold && value > threshold ? '🚨' : '✅'
      console.log(`${status} ${metric.toUpperCase()}: ${value.toFixed(metric === 'cls' ? 3 : 1)}${metric === 'cls' ? '' : 'ms'}`)
    }
  }
  
  getMetrics(): { components: Map<string, PerformanceMetrics>; webVitals: WebVitalsMetrics } {
    return {
      components: new Map(this.metrics),
      webVitals: { ...this.webVitals }
    }
  }
  
  reset(): void {
    this.metrics.clear()
    this.webVitals = {}
  }
}

/**
 * Enhanced Performance Monitor Hook
 * Monitors animation performance with detailed metrics and intelligent reporting
 */
export function usePerformanceMonitor(
  componentName: string,
  options?: {
    sampleSize?: number
    reportInterval?: number
    disabled?: boolean
  }
) {
  // Get component-specific configuration
  const componentConfig = getComponentConfig(componentName)
  const {
    sampleSize = componentConfig.sampleSize,
    reportInterval = componentConfig.reportInterval,
    disabled = !isPerformanceMonitoringEnabled()
  } = options || {}

  const frameTimesRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef<number>(0)
  const animationIdRef = useRef<number>(0)
  const lastReportTimeRef = useRef<number>(0)
  const jankFramesRef = useRef<number>(0)
  const totalFramesRef = useRef<number>(0)
  const worstFrameTimeRef = useRef<number>(0)
  const loggerRef = useRef<PerformanceLogger | null>(null)

  const reportMetrics = useCallback(() => {
    const frameTimes = frameTimesRef.current
    if (frameTimes.length === 0) return

    const avgFrameTime = frameTimes.reduce((sum, time) => sum + time, 0) / frameTimes.length
    const fps = 1000 / avgFrameTime
    
    const metrics: PerformanceMetrics = {
      fps,
      avgFrameTime,
      worstFrameTime: worstFrameTimeRef.current,
      jankFrames: jankFramesRef.current,
      totalFrames: totalFramesRef.current
    }

    if (!loggerRef.current) {
      loggerRef.current = PerformanceLogger.getInstance()
    }
    
    loggerRef.current.logMetrics(componentName, metrics)
    
    // Reset counters for next interval
    jankFramesRef.current = 0
    totalFramesRef.current = 0
    worstFrameTimeRef.current = 0
  }, [componentName])

  const measureFrame = useCallback((timestamp: number) => {
    if (disabled) return

    if (lastFrameTimeRef.current > 0) {
      const frameTime = timestamp - lastFrameTimeRef.current
      frameTimesRef.current.push(frameTime)
      totalFramesRef.current += 1
      
      // Track jank frames (> target frame time)
      if (frameTime > DEFAULT_THRESHOLDS.frameTime.target) {
        jankFramesRef.current += 1
      }
      
      // Track worst frame time
      if (frameTime > worstFrameTimeRef.current) {
        worstFrameTimeRef.current = frameTime
      }
      
      // Keep only the last N frame times for rolling average
      if (frameTimesRef.current.length > sampleSize) {
        frameTimesRef.current.shift()
      }
      
      // Report metrics at specified intervals
      if (timestamp - lastReportTimeRef.current >= reportInterval) {
        reportMetrics()
        lastReportTimeRef.current = timestamp
      }
    }
    
    lastFrameTimeRef.current = timestamp
    animationIdRef.current = requestAnimationFrame(measureFrame)
  }, [disabled, sampleSize, reportInterval, reportMetrics])

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return

    // Start monitoring
    animationIdRef.current = requestAnimationFrame(measureFrame)
    lastReportTimeRef.current = performance.now()
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      
      // Final report on cleanup
      reportMetrics()
    }
  }, [measureFrame, disabled, reportMetrics])

  // Return current metrics for external use
  const getCurrentMetrics = useCallback((): PerformanceMetrics | null => {
    const frameTimes = frameTimesRef.current
    if (frameTimes.length === 0) return null

    const avgFrameTime = frameTimes.reduce((sum, time) => sum + time, 0) / frameTimes.length
    const fps = 1000 / avgFrameTime
    
    return {
      fps,
      avgFrameTime,
      worstFrameTime: worstFrameTimeRef.current,
      jankFrames: jankFramesRef.current,
      totalFrames: totalFramesRef.current
    }
  }, [])

  return { getCurrentMetrics }
}

/**
 * Enhanced Core Web Vitals Monitor Hook
 * Monitors Core Web Vitals with proper TypeScript types and error handling
 */
export function useCoreWebVitals(options?: { disabled?: boolean }) {
  const { disabled = false } = options || {}
  const [webVitals, setWebVitals] = useState<WebVitalsMetrics>({})
  const loggerRef = useRef<PerformanceLogger | null>(null)

  const logWebVital = useCallback((metric: keyof WebVitalsMetrics, value: number) => {
    if (!loggerRef.current) {
      loggerRef.current = PerformanceLogger.getInstance()
    }
    
    loggerRef.current.logWebVital(metric, value)
    setWebVitals(prev => ({ ...prev, [metric]: value }))
  }, [])

  useEffect(() => {
    if (disabled || typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    const observers: PerformanceObserver[] = []

    try {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry && lastEntry.entryType === 'largest-contentful-paint') {
          logWebVital('lcp', lastEntry.startTime)
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      observers.push(lcpObserver)

      // Monitor First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
        if (fcpEntry) {
          logWebVital('fcp', fcpEntry.startTime)
        }
      })
      fcpObserver.observe({ entryTypes: ['paint'] })
      observers.push(fcpObserver)

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any
          if (layoutShiftEntry.hadRecentInput !== true) {
            clsValue += layoutShiftEntry.value || 0
            logWebVital('cls', clsValue)
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      observers.push(clsObserver)

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const firstInputEntry = entry as any
          if (firstInputEntry.processingStart && firstInputEntry.startTime) {
            const fid = firstInputEntry.processingStart - firstInputEntry.startTime
            logWebVital('fid', fid)
          }
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      observers.push(fidObserver)

      // Monitor Time to First Byte (TTFB) using Navigation Timing API
      if ('performance' in window && 'timing' in performance) {
        const navigationTiming = performance.timing as any
        if (navigationTiming.responseStart && navigationTiming.fetchStart) {
          const ttfb = navigationTiming.responseStart - navigationTiming.fetchStart
          logWebVital('ttfb', ttfb)
        }
      }

    } catch (error) {
      console.warn('Failed to initialize Core Web Vitals monitoring:', error)
    }

    return () => {
      observers.forEach(observer => {
        try {
          observer.disconnect()
        } catch (error) {
          console.warn('Failed to disconnect performance observer:', error)
        }
      })
    }
  }, [disabled, logWebVital])

  return { webVitals }
}

/**
 * Performance Context Hook
 * Provides access to global performance metrics
 */
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<{
    components: Map<string, PerformanceMetrics>
    webVitals: WebVitalsMetrics
  }>({
    components: new Map(),
    webVitals: {}
  })

  const refreshMetrics = useCallback(() => {
    const logger = PerformanceLogger.getInstance()
    setMetrics(logger.getMetrics())
  }, [])

  const resetMetrics = useCallback(() => {
    const logger = PerformanceLogger.getInstance()
    logger.reset()
    setMetrics({
      components: new Map(),
      webVitals: {}
    })
  }, [])

  useEffect(() => {
    // Refresh metrics every 10 seconds in development
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(refreshMetrics, 10000)
      return () => clearInterval(interval)
    }
  }, [refreshMetrics])

  return {
    metrics,
    refreshMetrics,
    resetMetrics
  }
}
