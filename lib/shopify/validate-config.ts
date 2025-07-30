/**
 * Shopify Configuration Validation for CleanSip
 * Validates Shopify ENV variables and provides fallback handling
 */

import { mockCollections, mockMenu, mockProducts } from '../mock-data';
import type { Collection, Product } from './types';

export interface ShopifyConfig {
  isConfigured: boolean;
  storeDomain: string | null;
  accessToken: string | null;
  errors: string[];
  fallbackMode: boolean;
}

export interface ValidationResult {
  config: ShopifyConfig;
  shouldUseMockData: boolean;
}

/**
 * Validates Shopify environment configuration
 */
export function validateShopifyConfig(): ValidationResult {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const errors: string[] = [];

  // Check for required environment variables
  if (!storeDomain) {
    errors.push('SHOPIFY_STORE_DOMAIN environment variable is required');
  }

  if (!accessToken) {
    errors.push('SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable is required');
  }

  // Validate store domain format
  if (storeDomain) {
    if (storeDomain.includes('[') || storeDomain.includes(']')) {
      errors.push('SHOPIFY_STORE_DOMAIN contains invalid brackets - remove [brackets] from domain');
    }

    if (!storeDomain.includes('.myshopify.com') && !storeDomain.includes('shopify.com')) {
      errors.push('SHOPIFY_STORE_DOMAIN must be a valid Shopify domain (*.myshopify.com)');
    }
  }

  // Validate access token format (basic validation)
  if (accessToken && accessToken.length < 10) {
    errors.push('SHOPIFY_STOREFRONT_ACCESS_TOKEN appears to be invalid (too short)');
  }

  const isConfigured = errors.length === 0 && !!storeDomain && !!accessToken;
  const fallbackMode = !isConfigured;

  const config: ShopifyConfig = {
    isConfigured,
    storeDomain: storeDomain || null,
    accessToken: accessToken || null,
    errors,
    fallbackMode
  };

  return {
    config,
    shouldUseMockData: fallbackMode
  };
}

/**
 * Runtime configuration check with logging
 */
export function performStartupCheck(): ValidationResult {
  const validation = validateShopifyConfig();
  
  if (process.env.NODE_ENV === 'development') {
    if (validation.config.fallbackMode) {
      console.warn('🛍️ Shopify not configured - using mock data');
      console.warn('Errors:', validation.config.errors);
    } else {
      console.log('✅ Shopify configuration valid');
      console.log(`🏪 Store: ${validation.config.storeDomain}`);
    }
  }

  return validation;
}

/**
 * Get fallback data when Shopify is not available
 */
export function getFallbackData() {
  return {
    products: mockProducts,
    collections: mockCollections,
    menu: mockMenu
  };
}

/**
 * Check if we should use mock data (for testing or fallback)
 */
export function shouldUseMockData(): boolean {
  const validation = validateShopifyConfig();
  return validation.shouldUseMockData || process.env.USE_MOCK_DATA === 'true';
}

/**
 * Get formatted Swiss CHF price
 */
export function formatSwissPrice(amount: string, currencyCode: string = 'CHF'): string {
  const price = parseFloat(amount);
  
  if (currencyCode === 'CHF') {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  }

  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: currencyCode
  }).format(price);
}

/**
 * Calculate Swiss VAT (7.7%)
 */
export function calculateSwissVAT(netAmount: number): {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  vatRate: number;
} {
  const vatRate = 0.077; // 7.7% Swiss VAT
  const vatAmount = netAmount * vatRate;
  const grossAmount = netAmount + vatAmount;

  return {
    netAmount,
    vatAmount,
    grossAmount,
    vatRate
  };
}

/**
 * Shopify API error handler with fallback
 */
export function handleShopifyError(error: unknown, operation: string): {
  error: string;
  shouldFallback: boolean;
  fallbackData?: any;
} {
  console.error(`Shopify ${operation} error:`, error);

  // Network or API errors - use fallback
  if (error instanceof Error) {
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return {
        error: `Network error during ${operation}`,
        shouldFallback: true,
        fallbackData: getFallbackData()
      };
    }

    if (error.message.includes('rate limit')) {
      return {
        error: `Rate limit exceeded for ${operation}`,
        shouldFallback: true,
        fallbackData: getFallbackData()
      };
    }
  }

  return {
    error: `Unknown error during ${operation}`,
    shouldFallback: true,
    fallbackData: getFallbackData()
  };
}

// Export for use in components
export type { Collection, Product };

