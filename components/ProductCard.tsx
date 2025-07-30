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
    <>
      {/* Accent Strip */}
      <div 
        className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="p-6 lg:p-8 relative">
        
        {/* Product Title & Subtitle */}
        <div className="mb-4">
          <h3 
            id={`product-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-lg lg:text-xl font-bold text-[#003B46] leading-tight mb-1"
          >
            {title}
          </h3>
          <p className="text-sm text-[#003B46]/60 font-medium">
            {subtitle}
          </p>
        </div>
        
        {/* Product Info */}
        <div className="mb-6">
          <p className="text-xs text-[#003B46]/80 leading-relaxed line-clamp-3">
            {info}
          </p>
        </div>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div className="price">
            <span 
              className="text-xl font-bold text-[#003B46]"
              aria-label={`Preis: ${price}`}
            >
              {price}
            </span>
          </div>
          
          <button 
            className="bg-[#003B46] text-white px-4 py-2 text-xs tracking-[0.1em] uppercase font-medium hover:opacity-90 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-current transition-all duration-200"
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
    </>
  );

  if (href && href !== "#") {
    return (
      <Link href={href}>
        <article 
          className="group relative bg-white shadow-medium hover:shadow-large transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#00BFA6] focus-within:ring-offset-2 cursor-pointer"
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
