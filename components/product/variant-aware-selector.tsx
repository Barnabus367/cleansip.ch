'use client';

import clsx from 'clsx';
import { useExtendedProduct } from 'components/product/extended-product-context';
import { useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/shopify/types';
import { useEffect, useState } from 'react';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

// Extended color mapping for visual selectors
const colorMap: Record<string, string> = {
  'schwarz': '#000000',
  'weiss': '#FFFFFF',
  'rot': '#DC2626',
  'blau': '#2563EB',
  'grün': '#16A34A',
  'gelb': '#EAB308',
  'lila': '#9333EA',
  'rosa': '#EC4899',
  'orange': '#EA580C',
  'türkis': '#06B6D4',
  'beige': '#F5F5DC',
  'braun': '#8B4513',
  'grau': '#6B7280',
  'transparent': 'rgba(255,255,255,0.1)',
  'farbig': 'linear-gradient(45deg, #DC2626, #EA580C, #EAB308, #16A34A, #06B6D4, #2563EB, #9333EA)',
  'regenbogen': 'linear-gradient(45deg, #DC2626, #EA580C, #EAB308, #16A34A, #06B6D4, #2563EB, #9333EA)',
  'gestreift': 'repeating-linear-gradient(45deg, #000 0px, #000 4px, #FFF 4px, #FFF 8px)',
  'gepunktet': 'radial-gradient(circle at 25% 25%, #000 2px, transparent 2px, transparent)',
};

export function VariantAwareSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { 
    state, 
    selectedVariant, 
    updateOption, 
    updateVariant, 
    findVariantByOptions 
  } = useExtendedProduct();
  const updateURL = useUpdateURL();
  const [priceAnimation, setPriceAnimation] = useState(false);

  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  // Trigger price animation when variant changes
  useEffect(() => {
    if (selectedVariant) {
      setPriceAnimation(true);
      setTimeout(() => setPriceAnimation(false), 300);
    }
  }, [selectedVariant]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newState = updateOption(optionName, value);
    
    // Find and update the matching variant
    const matchingVariant = findVariantByOptions(newState);
    if (matchingVariant) {
      updateVariant(matchingVariant);
    }
    
    updateURL(newState);
  };

  const renderColorSwatches = (option: ProductOption) => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Farbe</h3>
          <span className="text-sm text-gray-500">
            {state[option.name.toLowerCase()] || 'Wähle eine Farbe'}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();
            const optionParams = { ...state, [optionNameLowerCase]: value };
            
            const filtered = Object.entries(optionParams).filter(([key, value]) =>
              options.find(
                (option) => option.name.toLowerCase() === key && option.values.includes(value)
              )
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) => combination[key] === value && combination.availableForSale
              )
            );
            
            const isActive = state[optionNameLowerCase] === value;
            
            // Extract color name for mapping
            const colorName = value.toLowerCase().replace(/^\d+\s*stk\.?\s*/, '').trim();
            const colorValue = colorMap[colorName] || '#ccc';

            return (
              <button
                key={value}
                onClick={() => handleOptionChange(optionNameLowerCase, value)}
                disabled={!isAvailableForSale}
                className={clsx(
                  'group relative flex h-12 w-12 items-center justify-center rounded-full border-3 transition-all duration-300 hover:scale-110 hover:shadow-lg',
                  {
                    'border-blue-500 ring-4 ring-blue-500/20 scale-110 shadow-lg': isActive,
                    'border-gray-300 hover:border-gray-400': !isActive && isAvailableForSale,
                    'opacity-30 cursor-not-allowed grayscale': !isAvailableForSale,
                  }
                )}
                style={{
                  background: colorValue?.includes('gradient') ? colorValue : undefined,
                  backgroundColor: !colorValue?.includes('gradient') ? colorValue : undefined,
                  borderColor: colorName === 'weiss' ? '#e5e7eb' : undefined,
                }}
                title={`${value}${!isAvailableForSale ? ' (Nicht verfügbar)' : ''}`}
                aria-label={`Farbe ${value} auswählen`}
              >
                {/* White stroke for white color visibility */}
                {colorName === 'weiss' && (
                  <div className="absolute inset-1 rounded-full border border-gray-200"></div>
                )}
                
                {/* Check mark for selected state */}
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-5 w-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {/* Out of stock indicator */}
                {!isAvailableForSale && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-px w-8 bg-red-500 rotate-45"></div>
                  </div>
                )}
                
                {/* Hover tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {value}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPriceDisplay = () => {
    if (!selectedVariant) return null;
    
    return (
      <div className="mb-6">
        <div className={clsx(
          'text-3xl font-bold transition-all duration-300',
          {
            'scale-110 text-blue-600': priceAnimation,
            'text-gray-900': !priceAnimation,
          }
        )}>
          CHF {selectedVariant.price.amount}
          <span className="text-lg text-gray-500 ml-2">
            {selectedVariant.price.currencyCode}
          </span>
        </div>
        
        {/* Availability indicator */}
        <div className="text-sm text-gray-600 mt-1">
          {selectedVariant.availableForSale ? (
            <span className="text-green-600 font-medium">✓ Verfügbar</span>
          ) : (
            <span className="text-red-600 font-medium">✗ Ausverkauft</span>
          )}
        </div>
      </div>
    );
  };

  const renderDefaultOption = (option: ProductOption) => {
    return (
      <form key={option.id}>
        <dl className="mb-8">
          <dt className="mb-6 text-lg font-semibold text-secondary uppercase tracking-wide">
            {option.name}
          </dt>
          <dd className="flex flex-wrap gap-4">
            {option.values.map((value) => {
              const optionNameLowerCase = option.name.toLowerCase();
              const optionParams = { ...state, [optionNameLowerCase]: value };
              
              const filtered = Object.entries(optionParams).filter(([key, value]) =>
                options.find(
                  (option) => option.name.toLowerCase() === key && option.values.includes(value)
                )
              );
              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, value]) => combination[key] === value && combination.availableForSale
                )
              );
              
              const isActive = state[optionNameLowerCase] === value;

              return (
                <button
                  key={value}
                  onClick={() => handleOptionChange(optionNameLowerCase, value)}
                  disabled={!isAvailableForSale}
                  title={`${option.name} ${value}${!isAvailableForSale ? ' (Nicht verfügbar)' : ''}`}
                  className={clsx(
                    'group relative flex items-center justify-center rounded-xl border-2 bg-white px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105',
                    {
                      'border-primary bg-primary text-white shadow-lg scale-105': isActive,
                      'border-gray-200 text-secondary hover:border-primary/50 hover:bg-primary/5': !isActive && isAvailableForSale,
                      'opacity-25 cursor-not-allowed': !isAvailableForSale,
                    }
                  )}
                >
                  {value}
                  {!isAvailableForSale && (
                    <span className="ml-2 text-xs">(Ausverkauft)</span>
                  )}
                </button>
              );
            })}
          </dd>
        </dl>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {renderPriceDisplay()}
      
      {options.map((option) => {
        const optionNameLowerCase = option.name.toLowerCase();
        const isColorOption = optionNameLowerCase === 'color' || optionNameLowerCase === 'farbe';

        if (isColorOption) {
          return <div key={option.id}>{renderColorSwatches(option)}</div>;
        }

        // Default option rendering for other types
        return renderDefaultOption(option);
      })}
    </div>
  );
}
