'use client';

import type { Image, Product, ProductVariant } from 'lib/shopify/types';
import { getImageForVariant, getImageIndexForVariant } from 'lib/variant-image-resolver';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useMemo, useOptimistic, useState } from 'react';

type ProductState = {
  [key: string]: string;
} & {
  image?: string;
  variant?: string;
};

type ExtendedProductContextType = {
  state: ProductState;
  product: Product | null;
  selectedVariant: ProductVariant | null;
  currentImage: Image | null;
  currentImageIndex: number;
  updateOption: (name: string, value: string) => ProductState;
  updateImage: (index: string) => ProductState;
  updateVariant: (variant: ProductVariant) => void;
  findVariantByOptions: (options: Record<string, string>) => ProductVariant | null;
};

const ExtendedProductContext = createContext<ExtendedProductContextType | undefined>(undefined);

export function ExtendedProductProvider({ 
  product, 
  children 
}: { 
  product: Product;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update
    })
  );

  // Find variant based on current selected options
  const findVariantByOptions = (options: Record<string, string>): ProductVariant | null => {
    return product.variants.find(variant =>
      variant.selectedOptions.every(option =>
        options[option.name.toLowerCase()] === option.value
      )
    ) || null;
  };

  // Update variant and automatically sync image
  const updateVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    
    // Update state with variant options
    const newState: Record<string, string> = { variant: variant.id };
    variant.selectedOptions.forEach(option => {
      newState[option.name.toLowerCase()] = option.value;
    });
    
    setOptimisticState(newState);
  };

  // Update option and find matching variant
  const updateOption = (name: string, value: string) => {
    const newState = { [name]: value };
    setOptimisticState(newState);
    
    // Find matching variant with new options
    const currentOptions = { ...state, ...newState };
    const matchingVariant = findVariantByOptions(currentOptions);
    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    }
    
    return { ...state, ...newState };
  };

  const updateImage = (index: string) => {
    const imageIndex = parseInt(index, 10);
    if (imageIndex >= 0 && imageIndex < product.images.length) {
      setCurrentImage(product.images[imageIndex] || null);
      setCurrentImageIndex(imageIndex);
      const newState = { image: index };
      setOptimisticState(newState);
      return { ...state, ...newState };
    }
    return state;
  };

  // Auto-sync image when variant changes
  useEffect(() => {
    if (selectedVariant) {
      const variantImage = getImageForVariant(selectedVariant, product);
      const imageIndex = getImageIndexForVariant(selectedVariant, product);
      
      setCurrentImage(variantImage);
      setCurrentImageIndex(imageIndex);
      
      // Update URL state
      const newImageState = { image: imageIndex.toString() };
      setOptimisticState(newImageState);
    } else {
      // Fallback to featured image or first image
      const fallbackImage = product.featuredImage || product.images[0] || null;
      setCurrentImage(fallbackImage);
      setCurrentImageIndex(0);
    }
  }, [selectedVariant, product]);

  // Initialize with URL parameters
  useEffect(() => {
    const initialVariant = findVariantByOptions(state);
    if (initialVariant) {
      setSelectedVariant(initialVariant);
    }
    
    // Set initial image from URL or default
    const imageParam = state.image;
    if (imageParam) {
      const imageIndex = parseInt(imageParam, 10);
      if (imageIndex >= 0 && imageIndex < product.images.length) {
        setCurrentImage(product.images[imageIndex] || null);
        setCurrentImageIndex(imageIndex);
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      state,
      product,
      selectedVariant,
      currentImage,
      currentImageIndex,
      updateOption,
      updateImage,
      updateVariant,
      findVariantByOptions
    }),
    [state, product, selectedVariant, currentImage, currentImageIndex]
  );

  return (
    <ExtendedProductContext.Provider value={value}>
      {children}
    </ExtendedProductContext.Provider>
  );
}

export function useExtendedProduct() {
  const context = useContext(ExtendedProductContext);
  if (context === undefined) {
    throw new Error('useExtendedProduct must be used within a ExtendedProductProvider');
  }
  return context;
}

// Legacy hooks for backward compatibility
export function useProduct() {
  const context = useExtendedProduct();
  return {
    state: context.state,
    updateOption: context.updateOption,
    updateImage: context.updateImage
  };
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}
