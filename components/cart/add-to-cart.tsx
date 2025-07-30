'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';

// Try to use the extended context, fallback to basic context
function useProductContext() {
  try {
    // Try to import and use extended context
    const { useExtendedProduct } = require('components/product/extended-product-context');
    return useExtendedProduct();
  } catch {
    // Fallback to basic context
    return { ...useProduct(), selectedVariant: null };
  }
}

function SubmitButton({
  availableForSale,
  selectedVariantId,
  isPending
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  isPending: boolean;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center bg-black p-4 font-mono text-sm uppercase tracking-wider text-white transition-colors duration-200 hover:bg-gray-800';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60 hover:bg-black';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        AUSVERKAUFT
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Bitte wählen Sie eine Option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        OPTIONEN WÄHLEN
      </button>
    );
  }

  return (
    <button
      aria-label="In den Warenkorb"
      disabled={isPending}
      className={clsx(buttonClasses, {
        'opacity-75': isPending
      })}
    >
      {isPending ? 'WIRD HINZUGEFÜGT...' : 'IN DEN WARENKORB'}
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const context = useProductContext();
  const { state } = context;
  const [message, formAction, isPending] = useActionState(addItem, null);

  // Use selectedVariant from extended context if available, otherwise find by state
  const selectedVariant = 'selectedVariant' in context && context.selectedVariant
    ? context.selectedVariant
    : variants.find((variant: ProductVariant) =>
        variant.selectedOptions.every(
          (option) => option.value === state[option.name.toLowerCase()]
        )
      );

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = selectedVariant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        if (finalVariant) {
          addCartItem(finalVariant, product);
          addItemAction();
        }
      }}
    >
      <SubmitButton
        availableForSale={selectedVariant?.availableForSale ?? availableForSale}
        selectedVariantId={selectedVariantId}
        isPending={isPending}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
