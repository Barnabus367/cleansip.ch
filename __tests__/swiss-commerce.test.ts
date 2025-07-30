/**
 * Test Examples for Swiss Commerce Functions
 * 
 * To run these tests, install a testing framework:
 * npm install --save-dev jest @types/jest
 * or
 * npm install --save-dev vitest
 * 
 * Then uncomment the test code below and run: npm test
 */

import {
    calculateDeliveryDate,
    calculateSwissShipping,
    getCantonFromPostalCode,
    validateSwissPostalCode
} from '../lib/shopify/swiss-commerce';
import {
    calculateSwissVAT,
    formatSwissPrice,
    validateShopifyConfig
} from '../lib/shopify/validate-config';

// Example test functions - uncomment when testing framework is installed

/*
describe('Swiss Commerce Integration Tests', () => {
  test('Complete order flow with Swiss specifics', () => {
    // 1. Format Swiss prices
    const price = formatSwissPrice('14.90', 'CHF');
    expect(price).toBe('CHF 14.90');
    
    // 2. Calculate VAT
    const vat = calculateSwissVAT(14.90);
    expect(vat.vatRate).toBe(0.077);
    expect(vat.grossAmount).toBeCloseTo(16.05, 2);
    
    // 3. Validate postal code
    expect(validateSwissPostalCode('8001')).toBe(true);
    expect(getCantonFromPostalCode('8001')).toBe('ZH');
    
    // 4. Calculate shipping
    const shipping = calculateSwissShipping({
      totalWeight: 100,
      orderValue: 60.00 // Above free shipping threshold
    });
    expect(shipping.freeShippingEligible).toBe(true);
    
    // 5. Calculate delivery date
    const deliveryDate = calculateDeliveryDate(shipping.recommendedOption);
    expect(deliveryDate).toBeInstanceOf(Date);
    expect(deliveryDate.getTime()).toBeGreaterThan(Date.now());
  });
});
*/

// Manual test function for development
export function runManualTests() {
  console.log('🧪 Running manual tests for Swiss Commerce...\n');
  
  // Test 1: Price formatting
  console.log('1. Price Formatting:');
  console.log('   CHF 14.90 ->', formatSwissPrice('14.90', 'CHF'));
  console.log('   CHF 100.00 ->', formatSwissPrice('100.00', 'CHF'));
  
  // Test 2: VAT calculation
  console.log('\n2. VAT Calculation (7.7%):');
  const vat = calculateSwissVAT(100);
  console.log(`   Net: CHF ${vat.netAmount}`);
  console.log(`   VAT: CHF ${vat.vatAmount.toFixed(2)}`);
  console.log(`   Gross: CHF ${vat.grossAmount.toFixed(2)}`);
  
  // Test 3: Postal code validation
  console.log('\n3. Postal Code Validation:');
  const testCodes = ['8001', '3000', '123', 'abcd'];
  testCodes.forEach(code => {
    const isValid = validateSwissPostalCode(code);
    const canton = getCantonFromPostalCode(code);
    console.log(`   ${code}: ${isValid ? '✅' : '❌'} Valid, Canton: ${canton || 'Unknown'}`);
  });
  
  // Test 4: Shipping calculation
  console.log('\n4. Shipping Calculation:');
  const lightOrder = calculateSwissShipping({
    totalWeight: 100,
    orderValue: 20.00
  });
  console.log(`   Light order (100g, CHF 20): ${lightOrder.recommendedOption.name}`);
  console.log(`   Free shipping: ${lightOrder.freeShippingEligible ? '✅' : '❌'}`);
  console.log(`   Remaining for free shipping: CHF ${lightOrder.freeShippingRemaining?.toFixed(2) || '0.00'}`);
  
  const heavyOrder = calculateSwissShipping({
    totalWeight: 5000,
    orderValue: 80.00
  });
  console.log(`   Heavy order (5kg, CHF 80): ${heavyOrder.recommendedOption.name}`);
  console.log(`   Free shipping: ${heavyOrder.freeShippingEligible ? '✅' : '❌'}`);
  
  // Test 5: Configuration validation
  console.log('\n5. Shopify Configuration:');
  const config = validateShopifyConfig();
  console.log(`   Configured: ${config.config.isConfigured ? '✅' : '❌'}`);
  console.log(`   Using mock data: ${config.shouldUseMockData ? '✅' : '❌'}`);
  if (config.config.errors.length > 0) {
    console.log('   Errors:', config.config.errors);
  }
  
  console.log('\n✅ Manual tests completed!');
}

