import { Inter } from 'next/font/google'

/**
 * Inter Variable Font Configuration
 * Optimized for CleanSip Design System with optical sizing
 */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  // Enable optical sizing for better readability
  axes: ['opsz'],
  // Preload critical font weights
  preload: true,
  // Use variable weight for optical sizing
  weight: 'variable',
  // Enable font-feature-settings for better typography
  fallback: ['system-ui', 'arial']
})

/**
 * Font CSS Variables for consistent usage
 * Use these in your Tailwind config and components
 */
export const fontVariables = {
  '--font-sans': inter.style.fontFamily,
  '--font-display': inter.style.fontFamily,
  '--font-body': inter.style.fontFamily,
} as const

/**
 * Typography Scale with optical sizing
 * Responsive font sizes with proper line heights and letter spacing
 */
export const typographyScale = {
  'display-2xl': {
    fontSize: '4.5rem', // 72px
    lineHeight: '1.1',
    letterSpacing: '-0.025em',
    fontWeight: '800',
  },
  'display-xl': {
    fontSize: '3.75rem', // 60px
    lineHeight: '1.1',
    letterSpacing: '-0.025em',
    fontWeight: '800',
  },
  'display-lg': {
    fontSize: '3rem', // 48px
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    fontWeight: '700',
  },
  'display-md': {
    fontSize: '2.25rem', // 36px
    lineHeight: '1.25',
    letterSpacing: '-0.02em',
    fontWeight: '700',
  },
  'display-sm': {
    fontSize: '1.875rem', // 30px
    lineHeight: '1.3',
    letterSpacing: '-0.015em',
    fontWeight: '600',
  },
  'heading-xl': {
    fontSize: '1.5rem', // 24px
    lineHeight: '1.35',
    letterSpacing: '-0.01em',
    fontWeight: '600',
  },
  'heading-lg': {
    fontSize: '1.25rem', // 20px
    lineHeight: '1.4',
    letterSpacing: '-0.005em',
    fontWeight: '600',
  },
  'heading-md': {
    fontSize: '1.125rem', // 18px
    lineHeight: '1.45',
    letterSpacing: '0',
    fontWeight: '600',
  },
  'heading-sm': {
    fontSize: '1rem', // 16px
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '600',
  },
  'body-xl': {
    fontSize: '1.25rem', // 20px
    lineHeight: '1.6',
    letterSpacing: '0',
    fontWeight: '400',
  },
  'body-lg': {
    fontSize: '1.125rem', // 18px
    lineHeight: '1.6',
    letterSpacing: '0',
    fontWeight: '400',
  },
  'body-md': {
    fontSize: '1rem', // 16px
    lineHeight: '1.6',
    letterSpacing: '0',
    fontWeight: '400',
  },
  'body-sm': {
    fontSize: '0.875rem', // 14px
    lineHeight: '1.55',
    letterSpacing: '0.01em',
    fontWeight: '400',
  },
  'body-xs': {
    fontSize: '0.75rem', // 12px
    lineHeight: '1.5',
    letterSpacing: '0.02em',
    fontWeight: '400',
  },
} as const

/**
 * Responsive Typography Classes
 * Mobile-first responsive typography
 */
export const responsiveTypography = {
  'hero': 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
  'title': 'text-2xl md:text-3xl lg:text-4xl',
  'subtitle': 'text-lg md:text-xl lg:text-2xl',
  'body': 'text-base md:text-lg',
  'caption': 'text-sm md:text-base',
} as const
