'use client'

import Link from 'next/link'

interface ProductCardProps {
  title: string
  subtitle: string
  info: string
  price: string
  accentColor: string
  href?: string
}

export default function ProductCard({
  title,
  subtitle,
  info,
  price,
  accentColor,
  href = "#"
}: ProductCardProps) {
  const CardContent = () => (
    <div className="group relative bg-white shadow-brutal hover:shadow-brutal-hover transform-hover-rotate overflow-hidden h-full">
      {/* Accent Strip with group-hover effect */}
      <div 
        className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />
      
      {/* Pseudo-element shadow via after pseudo-class utility */}
      <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
        
        {/* Product Title & Subtitle */}
        <div className="mb-4">
          <h3 
            id={`product-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-lg lg:text-xl font-bold text-secondary-500 leading-tight mb-1 group-hover:text-primary-500 transition-colors duration-300"
          >
            {title}
          </h3>
          <p className="text-sm text-secondary-500/60 font-medium">
            {subtitle}
          </p>
        </div>
        
        {/* Product Info */}
        <div className="mb-6 flex-grow">
          <p className="text-xs text-secondary-500/80 leading-relaxed line-clamp-3">
            {info}
          </p>
        </div>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div className="price">
            <span 
              className="text-xl font-bold text-secondary-500 group-hover:text-primary-500 transition-colors duration-300"
              aria-label={`Preis: ${price}`}
            >
              {price}
            </span>
          </div>
          
          <button 
            className="px-4 py-2 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 shadow-brutal hover:shadow-brutal-hover focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            style={{ 
              backgroundColor: accentColor,
              color: accentColor === '#FFD54F' ? '#003B46' : 'white'
            }}
            aria-label={`${title} bestellen für ${price}`}
          >
            Bestellen
          </button>
        </div>
        
      </div>
      
      {/* Hover Overlay with reduced motion support */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none motion-reduce:transition-none"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />
    </div>
  );

  if (href && href !== "#") {
    return (
      <Link href={href} className="block h-full">
        <article 
          className="h-full focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          role="article"
          aria-labelledby={`product-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          <CardContent />
        </article>
      </Link>
    );
  }

  return (
    <article 
      className="group relative bg-white shadow-medium hover:shadow-large transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#00BFA6] focus-within:ring-offset-2"
      role="article"
      aria-labelledby={`product-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <CardContent />
    </article>
  )
}
