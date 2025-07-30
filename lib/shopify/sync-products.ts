/**
 * Shopify Product Sync & CRUD Operations for CleanSip
 * Handles bulk product import, sync, and Swiss market specifics
 */

import { shopifyFetch } from './server';
import type {
    Product,
    ProductVariant,
    ShopifyProduct,
    ShopifyProductOperation
} from './types';
import { getFallbackData, handleShopifyError, shouldUseMockData, validateShopifyConfig } from './validate-config';

// Extended types for Swiss market
interface Metafield {
  key: string;
  value: string;
  namespace: string;
}

interface ExtendedShopifyProduct extends ShopifyProduct {
  metafields?: Metafield[];
  publishedAt?: string;
}

interface ExtendedProductVariant extends ProductVariant {
  quantityAvailable?: number;
}

interface ExtendedShopifyProductsConnection {
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
  edges: Array<{
    node: ExtendedShopifyProduct;
  }>;
}

interface ExtendedShopifyProductsOperation {
  data: {
    products: ExtendedShopifyProductsConnection;
  };
  variables: {
    first: number;
    after?: string | null;
    query?: string;
  };
}

// Swiss-specific metafields
export interface SwissProductMetafields {
  weight_grams?: number;
  shipping_class?: 'standard' | 'express' | 'pickup';
  vat_rate?: number;
  swiss_certification?: string;
  recycling_info?: string;
  ingredients_de?: string;
  ingredients_fr?: string;
  safety_warnings_de?: string;
  safety_warnings_fr?: string;
}

// Extended product type with Swiss metafields
export interface SwissProduct extends Product {
  swissMetafields?: SwissProductMetafields;
  stockLevel?: number;
  reservedStock?: number;
  availableStock?: number;
}

// Bulk sync configuration
export interface SyncConfig {
  batchSize: number;
  includeUnpublished: boolean;
  syncMetafields: boolean;
  updateExisting: boolean;
}

const DEFAULT_SYNC_CONFIG: SyncConfig = {
  batchSize: 50,
  includeUnpublished: false,
  syncMetafields: true,
  updateExisting: true
};

/**
 * Enhanced product query with Swiss metafields
 */
const getProductWithMetafieldsQuery = `
  query getProduct($handle: String!) {
    product: productByHandle(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      options {
        id
        name
        values
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            quantityAvailable
          }
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 20) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      seo {
        title
        description
      }
      tags
      updatedAt
      metafields(identifiers: [
        { namespace: "swiss", key: "weight_grams" }
        { namespace: "swiss", key: "shipping_class" }
        { namespace: "swiss", key: "vat_rate" }
        { namespace: "swiss", key: "certification" }
        { namespace: "swiss", key: "recycling_info" }
        { namespace: "translations", key: "ingredients_de" }
        { namespace: "translations", key: "ingredients_fr" }
        { namespace: "safety", key: "warnings_de" }
        { namespace: "safety", key: "warnings_fr" }
      ]) {
        key
        value
        namespace
      }
    }
  }
`;

/**
 * Bulk products query for sync operations
 */
const getBulkProductsQuery = `
  query getProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          options {
            id
            name
            values
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 250) {
            edges {
              node {
                id
                title
                availableForSale
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
                quantityAvailable
              }
            }
          }
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 20) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          seo {
            title
            description
          }
          tags
          updatedAt
          publishedAt
          metafields(identifiers: [
            { namespace: "swiss", key: "weight_grams" }
            { namespace: "swiss", key: "shipping_class" }
            { namespace: "swiss", key: "vat_rate" }
          ]) {
            key
            value
            namespace
          }
        }
      }
    }
  }
`;

/**
 * Get product with Swiss metafields
 */
export async function getSwissProduct(handle: string): Promise<SwissProduct | null> {
  if (shouldUseMockData()) {
    const fallbackData = getFallbackData();
    const mockProduct = fallbackData.products.find(p => p.handle === handle);
    return mockProduct ? transformToSwissProduct(mockProduct) : null;
  }

  try {
    const validation = validateShopifyConfig();
    if (!validation.config.isConfigured) {
      throw new Error('Shopify not configured');
    }

    const res = await shopifyFetch<ShopifyProductOperation>({
      query: getProductWithMetafieldsQuery,
      variables: { handle },
      tags: [`product-${handle}`]
    });

    if (!res.body.data.product) {
      return null;
    }

    return transformShopifyToSwissProduct(res.body.data.product);
  } catch (error) {
    const errorInfo = handleShopifyError(error, 'getSwissProduct');
    if (errorInfo.shouldFallback && errorInfo.fallbackData) {
      const mockProduct = errorInfo.fallbackData.products.find((p: Product) => p.handle === handle);
      return mockProduct ? transformToSwissProduct(mockProduct) : null;
    }
    return null;
  }
}

