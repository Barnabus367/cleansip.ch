'use client'

import { useInViewAnimation, useStaggerAnimation } from '../lib/animations';
import { Container, Grid, Section } from '../lib/layout';
import { ProductCard } from './ui/product-card';

interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: string;
  accentColor: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText: string;
  };
}

interface ProductsSectionProps {
  featuredProducts: Product[];
}

export default function ProductsSection({ featuredProducts }: ProductsSectionProps) {
  const { elementRef: sectionRef, isInView } = useInViewAnimation(0.1, true, '-50px')
  const staggerRef = useStaggerAnimation<HTMLDivElement>(150, isInView)
  
  return (
    <Section 
      ref={sectionRef}
      id="products" 
      className="relative bg-white overflow-hidden py-20 lg:py-32"
    >
      <Container>
        {/* Section Header */}
        <div className="mb-12 lg:mb-20 text-center">
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px bg-primary-500 w-12"></div>
              <span className="text-body-sm font-medium text-primary-600 uppercase tracking-wider">
                Unsere Produkte
              </span>
              <div className="h-px bg-primary-500 w-12"></div>
            </div>
            
            <h2 className="text-display-sm lg:text-display-md font-black text-secondary-800 mb-6">
              <span className="text-primary-600">PREMIUM</span> STROHHALME<br />
              <span className="text-accent-500">FÜR JEDEN BEDARF</span>
            </h2>
            
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Von Standard bis Deluxe - entdecken Sie unsere Auswahl an stabilen, 
              BPA-freien Strohhalmen für jeden Anlass.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div ref={staggerRef}>
          <Grid 
            cols={3} 
            gap="lg" 
            className="mb-16"
          >
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                title={product.title}
                subtitle={product.subtitle}
                description={product.description}
                price={product.price}
                href={`/product/${product.handle}`}
                image={product.featuredImage ? {
                  src: product.featuredImage.url,
                  alt: product.featuredImage.altText
                } : undefined}
                badge={{
                  text: 'Bestseller',
                  variant: 'primary'
                }}
                rating={5}
                reviews={127}
                animateOnView={true}
                magneticEffect={true}
                delay={index * 100}
                variant="elevated"
                onAddToCart={() => {
                  console.log(`Adding ${product.title} to cart`)
                }}
              />
            ))}
          </Grid>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className={`transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-body-lg text-gray-600 mb-8">
              Nicht das Richtige dabei? Entdecken Sie unsere komplette Auswahl.
            </p>
            <a
              href="/search"
              className="inline-flex items-center gap-3 bg-secondary-800 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Alle Produkte ansehen
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}
