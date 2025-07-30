'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
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

// Bundle configurations with savings
const bundleConfigs: Record<string, { pieces: number; savingsPercent: number; popular?: boolean }> = {
  '25': { pieces: 25, savingsPercent: 0 },
  '50': { pieces: 50, savingsPercent: 5, popular: true },
  '100': { pieces: 100, savingsPercent: 10 },
  '200': { pieces: 200, savingsPercent: 15 },
  '500': { pieces: 500, savingsPercent: 20 },
  '1000': { pieces: 1000, savingsPercent: 25 },
};

// Stock level thresholds
const getStockLevel = (variantId: string): { level: number; max: number; status: 'high' | 'medium' | 'low' | 'out' } => {
  // This would typically come from your inventory system
  // For demo purposes, using mock data
  const mockStock = Math.floor(Math.random() * 100);
  const max = 100;
  
  if (mockStock === 0) return { level: 0, max, status: 'out' };
  if (mockStock < 20) return { level: mockStock, max, status: 'low' };
  if (mockStock < 50) return { level: mockStock, max, status: 'medium' };
  return { level: mockStock, max, status: 'high' };
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const [priceAnimation, setPriceAnimation] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(null);

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

  // Find current variant based on selected options
  useEffect(() => {
    const variant = combinations.find((combination) =>
      Object.entries(state).every(([key, value]) => combination[key] === value)
    );
    if (variant) {
      const fullVariant = variants.find(v => v.id === variant.id);
      setCurrentVariant(fullVariant || null);
      // Trigger price animation when variant changes
      setPriceAnimation(true);
      setTimeout(() => setPriceAnimation(false), 300);
    }
  }, [state, combinations, variants]);

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
            const colorValue = colorMap[value.toLowerCase()];

            return (
              <button
                key={value}
                onClick={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateURL(newState);
                }}
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
                  borderColor: value.toLowerCase() === 'weiss' ? '#e5e7eb' : undefined,
                }}
                title={`${value}${!isAvailableForSale ? ' (Nicht verfügbar)' : ''}`}
              >
                {/* White stroke for white color visibility */}
                {value.toLowerCase() === 'weiss' && (
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

  const renderQuantityToggle = (option: ProductOption) => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Menge</h3>
          <span className="text-sm text-gray-500">
            {state[option.name.toLowerCase()] || 'Wähle eine Menge'}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
            const bundleConfig = bundleConfigs[value];
            
            return (
              <button
                key={value}
                onClick={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateURL(newState);
                }}
                disabled={!isAvailableForSale}
                className={clsx(
                  'relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg',
                  {
                    'border-blue-500 bg-blue-50 shadow-lg scale-105': isActive,
                    'border-gray-200 bg-white hover:border-blue-300': !isActive && isAvailableForSale,
                    'opacity-30 cursor-not-allowed': !isAvailableForSale,
                  }
                )}
              >
                {/* Popular badge */}
                {bundleConfig?.popular && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Beliebt
                  </div>
                )}
                
                {/* Savings badge */}
                {bundleConfig && bundleConfig.savingsPercent > 0 && (
                  <div className="absolute -top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    -{bundleConfig.savingsPercent}%
                  </div>
                )}
                
                <div className="text-center">
                  {/* Quantity with visual indicators */}
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">{value}</span>
                    <span className="text-sm text-gray-500 ml-1">Stück</span>
                  </div>
                  
                  {/* Visual quantity indicator */}
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: Math.min(bundleConfig?.pieces || parseInt(value) / 10, 5) }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-blue-500 rounded-full mx-0.5"></div>
                    ))}
                    {(bundleConfig?.pieces || parseInt(value)) > 50 && (
                      <span className="text-xs text-gray-400 ml-1">+</span>
                    )}
                  </div>
                  
                  {/* Bundle description */}
                  {bundleConfig && (
                    <div className="text-xs text-gray-600">
                      {bundleConfig.savingsPercent > 0 ? 
                        `Spare ${bundleConfig.savingsPercent}%` : 
                        'Grundpreis'
                      }
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStockIndicator = () => {
    if (!currentVariant) return null;
    
    const stock = getStockLevel(currentVariant.id);
    
    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Verfügbarkeit</span>
          <span className={clsx(
            'text-sm font-medium',
            {
              'text-green-600': stock.status === 'high',
              'text-yellow-600': stock.status === 'medium',
              'text-red-600': stock.status === 'low',
              'text-gray-500': stock.status === 'out',
            }
          )}>
            {stock.status === 'high' && 'Auf Lager'}
            {stock.status === 'medium' && 'Begrenzt verfügbar'}
            {stock.status === 'low' && `Nur noch ${stock.level} verfügbar`}
            {stock.status === 'out' && 'Ausverkauft'}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={clsx(
              'h-2 rounded-full transition-all duration-500',
              {
                'bg-green-500': stock.status === 'high',
                'bg-yellow-500': stock.status === 'medium',
                'bg-red-500': stock.status === 'low',
                'bg-gray-400': stock.status === 'out',
              }
            )}
            style={{ width: `${(stock.level / stock.max) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderPriceDisplay = () => {
    if (!currentVariant) return null;
    
    return (
      <div className="mb-6">
        <div className={clsx(
          'text-3xl font-bold transition-all duration-300',
          {
            'scale-110 text-blue-600': priceAnimation,
            'text-gray-900': !priceAnimation,
          }
        )}>
          €{currentVariant.price.amount}
          <span className="text-lg text-gray-500 ml-2">
            {currentVariant.price.currencyCode}
          </span>
        </div>
        
        {/* Price per piece calculation */}
        {state.menge && bundleConfigs[state.menge] && (
          <div className="text-sm text-gray-600 mt-1">
            €{(parseFloat(currentVariant.price.amount) / bundleConfigs[state.menge]!.pieces).toFixed(3)} pro Stück
          </div>
        )}
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
                  onClick={() => {
                    const newState = updateOption(optionNameLowerCase, value);
                    updateURL(newState);
                  }}
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
      {renderStockIndicator()}
      
      {options.map((option) => {
        const optionNameLowerCase = option.name.toLowerCase();
        const isColorOption = optionNameLowerCase === 'color' || optionNameLowerCase === 'farbe';
        const isQuantityOption = optionNameLowerCase.includes('menge') || 
                               optionNameLowerCase.includes('anzahl') ||
                               optionNameLowerCase.includes('stück');

        if (isColorOption) {
          return <div key={option.id}>{renderColorSwatches(option)}</div>;
        }
        
        if (isQuantityOption) {
          return <div key={option.id}>{renderQuantityToggle(option)}</div>;
        }

        // Default option rendering for other types
        return renderDefaultOption(option);
      })}
    </div>
  );
}
