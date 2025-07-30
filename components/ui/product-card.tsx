'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import * as React from 'react'
import { useInViewAnimation, useMagneticInteraction } from '../../lib/animations'
import { cn } from '../../lib/utils'

/**
 * ProductCard Component
 * Premium product card with CleanSip branding and advanced animations
 */
const productCardVariants = cva(
  'group relative overflow-hidden transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg',
        elevated: 'bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-xl',
        brutal: 'bg-white border-2 border-black rounded-lg shadow-brutal hover:shadow-brutal-hover',
        glass: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg hover:bg-white/20',
        minimal: 'bg-transparent border-none rounded-lg hover:bg-gray-50',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      animation: {
        none: '',
        hover: 'hover:scale-[1.02] active:scale-[0.98]',
        magnetic: '', // Applied via hook
        float: 'animate-float',
      }
    },
    defaultVariants: {
      variant: 'elevated',
      size: 'md',
      animation: 'hover',
    },
  }
)

export interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productCardVariants> {
  // Product data
  title: string
  subtitle?: string
  price?: string
  originalPrice?: string
  description?: string
  
  // Visual elements
  image?: {
    src: string
    alt: string
  }
  badge?: {
    text: string
    variant?: 'success' | 'warning' | 'error' | 'info' | 'primary'
  }
  rating?: number
  reviews?: number
  
  // Interaction
  href?: string
  onAddToCart?: () => void
  onQuickView?: () => void
  
  // Animation options
  animateOnView?: boolean
  magneticEffect?: boolean
  delay?: number
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ 
    className,
    variant,
    size,
    animation,
    title,
    subtitle,
    price,
    originalPrice,
    description,
    image,
    badge,
    rating,
    reviews,
    href,
    onAddToCart,
    onQuickView,
    animateOnView = true,
    magneticEffect = false,
    delay = 0,
    ...props 
  }, ref) => {
    // Animation hooks
    const { elementRef: magneticRef, isHovered } = useMagneticInteraction(0.15)
    const { elementRef: viewRef, isInView } = useInViewAnimation(0.1, true, '-10px')
    
    // Combine refs
    const combinedRef = React.useCallback((node: HTMLDivElement | null) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(node)
        } else {
          ref.current = node
        }
      }
      if (magneticEffect && magneticRef) {
        magneticRef.current = node
      }
      if (viewRef) {
        viewRef.current = node
      }
    }, [ref, magneticRef, viewRef, magneticEffect])
    
    // Badge styling
    const badgeVariants = {
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-black',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
      primary: 'bg-primary-500 text-white',
    }
    
    const cardContent = (
      <div
        ref={combinedRef}
        className={cn(
          productCardVariants({ variant, size, animation: magneticEffect ? 'none' : animation }),
          animateOnView && isInView && 'animate-fade-in-up',
          className
        )}
        style={{
          animationDelay: animateOnView ? `${delay}ms` : undefined,
        }}
        {...props}
      >
        {/* Product Image */}
        {image && (
          <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
            <img 
              src={image.src} 
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Image Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            
            {/* Badge */}
            {badge && (
              <div className={cn(
                'absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded-full border-2 border-white shadow-lg',
                badgeVariants[badge.variant || 'primary']
              )}>
                {badge.text}
              </div>
            )}
            
            {/* Quick View Button */}
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onQuickView()
                }}
                className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-white border-2 border-gray-200 hover:border-primary-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                aria-label="Quick View"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Product Content */}
        <div className="space-y-3">
          {/* Subtitle */}
          {subtitle && (
            <p className="text-body-xs text-gray-500 uppercase tracking-wider font-medium">
              {subtitle}
            </p>
          )}
          
          {/* Title */}
          <h3 className="text-heading-sm font-semibold text-secondary-800 group-hover:text-primary-600 transition-colors line-clamp-2">
            {title}
          </h3>
          
          {/* Description */}
          {description && (
            <p className="text-body-sm text-gray-600 line-clamp-2">
              {description}
            </p>
          )}

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < rating ? 'text-yellow-400' : 'text-gray-200'
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {reviews && (
                <span className="text-body-xs text-gray-500">
                  ({reviews} Bewertungen)
                </span>
              )}
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {price && (
                <span className="text-heading-sm font-bold text-secondary-800">
                  {price}
                </span>
              )}
              {originalPrice && (
                <span className="text-body-sm text-gray-500 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
            
            {onAddToCart && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onAddToCart()
                }}
                className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white px-4 py-2 rounded-lg text-body-sm font-medium transition-colors duration-200 transform hover:scale-105 active:scale-95"
              >
                In den Warenkorb
              </button>
            )}
          </div>
        </div>

        {/* Floating Elements for Enhanced Visual Appeal */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-500 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-pulse" />
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-accent-500 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 animate-ping" />
      </div>
    )

    // Wrap in link if href is provided
    if (href) {
      return (
        <Link href={href} className="block">
          {cardContent}
        </Link>
      )
    }

    return cardContent
  }
)

ProductCard.displayName = 'ProductCard'

export { ProductCard, productCardVariants }
