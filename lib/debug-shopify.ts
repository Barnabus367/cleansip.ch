/**
 * Debug utility to check Shopify data integration
 * This file helps verify that all required data is coming from Shopify
 */

import { FEATURE_FLAGS } from 'lib/constants';
import { processShopifyProducts } from 'lib/product-utils';
import { getProducts } from 'lib/shopify';

export async function debugShopifyData() {
  console.log('🔍 CleanSip Shopify Data Debug');
  console.log('================================');
  
  try {
    // 1. Test basic connection
    console.log('1. Testing Shopify connection...');
    const allProducts = await getProducts({});
    console.log(`✅ Retrieved ${allProducts.length} products from Shopify`);
    
    // 2. Check feature flags
    console.log('\n2. Feature Flags Status:');
    console.log(`SHOW_STROHHALME: ${FEATURE_FLAGS.SHOW_STROHHALME}`);
    console.log(`SHOW_PARTY_CUPS: ${FEATURE_FLAGS.SHOW_PARTY_CUPS}`);
    console.log(`SHOW_RUEHRSTABCHEN: ${FEATURE_FLAGS.SHOW_RUEHRSTABCHEN}`);
    console.log(`SHOW_BESTECK: ${FEATURE_FLAGS.SHOW_BESTECK}`);
    
    // 3. Filter products
    const featuredProducts = allProducts.filter(product => {
      return FEATURE_FLAGS.SHOW_STROHHALME;
    });
    console.log(`\n3. Filtered ${featuredProducts.length} featured products`);
    
    // 4. Check individual product data
    if (featuredProducts.length > 0) {
      console.log('\n4. Sample Product Data:');
      const sample = featuredProducts[0]!;
      console.log(`Title: ${sample.title}`);
      console.log(`Handle: ${sample.handle}`);
      console.log(`Description: ${sample.description?.substring(0, 100)}...`);
      console.log(`Price: CHF ${sample.priceRange.minVariantPrice.amount}`);
      console.log(`Available: ${sample.availableForSale}`);
      console.log(`Tags: ${sample.tags?.join(', ') || 'None'}`);
      console.log(`Featured Image: ${sample.featuredImage ? '✅ ' + sample.featuredImage.url : '❌ No image'}`);
    }
    
    // 5. Test processed products
    console.log('\n5. Testing Processed Products:');
    const processedProducts = processShopifyProducts(featuredProducts, 3);
    processedProducts.forEach((product, index) => {
      console.log(`Product ${index + 1}:`);
      console.log(`  - Title: ${product.title}`);
      console.log(`  - Subtitle: ${product.subtitle}`);
      console.log(`  - Price: ${product.price}`);
      console.log(`  - Accent: ${product.accentColor}`);
      console.log(`  - Image: ${product.featuredImage ? '✅ Available' : '❌ Missing'}`);
    });
    
    // 6. Required fields check
    console.log('\n6. Required Fields Validation:');
    const requiredFields = ['title', 'description', 'handle', 'availableForSale'];
    
    featuredProducts.forEach((product, index) => {
      console.log(`Product ${index + 1} validation:`);
      requiredFields.forEach(field => {
        const hasField = (product as any)[field];
        console.log(`  - ${field}: ${hasField ? '✅' : '❌'}`);
      });
      // Check nested priceRange
      const hasPrice = product.priceRange?.minVariantPrice?.amount;
      console.log(`  - priceRange.minVariantPrice.amount: ${hasPrice ? '✅' : '❌'}`);
    });
    
    return {
      success: true,
      totalProducts: allProducts.length,
      featuredProducts: featuredProducts.length,
      processedProducts: processedProducts.length,
      sampleProduct: featuredProducts[0] || null
    };
    
  } catch (error) {
    console.error('❌ Shopify Data Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Export for use in development
export default debugShopifyData;
