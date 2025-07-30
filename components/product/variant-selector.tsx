'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/shopify/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

// Color mapping for visual selectors
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
  'farbig': 'linear-gradient(45deg, #DC2626, #EA580C, #EAB308, #16A34A, #06B6D4, #2563EB, #9333EA)',
  'gestreift': 'repeating-linear-gradient(45deg, #000 0px, #000 4px, #FFF 4px, #FFF 8px)',
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

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-8">
        <dt className="mb-6 text-lg font-semibold text-secondary uppercase tracking-wide">
          {option.name}
        </dt>
        <dd className="flex flex-wrap gap-4">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            // Base option params on current selectedOptions so we can preserve any other param state.
            const optionParams = { ...state, [optionNameLowerCase]: value };

            // Filter out invalid options and check if the option combination is available for sale.
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

            // The option is active if it's in the selected options.
            const isActive = state[optionNameLowerCase] === value;
            
            // Check if this is a color option
            const isColorOption = optionNameLowerCase === 'color' || optionNameLowerCase === 'farbe';
            const colorValue = colorMap[value.toLowerCase()];

            if (isColorOption && colorValue) {
              return (
                <button
                  formAction={() => {
                    const newState = updateOption(optionNameLowerCase, value);
                    updateURL(newState);
                  }}
                  key={value}
                  aria-disabled={!isAvailableForSale}
                  disabled={!isAvailableForSale}
                  title={`${option.name} ${value}${!isAvailableForSale ? ' (Nicht verfügbar)' : ''}`}
                  className={clsx(
                    'group relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-110',
                    {
                      'border-primary ring-4 ring-primary/20 scale-110': isActive,
                      'border-gray-300 hover:border-primary/50': !isActive && isAvailableForSale,
                      'opacity-25 cursor-not-allowed': !isAvailableForSale,
                    }
                  )}
                  style={{
                    background: colorValue.includes('gradient') ? colorValue : undefined,
                    backgroundColor: !colorValue.includes('gradient') ? colorValue : undefined,
                  }}
                >
                  {!isAvailableForSale && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-px w-8 bg-red-500 rotate-45"></div>
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-4 w-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {value}
                  </div>
                </button>
              );
            }

            // Default button for non-color options
            return (
              <button
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateURL(newState);
                }}
                key={value}
                aria-disabled={!isAvailableForSale}
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
  ));
}
