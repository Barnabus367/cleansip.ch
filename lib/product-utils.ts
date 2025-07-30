import { Product } from 'lib/shopify/types';
import { formatPrice } from './price-formatter';

/**
 * Utility functions for processing Shopify product data
 */

export interface ProcessedProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  handle: string;
  accentColor: string;
  availableForSale: boolean;
  featuredImage?: {
    url: string;
    altText: string;
  };
}

export function processShopifyProducts(
  products: Product[], 
  maxProducts: number = 3
): ProcessedProduct[] {
  const accentColors = ['#00BFA6', '#FFD54F', '#003B46', '#E91E63', '#9C27B0'];
  const colorVariations = [
    'Standard Serie',
    'Premium Serie', 
    'Deluxe Serie',
    'Professional Serie',
    'Event Serie'
  ];

  // If we have at least one product, create variations from the first one
  if (products.length > 0) {
    const baseProduct = products[0]!;
    const variations: ProcessedProduct[] = [];
    
    for (let i = 0; i < maxProducts; i++) {
      const colorVariant = i > 0 ? ` - ${colorVariations[i]}` : '';
      
      variations.push({
        id: baseProduct.id + (i > 0 ? `-variant-${i}` : ''),
        title: baseProduct.title + colorVariant,
        subtitle: colorVariations[i] || 'Standard Serie',
        description: truncateDescription(baseProduct.description, 120),
        price: formatPrice(baseProduct.priceRange.minVariantPrice.amount, baseProduct.priceRange.minVariantPrice.currencyCode),
        handle: baseProduct.handle,
        accentColor: accentColors[i % accentColors.length] || '#00BFA6',
        availableForSale: baseProduct.availableForSale,
        featuredImage: baseProduct.featuredImage
      });
    }
    
    return variations;
  }
  
  // Fallback if no products available
  return products.slice(0, maxProducts).map((product, index) => ({
    id: product.id,
    title: product.title,
    subtitle: getProductSubtitle(product, colorVariations[index] || 'Standard Serie'),
    description: truncateDescription(product.description, 120),
    price: formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode),
    handle: product.handle,
    accentColor: accentColors[index % accentColors.length] || '#00BFA6',
    availableForSale: product.availableForSale,
    featuredImage: product.featuredImage
  }));
}

function getProductSubtitle(product: Product, fallback: string): string {
  // Check if product has tags that indicate a series
  if (product.tags) {
    const seriesTags = product.tags.filter(tag => 
      tag.toLowerCase().includes('serie') || 
      tag.toLowerCase().includes('collection') ||
      tag.toLowerCase().includes('set')
    );
    if (seriesTags.length > 0) {
      return seriesTags[0] || fallback;
    }
  }
  
  // Extract from title if it contains series information
  if (product.title.includes('Classic')) return 'Standard Serie';
  if (product.title.includes('Premium')) return 'Premium Serie';
  if (product.title.includes('Deluxe')) return 'Deluxe Serie';
  if (product.title.includes('Event')) return 'Event Serie';
  
  return fallback;
}

function truncateDescription(description: string, maxLength: number): string {
  if (!description) return 'Premium Qualität für professionelle Anwendungen.';
  
  if (description.length <= maxLength) {
    return description;
  }
  
  // Truncate at word boundary
  const truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}

export function getFallbackProducts(): ProcessedProduct[] {
  return [
    {
      id: 'fallback-1',
      title: 'Plastik-Strohhalme',
      subtitle: 'Standard Serie',
      description: 'Premium Plastikstrohhalme für jede Gelegenheit. BPA-frei und lebensmittelecht.',
      price: 'CHF 9.90',
      handle: 'plastik-strohhalm',
      accentColor: '#00BFA6',
      availableForSale: true,
      featuredImage: {
        url: '/placeholder-straw.jpg',
        altText: 'CleanSip Plastik-Strohhalme Standard Serie'
      }
    },
    {
      id: 'fallback-2',
      title: 'Plastik-Strohhalme - Premium Serie',
      subtitle: 'Premium Serie',
      description: 'Hochwertige Plastikstrohhalme für professionelle Anwendungen in der Gastronomie.',
      price: 'CHF 12.90',
      handle: 'plastik-strohhalm',
      accentColor: '#FFD54F',
      availableForSale: true,
      featuredImage: {
        url: '/placeholder-straw.jpg',
        altText: 'CleanSip Plastik-Strohhalme Premium Serie'
      }
    },
    {
      id: 'fallback-3',
      title: 'Plastik-Strohhalme - Deluxe Serie',
      subtitle: 'Deluxe Serie',
      description: 'Exklusive Plastikstrohhalme für besondere Events und gehobene Gastronomiebetriebe.',
      price: 'CHF 15.90',
      handle: 'plastik-strohhalm',
      accentColor: '#003B46',
      availableForSale: true,
      featuredImage: {
        url: '/placeholder-straw.jpg',
        altText: 'CleanSip Plastik-Strohhalme Deluxe Serie'
      }
    }
  ];
}
