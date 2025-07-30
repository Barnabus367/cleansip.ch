/**
 * Performance Configuration
 * Central configuration for performance monitoring and optimization
 */

export const PERFORMANCE_CONFIG = {
  // Monitoring settings
  monitoring: {
    enabled: process.env.NODE_ENV === 'development',
    sampleSize: 60, // Number of frames to sample for FPS calculation
    reportInterval: 5000, // Report metrics every 5 seconds
    
    // Component-specific settings
    components: {
      HeroSection: {
        sampleSize: 120, // Higher sample size for critical component
        reportInterval: 3000
      },
      ProductsSection: {
        sampleSize: 60,
        reportInterval: 5000
      }
    }
  },

  // Performance thresholds
  thresholds: {
    // Frame rate targets
    fps: {
      target: 60,
      warning: 55,
      critical: 45
    },
    
    // Frame timing
    frameTime: {
      target: 16.67, // 60fps = 16.67ms per frame
      warning: 18, // ~55fps
      critical: 22 // ~45fps
    },
    
    // Core Web Vitals (Google recommendations)
    webVitals: {
      lcp: {
        good: 2500,
        needsImprovement: 4000
      },
      fid: {
        good: 100,
        needsImprovement: 300
      },
      cls: {
        good: 0.1,
        needsImprovement: 0.25
      },
      fcp: {
        good: 1800,
        needsImprovement: 3000
      },
      ttfb: {
        good: 800,
        needsImprovement: 1800
      }
    }
  },

  // Optimization settings
  optimization: {
    // Image optimization
    images: {
      quality: 85,
      formats: ['avif', 'webp'],
      sizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      lazy: true,
      placeholder: 'blur'
    },
    
    // Bundle optimization
    bundle: {
      splitting: true,
      minify: true,
      compression: 'gzip',
      treeshaking: true
    },
    
    // Caching strategy
    cache: {
      staticAssets: '1y',
      images: '1y',
      api: '1h',
      pages: '1d'
    }
  },

  // Feature flags for performance features
  features: {
    preload: {
      criticalResources: true,
      fonts: true,
      heroImages: true
    },
    
    prefetch: {
      nextPage: true,
      relatedProducts: true,
      criticalRoutes: ['/product', '/search', '/cart']
    },
    
    defer: {
      nonCriticalJs: true,
      analytics: true,
      socialWidgets: true
    }
  },

  // Development tools
  dev: {
    dashboard: {
      enabled: true,
      hotkey: 'Ctrl+Shift+P',
      position: 'bottom-right',
      minimized: false
    },
    
    logging: {
      performance: true,
      webVitals: true,
      errors: true,
      verbose: false
    },
    
    profiling: {
      react: false, // React DevTools Profiler
      memory: false,
      network: false
    }
  }
} as const

// Type definitions for configuration
export type PerformanceConfig = typeof PERFORMANCE_CONFIG
export type ComponentName = keyof PerformanceConfig['monitoring']['components']
export type WebVitalName = keyof PerformanceConfig['thresholds']['webVitals']

// Helper functions
export const getComponentConfig = (componentName: string) => {
  return PERFORMANCE_CONFIG.monitoring.components[componentName as ComponentName] || {
    sampleSize: PERFORMANCE_CONFIG.monitoring.sampleSize,
    reportInterval: PERFORMANCE_CONFIG.monitoring.reportInterval
  }
}

export const getWebVitalThreshold = (metric: WebVitalName, level: 'good' | 'needsImprovement') => {
  return PERFORMANCE_CONFIG.thresholds.webVitals[metric][level]
}

export const isPerformanceMonitoringEnabled = () => {
  return PERFORMANCE_CONFIG.monitoring.enabled
}

// Performance budget warnings
export const PERFORMANCE_BUDGET = {
  // Bundle sizes (gzipped)
  javascript: {
    initial: 200, // KB
    route: 50,    // KB per route
    vendor: 150   // KB for third-party libs
  },
  
  // CSS
  css: {
    critical: 50,  // KB inline critical CSS
    total: 100     // KB total CSS
  },
  
  // Images
  images: {
    hero: 500,     // KB for hero images
    product: 100,  // KB for product images
    icon: 10       // KB for icons
  },
  
  // Network
  requests: {
    initial: 15,   // Number of requests for initial load
    total: 50      // Total requests per page
  }
} as const
