'use client'

import { useCoreWebVitals } from '../../hooks/use-performance-monitor'
import PerformanceDashboard from './PerformanceDashboard'

/**
 * Performance Provider Component
 * Initializes performance monitoring and renders dashboard in development
 */
export default function PerformanceProvider() {
  // Initialize Core Web Vitals monitoring
  useCoreWebVitals({ disabled: process.env.NODE_ENV !== 'development' })

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return <PerformanceDashboard />
}
