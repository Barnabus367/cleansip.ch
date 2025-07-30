'use client';

import { Dialog, Transition } from '@headlessui/react';
import LoadingDots from 'components/loading-dots';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createCartAndSetCookie, redirectToCheckout } from './actions';
import { useCart } from './cart-context';
import OpenCart from './open-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

function SubmitButton({
  children,
  disabledClassName,
  ...props
}: {
  children: React.ReactNode;
  disabledClassName?: string;
  [key: string]: any;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      disabled={pending}
      className={pending ? disabledClassName : props.className}
    >
      {pending ? <LoadingDots className="bg-white" /> : children}
    </button>
  );
}

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (cart?.totalQuantity !== quantityRef.current) {
      if (cart?.totalQuantity) {
        quantityRef.current = cart?.totalQuantity;
      }
    }
  }, [cart?.totalQuantity]);

  const cartTotal = parseFloat(cart?.cost?.totalAmount?.amount || '0');

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed right-0 top-0 bottom-0 w-[400px] bg-white shadow-[-20px_0_0_rgba(0,0,0,0.1)] flex flex-col">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b-2 border-black bg-white">
                <h2 className="font-mono text-lg uppercase tracking-wider font-black">
                  CART ({cart?.totalQuantity || 0})
                </h2>
                <button 
                  aria-label="Close cart" 
                  onClick={closeCart}
                  className="font-mono text-sm uppercase tracking-wider hover:font-black"
                >
                  CLOSE
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {!cart || cart.lines.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-black mb-4"></div>
                      <h3 className="font-mono text-sm uppercase tracking-wider font-black mb-2">
                        CART EMPTY
                      </h3>
                      <p className="font-mono text-xs text-gray-600 mb-6">
                        Add items to continue
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    {cart.lines.map((item, i) => {
                      const merchandiseSearchParams = {} as MerchandiseSearchParams;

                      item.merchandise.selectedOptions.forEach(({ name, value }) => {
                        if (value !== DEFAULT_OPTION) {
                          merchandiseSearchParams[name.toLowerCase()] = value;
                        }
                      });

                      const merchandiseUrl = createUrl(
                        `/products/${item.merchandise.product.handle}`,
                        new URLSearchParams(merchandiseSearchParams)
                      );

                      return (
                        <div key={i} className="bg-white border-2 border-black p-4">
                          <div className="flex gap-4">
                            <div className="relative w-16 h-16 bg-gray-100">
                              <Image
                                className="object-cover filter grayscale"
                                fill
                                alt={
                                  item.merchandise.product.featuredImage.altText ||
                                  item.merchandise.product.title
                                }
                                src={item.merchandise.product.featuredImage.url}
                              />
                            </div>
                            <div className="flex-1">
                              <Link href={merchandiseUrl} onClick={closeCart}>
                                <h3 className="font-mono text-xs uppercase tracking-wider font-black mb-1">
                                  {item.merchandise.product.title}
                                </h3>
                              </Link>
                              
                              {item.merchandise.title !== DEFAULT_OPTION && (
                                <p className="font-mono text-xs text-gray-600 mb-2">
                                  {item.merchandise.title}
                                </p>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <div className="font-mono text-xs">
                                  QTY: {item.quantity}
                                </div>
                                <div className="font-mono text-xs font-black">
                                  <Price
                                    className=""
                                    amount={item.cost.totalAmount.amount}
                                    currencyCode={item.cost.totalAmount.currencyCode}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Checkout */}
              {cart && cart.lines.length > 0 && (
                <div className="border-t-2 border-black p-6 bg-white">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm uppercase tracking-wider">
                        Total
                      </span>
                      <span className="font-mono text-lg font-black">
                        <Price
                          className=""
                          amount={cart.cost.totalAmount.amount}
                          currencyCode={cart.cost.totalAmount.currencyCode}
                        />
                      </span>
                    </div>
                    
                    <form action={redirectToCheckout}>
                      <SubmitButton
                        className="w-full bg-black text-white py-4 font-mono text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
                        disabledClassName="w-full bg-gray-400 text-white py-4 font-mono text-sm uppercase tracking-wider cursor-not-allowed"
                      >
                        CHECKOUT
                      </SubmitButton>
                    </form>
                  </div>
                </div>
              )}
              
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
