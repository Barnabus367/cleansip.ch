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
  const defaultSubtitles = [
    'Standard Serie',
    'Event Serie', 
    'Exklusive Serie',
    'Premium Serie',
    'Deluxe Serie'
  ];

  return products.slice(0, maxProducts).map((product, index) => ({
    id: product.id,
    title: product.title,
    subtitle: getProductSubtitle(product, defaultSubtitles[index] || 'Premium Serie'),
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
      title: 'Strohhalme Classic',
      subtitle: 'Standard Serie',
      description: 'Premium Plastikstrohhalme für jede Gelegenheit. BPA-frei und lebensmittelecht.',
      price: 'CHF 14.90',
      handle: 'strohhalme-classic',
      accentColor: '#00BFA6',
      availableForSale: true
    },
    {
      id: 'fallback-2',
      title: 'Premium Set',
      subtitle: 'Event Serie',
      description: 'Hochwertige Qualität für professionelle Events und Gastronomie.',
      price: 'CHF 19.90',
      handle: 'premium-set',
      accentColor: '#FFD54F',
      availableForSale: true
    },
    {
      id: 'fallback-3',
      title: 'Deluxe Pack',
      subtitle: 'Exklusive Serie',
      description: 'Unsere exklusivste Serie für höchste Ansprüche und Premium-Events.',
      price: 'CHF 24.90',
      handle: 'deluxe-pack',
      accentColor: '#003B46',
      availableForSale: true
    }
  ];
}