/**
 * Bulk product sync from Shopify
 */
export async function syncAllProducts(config: Partial<SyncConfig> = {}): Promise<{
  success: boolean;
  totalSynced: number;
  errors: string[];
  products: SwissProduct[];
}> {
  const syncConfig = { ...DEFAULT_SYNC_CONFIG, ...config };
  
  if (shouldUseMockData()) {
    const fallbackData = getFallbackData();
    return {
      success: true,
      totalSynced: fallbackData.products.length,
      errors: [],
      products: fallbackData.products.map(transformToSwissProduct)
    };
  }

  const result = {
    success: false,
    totalSynced: 0,
    errors: [] as string[],
    products: [] as SwissProduct[]
  };

  try {
    const validation = validateShopifyConfig();
    if (!validation.config.isConfigured) {
      throw new Error('Shopify not configured');
    }

    let hasNextPage = true;
    let cursor: string | null = null;
    
    // Build query filter
    let queryFilter = '';
    if (!syncConfig.includeUnpublished) {
      queryFilter = 'published_status:published';
    }

    while (hasNextPage) {
      try {
        const res: { status: number; body: ExtendedShopifyProductsOperation } = await shopifyFetch<ExtendedShopifyProductsOperation>({
          query: getBulkProductsQuery,
          variables: {
            first: syncConfig.batchSize,
            after: cursor,
            query: queryFilter || undefined
          },
          cache: 'no-store', // Always fetch fresh data for sync
          tags: ['products-sync']
        });

        const { products } = res.body.data;
        
        if (!products.edges.length) {
          break;
        }

        // Transform and add products
        for (const edge of products.edges) {
          try {
            const swissProduct = transformShopifyToSwissProduct(edge.node);
            result.products.push(swissProduct);
            result.totalSynced++;
          } catch (error) {
            result.errors.push(`Failed to transform product ${edge.node.handle}: ${error}`);
          }
        }

        // Update pagination
        hasNextPage = products.pageInfo.hasNextPage;
        cursor = products.pageInfo.endCursor;

        // Log progress
        console.log(`Synced batch: ${result.totalSynced} products`);
        
      } catch (batchError) {
        result.errors.push(`Batch sync error: ${batchError}`);
        break;
      }
    }

    result.success = result.errors.length === 0 || result.totalSynced > 0;
    
  } catch (error) {
    const errorInfo = handleShopifyError(error, 'syncAllProducts');
    result.errors.push(errorInfo.error);
    
    if (errorInfo.shouldFallback && errorInfo.fallbackData) {
      result.products = errorInfo.fallbackData.products.map(transformToSwissProduct);
      result.totalSynced = result.products.length;
      result.success = true;
    }
  }

  return result;
}

/**
 * Transform Shopify product to Swiss product format
 */
function transformShopifyToSwissProduct(shopifyProduct: ExtendedShopifyProduct): SwissProduct {
  const metafields: Metafield[] = shopifyProduct.metafields || [];
  const swissMetafields: SwissProductMetafields = {};

  // Parse metafields
  metafields.forEach((field: Metafield) => {
    if (field.namespace === 'swiss') {
      switch (field.key) {
        case 'weight_grams':
          swissMetafields.weight_grams = parseInt(field.value) || undefined;
          break;
        case 'shipping_class':
          swissMetafields.shipping_class = field.value as any;
          break;
        case 'vat_rate':
          swissMetafields.vat_rate = parseFloat(field.value) || 0.077;
          break;
        case 'certification':
          swissMetafields.swiss_certification = field.value;
          break;
        case 'recycling_info':
          swissMetafields.recycling_info = field.value;
          break;
      }
    } else if (field.namespace === 'translations') {
      switch (field.key) {
        case 'ingredients_de':
          swissMetafields.ingredients_de = field.value;
          break;
        case 'ingredients_fr':
          swissMetafields.ingredients_fr = field.value;
          break;
      }
    } else if (field.namespace === 'safety') {
      switch (field.key) {
        case 'warnings_de':
          swissMetafields.safety_warnings_de = field.value;
          break;
        case 'warnings_fr':
          swissMetafields.safety_warnings_fr = field.value;
          break;
      }
    }
  });

  // Calculate stock levels
  const totalStock = shopifyProduct.variants?.edges?.reduce((total, variant) => {
    const extendedVariant = variant.node as ExtendedProductVariant;
    return total + (extendedVariant.quantityAvailable || 0);
  }, 0) || 0;

  return {
    ...transformShopifyProduct(shopifyProduct),
    swissMetafields,
    stockLevel: totalStock,
    reservedStock: 0, // Would come from order management system
    availableStock: totalStock
  };
}

