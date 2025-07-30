'use client'

import { useEffect, useState } from 'react'
import { usePerformanceMetrics } from '../../hooks/use-performance-monitor'

/**
 * Performance Dashboard Component
 * Development tool for monitoring performance metrics in real-time
 */
export default function PerformanceDashboard() {
  const { metrics, refreshMetrics, resetMetrics } = usePerformanceMetrics()
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  // Show only in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development')
  }, [])

  // Keyboard shortcut to toggle dashboard (Ctrl/Cmd + Shift + P)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault()
        setIsMinimized(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (!isVisible) return null

  const formatValue = (value: number | undefined, unit: string = 'ms', decimals: number = 1): string => {
    return value !== undefined ? `${value.toFixed(decimals)}${unit}` : 'N/A'
  }

  const getStatusColor = (value: number | undefined, threshold: number, invert: boolean = false): string => {
    if (value === undefined) return 'text-gray-400'
    const isGood = invert ? value < threshold : value > threshold
    return isGood ? 'text-green-500' : 'text-red-500'
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMinimized 
        ? 'bottom-4 right-4 w-16 h-16' 
        : 'bottom-4 right-4 w-80 max-h-96'
    }`}>
      <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl text-white text-xs">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {!isMinimized && <span className="font-medium">Performance</span>}
          </div>
          <div className="flex gap-1">
            {!isMinimized && (
              <>
                <button
                  onClick={refreshMetrics}
                  className="px-2 py-1 hover:bg-white/10 rounded text-xs"
                  title="Refresh metrics"
                >
                  ↻
                </button>
                <button
                  onClick={resetMetrics}
                  className="px-2 py-1 hover:bg-white/10 rounded text-xs"
                  title="Reset metrics"
                >
                  ×
                </button>
              </>
            )}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="px-2 py-1 hover:bg-white/10 rounded text-xs"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? '□' : '−'}
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="p-3 space-y-3 max-h-80 overflow-y-auto">
            {/* Web Vitals */}
            <div>
              <h4 className="font-medium text-blue-400 mb-2">Core Web Vitals</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>LCP:</span>
                  <span className={getStatusColor(metrics.webVitals.lcp, 2500)}>
                    {formatValue(metrics.webVitals.lcp)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>FID:</span>
                  <span className={getStatusColor(metrics.webVitals.fid, 100)}>
                    {formatValue(metrics.webVitals.fid)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>CLS:</span>
                  <span className={getStatusColor(metrics.webVitals.cls, 0.1)}>
                    {formatValue(metrics.webVitals.cls, '', 3)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>FCP:</span>
                  <span className={getStatusColor(metrics.webVitals.fcp, 1800)}>
                    {formatValue(metrics.webVitals.fcp)}
                  </span>
                </div>
              </div>
            </div>

            {/* Component Metrics */}
            {metrics.components.size > 0 && (
              <div>
                <h4 className="font-medium text-purple-400 mb-2">Component Performance</h4>
                <div className="space-y-2">
                  {Array.from(metrics.components.entries()).map(([name, componentMetrics]) => {
                    return (
                      <div key={name} className="bg-white/5 rounded p-2">
                        <div className="font-medium text-yellow-400 mb-1">{name}</div>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className="flex justify-between">
                            <span>FPS:</span>
                            <span className={getStatusColor(componentMetrics.fps, 55, true)}>
                              {formatValue(componentMetrics.fps, '', 1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg:</span>
                            <span>{formatValue(componentMetrics.avgFrameTime)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Worst:</span>
                            <span className={getStatusColor(componentMetrics.worstFrameTime, 16.67)}>
                              {formatValue(componentMetrics.worstFrameTime)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Jank:</span>
                            <span className={componentMetrics.jankFrames > 0 ? 'text-red-500' : 'text-green-500'}>
                              {componentMetrics.jankFrames}/{componentMetrics.totalFrames}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="text-xs text-gray-400 border-t border-white/10 pt-2">
              <div>Press Ctrl+Shift+P to toggle</div>
              <div>Green = Good, Red = Needs improvement</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
