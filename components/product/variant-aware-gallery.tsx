'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import { useExtendedProduct } from 'components/product/extended-product-context';
import { useUpdateURL } from 'components/product/product-context';
import { formatPrice } from 'lib/price-formatter';
import { preloadVariantImages } from 'lib/variant-image-resolver';
import Image from 'next/image';
import { useEffect } from 'react';

export function VariantAwareGallery() {
  const { 
    product, 
    currentImage, 
    currentImageIndex, 
    updateImage,
    selectedVariant 
  } = useExtendedProduct();
  const updateURL = useUpdateURL();

  const images = product?.images || [];
  const activeImage = currentImage || images[0];
  const activeIndex = currentImageIndex;

  // Preload variant images for better performance
  useEffect(() => {
    if (product) {
      preloadVariantImages(product);
    }
  }, [product]);

  const nextImageIndex = activeIndex + 1 < images.length ? activeIndex + 1 : 0;
  const previousImageIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;

  const handleImageChange = (index: number) => {
    const newState = updateImage(index.toString());
    updateURL(newState);
  };

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  if (!activeImage) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">No image available</div>
      </div>
    );
  }

  return (
    <form>
      {/* Main Image Display */}
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        <Image
          className="h-full w-full object-contain transition-opacity duration-300"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          alt={activeImage.altText || `${product?.title} - ${selectedVariant?.title || 'Product image'}`}
          src={activeImage.url}
          priority={true}
          key={activeImage.url} // Force re-render on image change
        />

        {/* Navigation Controls (only show if multiple images) */}
        {images.length > 1 && (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
              <button
                type="button"
                onClick={() => handleImageChange(previousImageIndex)}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                type="button"
                onClick={() => handleImageChange(nextImageIndex)}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Variant Indicator */}
        {selectedVariant && (
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {selectedVariant.selectedOptions.find(opt => 
              opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'farbe'
            )?.value || selectedVariant.title}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation (only show if multiple images) */}
      {images.length > 1 && (
        <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={`${image.url}-${index}`} className="h-20 w-20">
                <button
                  type="button"
                  onClick={() => handleImageChange(index)}
                  aria-label={`Select product image ${index + 1}`}
                  className="h-full w-full transition-all duration-200 hover:scale-105"
                >
                  <GridTileImage
                    alt={image.altText || `Product image ${index + 1}`}
                    src={image.url}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}

/**
 * Brutalist Gallery for the current product page design
 * Integrates with the existing clip-path design
 */
export function BrutalistVariantGallery() {
  const { 
    product, 
    currentImage, 
    selectedVariant 
  } = useExtendedProduct();

  const activeImage = currentImage || product?.featuredImage || product?.images[0];

  if (!activeImage || !product) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">No image available</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Main Background Image with Clip Path */}
      <div 
        className="w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${activeImage.url})`,
          clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)'
        }}
      />
      
      {/* Price Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-[15vw] font-black text-black opacity-5 select-none">
          {formatPrice(
            selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount,
            selectedVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode
          )}
        </div>
      </div>

      {/* Variant Color Indicator */}
      {selectedVariant && (
        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-4 py-2 font-mono text-xs uppercase tracking-wider text-black">
          {selectedVariant.selectedOptions.find(opt => 
            opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'farbe'
          )?.value || 'Standard'}
        </div>
      )}

      {/* Image Loading Indicator */}
      <div className="absolute top-8 right-8 opacity-0 transition-opacity duration-200" id="image-loading">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