/**
 * Transform regular product to Swiss product (for mock data)
 */
function transformToSwissProduct(product: Product): SwissProduct {
  return {
    ...product,
    swissMetafields: {
      weight_grams: 50, // Default for straws
      shipping_class: 'standard',
      vat_rate: 0.077,
      swiss_certification: 'Swiss Made',
      recycling_info: 'Recyclable plastic'
    },
    stockLevel: 1000,
    reservedStock: 0,
    availableStock: 1000
  };
}

/**
 * Basic Shopify product transformer (fallback to existing logic)
 */
function transformShopifyProduct(shopifyProduct: ShopifyProduct): Product {
  // This would use existing transform logic from your current implementation
  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    availableForSale: shopifyProduct.availableForSale,
    options: shopifyProduct.options,
    priceRange: shopifyProduct.priceRange,
    variants: shopifyProduct.variants?.edges?.map(edge => edge.node) || [],
    featuredImage: shopifyProduct.featuredImage,
    images: shopifyProduct.images?.edges?.map(edge => edge.node) || [],
    seo: shopifyProduct.seo,
    tags: shopifyProduct.tags,
    updatedAt: shopifyProduct.updatedAt
  };
}

/**
 * Get products by collection with Swiss data
 */
export async function getSwissCollectionProducts(collection: string, first: number = 20): Promise<SwissProduct[]> {
  if (shouldUseMockData()) {
    const fallbackData = getFallbackData();
    return fallbackData.products.map(transformToSwissProduct);
  }

  try {
    // Use existing getCollectionProducts and transform results
    const { getCollectionProducts } = await import('./server');
    const products = await getCollectionProducts({ collection });
    
    return products.map(product => transformToSwissProduct(product));
  } catch (error) {
    const errorInfo = handleShopifyError(error, 'getSwissCollectionProducts');
    if (errorInfo.shouldFallback && errorInfo.fallbackData) {
      return errorInfo.fallbackData.products.map(transformToSwissProduct);
    }
    return [];
  }
}

/**
 * Search products with Swiss filters
 */
export async function searchSwissProducts(query: string, filters?: {
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  swissOnly?: boolean;
}): Promise<SwissProduct[]> {
  if (shouldUseMockData()) {
    const fallbackData = getFallbackData();
    let filteredProducts = fallbackData.products;

    if (query) {
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filteredProducts.map(transformToSwissProduct);
  }

  try {
    // Build Shopify search query
    let shopifyQuery = query;
    
    if (filters?.minPrice) {
      shopifyQuery += ` AND variants.price:>=${filters.minPrice}`;
    }
    
    if (filters?.maxPrice) {
      shopifyQuery += ` AND variants.price:<=${filters.maxPrice}`;
    }
    
    if (filters?.inStock) {
      shopifyQuery += ` AND variants.inventory_quantity:>0`;
    }

    // Use existing search functionality and enhance with Swiss data
    const { getProducts } = await import('./server');
    const products = await getProducts({ query: shopifyQuery });
    
    return products.map(product => transformToSwissProduct(product));
  } catch (error) {
    const errorInfo = handleShopifyError(error, 'searchSwissProducts');
    if (errorInfo.shouldFallback && errorInfo.fallbackData) {
      return errorInfo.fallbackData.products.map(transformToSwissProduct);
    }
    return [];
  }
}

export { DEFAULT_SYNC_CONFIG };
