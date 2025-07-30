'use client';

import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';

interface PremiumProductGalleryProps {
  images: { src: string; altText: string }[];
}

export function PremiumProductGallery({ images }: PremiumProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxImage(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxImage((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) return null;

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-6">
        {/* Main Product Image with Zoom */}
        <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100 group">
          <div 
            className="relative w-full h-full cursor-zoom-in overflow-hidden"
            onClick={() => openLightbox(currentImage)}
          >
            <Image
              src={images[currentImage]?.src || ''}
              alt={images[currentImage]?.altText || 'Product image'}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-110"
              priority
            />
            
            {/* Zoom Indicator */}
            <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>

          {/* Navigation Arrows for Main Image */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  index === currentImage
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.altText || `Product thumbnail ${index + 1}`}
                  fill
                  className="object-contain bg-white"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-colors z-10"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Main Lightbox Image */}
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={images[lightboxImage]?.src || ''}
              alt={images[lightboxImage]?.altText || 'Product image'}
              width={800}
              height={800}
              className="object-contain max-w-full max-h-full"
            />
          </div>

          {/* Navigation in Lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevLightboxImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={nextLightboxImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
            {lightboxImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
