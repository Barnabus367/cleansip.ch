/**
 * Format price with proper Swiss Franc formatting
 * Ensures always two decimal places for CHF prices
 */
export function formatPrice(amount: string, currencyCode: string = 'CHF'): string {
  const numericAmount = parseFloat(amount);
  
  if (currencyCode === 'CHF') {
    // Ensure Swiss Franc always shows two decimal places
    return `CHF ${numericAmount.toFixed(2)}`;
  }
  
  // For other currencies, use standard formatting
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
}

/**
 * Format price range for display
 */
export function formatPriceRange(
  minAmount: string, 
  maxAmount: string, 
  currencyCode: string = 'CHF'
): string {
  const min = formatPrice(minAmount, currencyCode);
  const max = formatPrice(maxAmount, currencyCode);
  
  if (minAmount === maxAmount) {
    return min;
  }
  
  return `${min} - ${max}`;
}
