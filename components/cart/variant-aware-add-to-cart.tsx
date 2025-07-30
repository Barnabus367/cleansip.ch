'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useExtendedProduct } from 'components/product/extended-product-context';
import { Product } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';

function VariantAwareSubmitButton({
  product,
  isPending
}: {
  product: Product;
  isPending: boolean;
}) {
  const { selectedVariant } = useExtendedProduct();
  
  const buttonClasses =
    'relative flex w-full items-center justify-center bg-black p-4 font-mono text-sm uppercase tracking-wider text-white transition-colors duration-200 hover:bg-gray-800';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60 hover:bg-black';

  // No variant selected
  if (!selectedVariant) {
    return (
      <button 
        disabled 
        className={clsx(buttonClasses, disabledClasses)}
        aria-label="Bitte wählen Sie eine Option"
      >
        OPTIONEN WÄHLEN
      </button>
    );
  }

  // Variant not available
  if (!selectedVariant.availableForSale) {
    return (
      <button 
        disabled 
        className={clsx(buttonClasses, disabledClasses)}
      >
        AUSVERKAUFT
      </button>
    );
  }

  // Ready to add to cart
  return (
    <button
      aria-label={`${selectedVariant.title} in den Warenkorb legen`}
      disabled={isPending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': !isPending,
        'cursor-not-allowed opacity-60': isPending,
      })}
    >
      <div className="absolute left-0 ml-4">
        {!isPending ? (
          <PlusIcon className="h-5" />
        ) : (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent" />
        )}
      </div>
      {isPending ? 'WIRD HINZUGEFÜGT...' : 'IN DEN WARENKORB'}
    </button>
  );
}

export function VariantAwareAddToCart({ product }: { product: Product }) {
  const { cart } = useCart();
  const { selectedVariant } = useExtendedProduct();
  const [message, formAction, isPending] = useActionState(addItem, null);

  const handleSubmit = async (formData: FormData) => {
    if (selectedVariant) {
      await formAction(selectedVariant.id);
    }
  };

  return (
    <form action={handleSubmit}>
      {selectedVariant && (
        <input type="hidden" name="selectedVariantId" value={selectedVariant.id} />
      )}
      <VariantAwareSubmitButton product={product} isPending={isPending} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

// Simple Plus Icon component
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}