// Test scenarios for different order types
export const TEST_SCENARIOS = {
  smallOrder: {
    items: [{ weight: 50, price: 14.90, name: 'CleanSip Straws 100pk' }],
    address: { postalCode: '8001', canton: 'ZH' as const }
  },
  
  mediumOrder: {
    items: [
      { weight: 100, price: 29.90, name: 'CleanSip Straws 200pk' },
      { weight: 80, price: 19.90, name: 'Party Cups 50pk' }
    ],
    address: { postalCode: '3000', canton: 'BE' as const }
  },
  
  largeOrder: {
    items: [
      { weight: 200, price: 49.90, name: 'CleanSip Straws 500pk' },
      { weight: 150, price: 39.90, name: 'Party Cups 100pk' },
      { weight: 100, price: 24.90, name: 'Stirring Sticks 200pk' }
    ],
    address: { postalCode: '1200', canton: 'GE' as const }
  }
};

// Helper function to test a complete order scenario
export function testOrderScenario(scenario: typeof TEST_SCENARIOS.smallOrder) {
  console.log('\n📦 Testing Order Scenario:');
  
  // Calculate totals
  const totalWeight = scenario.items.reduce((sum, item) => sum + item.weight, 0);
  const subtotal = scenario.items.reduce((sum, item) => sum + item.price, 0);
  
  console.log(`   Items: ${scenario.items.length}`);
  console.log(`   Total weight: ${totalWeight}g`);
  console.log(`   Subtotal: ${formatSwissPrice(subtotal.toFixed(2), 'CHF')}`);
  
  // Calculate VAT
  const vat = calculateSwissVAT(subtotal);
  console.log(`   VAT (7.7%): ${formatSwissPrice(vat.vatAmount.toFixed(2), 'CHF')}`);
  console.log(`   Total with VAT: ${formatSwissPrice(vat.grossAmount.toFixed(2), 'CHF')}`);
  
  // Calculate shipping
  const shipping = calculateSwissShipping({
    totalWeight,
    orderValue: subtotal,
    canton: scenario.address.canton
  });
  
  console.log(`   Recommended shipping: ${shipping.recommendedOption.name}`);
  console.log(`   Shipping cost: ${formatSwissPrice(shipping.recommendedOption.priceGross.toFixed(2), 'CHF')}`);
  console.log(`   Free shipping: ${shipping.freeShippingEligible ? '✅' : '❌'}`);
  
  // Calculate delivery date
  const deliveryDate = calculateDeliveryDate(shipping.recommendedOption);
  console.log(`   Estimated delivery: ${deliveryDate.toLocaleDateString('de-CH')}`);
  
  // Final total
  const shippingCost = shipping.freeShippingEligible ? 0 : shipping.recommendedOption.priceGross;
  const finalTotal = vat.grossAmount + shippingCost;
  console.log(`   Final Total: ${formatSwissPrice(finalTotal.toFixed(2), 'CHF')}`);
  
  return {
    subtotal,
    vat: vat.vatAmount,
    shipping: shippingCost,
    total: finalTotal,
    deliveryDate
  };
}

// Run this in development to test manually
if (process.env.NODE_ENV === 'development') {
  // Uncomment to run manual tests
  // runManualTests();
  
  // Test scenarios
  // console.log('\n🎯 Testing Order Scenarios:');
  // testOrderScenario(TEST_SCENARIOS.smallOrder);
  // testOrderScenario(TEST_SCENARIOS.mediumOrder);
  // testOrderScenario(TEST_SCENARIOS.largeOrder);
}
