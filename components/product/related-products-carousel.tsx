'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface RelatedProductsCarouselProps {
  products: Product[];
}

export function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, products.length - 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, products.length - 3)) % Math.max(1, products.length - 3));
  };

  if (!products.length) return null;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-secondary mb-2">
            Das könnte dir auch gefallen
          </h2>
          <p className="text-gray-600">
            Entdecke weitere Premium-Produkte aus unserem Sortiment
          </p>
        </div>

        {/* Navigation Buttons */}
        {products.length > 4 && (
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Products Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentSlide * (100 / Math.min(4, products.length))}%)`,
            width: `${(products.length / Math.min(4, products.length)) * 100}%`
          }}
        >
          {products.map((product, index) => (
            <div 
              key={product.handle}
              className="flex-shrink-0 group"
              style={{ width: `${100 / products.length}%` }}
            >
              <Link
                href={`/product/${product.handle}`}
                className="block"
                prefetch={true}
              >
                {/* Product Card */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                    <Image
                      src={product.featuredImage?.url || '/placeholder-straw.jpg'}
                      alt={product.title}
                      fill
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Quick View Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ansehen
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-semibold text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="bg-gradient-to-r from-primary to-primary-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
                        CHF {product.priceRange.minVariantPrice.amount}
                      </div>
                      
                      {/* Quick Add Button */}
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary-600">
                        Hinzufügen
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {products.length > 4 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: Math.max(1, products.length - 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* View All Products Link */}
      <div className="text-center">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
        >
          Alle Produkte anzeigen
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
