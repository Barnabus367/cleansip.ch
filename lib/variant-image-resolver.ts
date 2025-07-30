import type { Image, Product, ProductVariant } from './shopify/types';

/**
 * Resolves the appropriate image for a given product variant
 * Uses Shopify's native variant image assignment with intelligent fallbacks
 */
export function getImageForVariant(
  variant: ProductVariant | null,
  product: Product
): Image | null {
  if (!variant) {
    return product.featuredImage || product.images[0] || null;
  }

  // 1. Priority: Variant has its own assigned image
  if (variant.image) {
    return variant.image;
  }

  // 2. Priority: Find image by color matching
  const colorOption = variant.selectedOptions.find(
    (option) => option.name.toLowerCase() === 'color' || option.name.toLowerCase() === 'farbe'
  );

  if (colorOption && product.images.length > 0) {
    const imageIndex = findImageIndexByColor(colorOption.value, product.images);
    if (imageIndex !== -1 && imageIndex < product.images.length) {
      return product.images[imageIndex] || null;
    }
  }

  // 3. Priority: Map by variant index (if variants are ordered consistently)
  const variantIndex = product.variants.findIndex(v => v.id === variant.id);
  if (variantIndex !== -1 && variantIndex < product.images.length) {
    return product.images[variantIndex] || null;
  }

  // 4. Fallback: Featured image or first available image
  return product.featuredImage || product.images[0] || null;
}

/**
 * Finds the index of an image that matches the given color
 * Uses intelligent color mapping and fuzzy matching
 */
function findImageIndexByColor(colorValue: string, images: Image[]): number {
  const normalizedColor = normalizeColorName(colorValue);
  
  // Color mapping for German/English color names
  const colorKeywords = getColorKeywords(normalizedColor);
  
  return images.findIndex((image, index) => {
    // Check alt text for color keywords
    if (image.altText) {
      const normalizedAltText = image.altText.toLowerCase();
      return colorKeywords.some(keyword => 
        normalizedAltText.includes(keyword.toLowerCase())
      );
    }
    
    // If no alt text, use index-based mapping for common color orders
    const commonColorOrder = [
      'farbig', 'blau', 'grün', 'orange', 'pink', 'lila', 'rot', 'gelb', 'gestreift'
    ];
    const colorIndex = commonColorOrder.findIndex(color => 
      normalizedColor.includes(color.toLowerCase())
    );
    
    return colorIndex !== -1 && colorIndex === index;
  });
}

/**
 * Normalizes color names by removing common prefixes/suffixes
 */
function normalizeColorName(colorValue: string): string {
  return colorValue
    .toLowerCase()
    .replace(/^\d+\s*stk\.?\s*/, '') // Remove "100 Stk." prefix
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Gets all possible keywords for a color (including translations)
 */
function getColorKeywords(normalizedColor: string): string[] {
  const colorMap: Record<string, string[]> = {
    'blau': ['blau', 'blue', 'blaue'],
    'rot': ['rot', 'red', 'rote'],
    'grün': ['grün', 'green', 'grüne'],
    'gelb': ['gelb', 'yellow', 'gelbe'],
    'orange': ['orange'],
    'pink': ['pink', 'rosa'],
    'lila': ['lila', 'purple', 'violett'],
    'farbig': ['farbig', 'colorful', 'mixed', 'rainbow', 'multi'],
    'gestreift': ['gestreift', 'striped', 'stripes'],
    'schwarz': ['schwarz', 'black'],
    'weiss': ['weiss', 'weiß', 'white'],
    'grau': ['grau', 'gray', 'grey'],
  };

  // Find matching keywords
  for (const [key, keywords] of Object.entries(colorMap)) {
    if (normalizedColor.includes(key)) {
      return keywords;
    }
  }

  // Fallback: return the normalized color itself
  return [normalizedColor];
}

/**
 * Gets the image index for a specific variant by variant ID
 * Useful for direct variant-to-image mapping
 */
export function getImageIndexForVariant(
  variant: ProductVariant | null,
  product: Product
): number {
  if (!variant) return 0;

  const image = getImageForVariant(variant, product);
  if (!image) return 0;

  const index = product.images.findIndex(img => img.url === image.url);
  return index !== -1 ? index : 0;
}

/**
 * Preloads variant images for better performance
 */
export function preloadVariantImages(product: Product): void {
  const imagesToPreload = new Set<string>();
  
  // Add featured image
  if (product.featuredImage) {
    imagesToPreload.add(product.featuredImage.url);
  }
  
  // Add variant-specific images
  product.variants.forEach(variant => {
    const image = getImageForVariant(variant, product);
    if (image) {
      imagesToPreload.add(image.url);
    }
  });
  
  // Preload unique images
  imagesToPreload.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
