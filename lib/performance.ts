/**
 * Performance and Accessibility Checker for CleanSip
 * This script validates our pixel-perfect UI meets the requirements:
 * - Lighthouse Mobile + Desktop > 90
 * - A11y score ≥ 95
 * - CLS < 0.1
 * - LCP < 2.5s
 */

export interface PerformanceTargets {
  lighthouse: {
    mobile: number;
    desktop: number;
  };
  accessibility: number;
  cls: number;
  lcp: number;
}

export const PERFORMANCE_TARGETS: PerformanceTargets = {
  lighthouse: {
    mobile: 90,
    desktop: 90
  },
  accessibility: 95,
  cls: 0.1,
  lcp: 2.5
};

export function validatePerformance(metrics: any) {
  const results = {
    lighthouse: {
      mobile: metrics.lighthouseMobile >= PERFORMANCE_TARGETS.lighthouse.mobile,
      desktop: metrics.lighthouseDesktop >= PERFORMANCE_TARGETS.lighthouse.desktop
    },
    accessibility: metrics.accessibility >= PERFORMANCE_TARGETS.accessibility,
    cls: metrics.cls < PERFORMANCE_TARGETS.cls,
    lcp: metrics.lcp < PERFORMANCE_TARGETS.lcp
  };

  const allPassed = Object.values(results).every(result => 
    typeof result === 'boolean' ? result : Object.values(result).every(Boolean)
  );

  return {
    passed: allPassed,
    results,
    targets: PERFORMANCE_TARGETS
  };
}

export function logPerformanceReport(validation: ReturnType<typeof validatePerformance>) {
  console.log('🎯 CleanSip Performance Report');
  console.log('================================');
  
  if (validation.passed) {
    console.log('✅ All performance targets met!');
  } else {
    console.log('❌ Some targets need improvement:');
  }
  
  console.log('\n📊 Detailed Results:');
  console.log(`Lighthouse Mobile: ${validation.results.lighthouse.mobile ? '✅' : '❌'}`);
  console.log(`Lighthouse Desktop: ${validation.results.lighthouse.desktop ? '✅' : '❌'}`);
  console.log(`Accessibility: ${validation.results.accessibility ? '✅' : '❌'}`);
  console.log(`CLS: ${validation.results.cls ? '✅' : '❌'}`);
  console.log(`LCP: ${validation.results.lcp ? '✅' : '❌'}`);
}
