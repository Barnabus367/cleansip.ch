'use client';

import { Dialog, Transition } from '@headlessui/react';
import {
  CreditCardIcon,
  GiftIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TrashIcon,
  TruckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
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

const FREE_SHIPPING_THRESHOLD = 50;
const UPSELL_PRODUCTS = [
  { id: '1', title: 'Premium Strohhalme Set', price: '12.90', image: '/placeholder-straw.jpg' },
  { id: '2', title: 'Eco-Friendly Alternative', price: '8.50', image: '/placeholder-straw.jpg' },
];

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
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  const cartTotal = parseFloat(cart?.cost?.totalAmount?.amount || '0');
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-sm"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-sm"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl md:w-[420px] lg:w-[480px]">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <ShoppingCartIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary">Warenkorb</h2>
                    <p className="text-sm text-gray-600">
                      {cart?.totalQuantity || 0} {cart?.totalQuantity === 1 ? 'Artikel' : 'Artikel'}
                    </p>
                  </div>
                </div>
                <button 
                  aria-label="Close cart" 
                  onClick={closeCart}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <EmptyCartState />
              ) : (
                <div className="flex h-full flex-col">
                  
                  {/* Shipping Progress */}
                  <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <TruckIcon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-secondary">
                        {remainingForFreeShipping > 0 
                          ? `Noch CHF ${remainingForFreeShipping.toFixed(2)} bis Gratisversand`
                          : 'Gratisversand freigeschaltet! 🎉'
                        }
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${shippingProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="flex-1 overflow-auto">
                    <div className="p-6 space-y-4">
                      {cart.lines
                        .sort((a, b) =>
                          a.merchandise.product.title.localeCompare(
                            b.merchandise.product.title
                          )
                        )
                        .map((item, i) => (
                          <CartItem 
                            key={i} 
                            item={item} 
                            updateCartItem={updateCartItem}
                            closeCart={closeCart}
                            isLoading={loadingItemId === item.id}
                            setLoadingItemId={setLoadingItemId}
                          />
                        ))}
                    </div>

                    {/* Upsell Section */}
                    <div className="border-t border-gray-100 p-6">
                      <h3 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
                        <HeartIcon className="h-5 w-5 text-primary" />
                        Das könnte dir auch gefallen
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {UPSELL_PRODUCTS.map((product) => (
                          <div key={product.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="aspect-square bg-white rounded-lg mb-3 flex items-center justify-center">
                              <Image
                                src={product.image}
                                alt={product.title}
                                width={80}
                                height={80}
                                className="object-contain"
                              />
                            </div>
                            <h4 className="text-sm font-medium text-secondary mb-1 line-clamp-2">
                              {product.title}
                            </h4>
                            <p className="text-sm font-bold text-primary">CHF {product.price}</p>
                            <button className="w-full mt-2 bg-primary text-white py-1 px-3 rounded-lg text-xs font-medium hover:bg-primary-600 transition-colors">
                              Hinzufügen
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sticky Bottom Section */}
                  <div className="border-t border-gray-100 bg-white p-6 space-y-4">
                    
                    {/* Order Summary */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Zwischensumme</span>
                        <Price
                          amount={cart.cost.subtotalAmount.amount}
                          currencyCode={cart.cost.subtotalAmount.currencyCode}
                          className="font-medium"
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Versand</span>
                        <span className="font-medium text-primary">
                          {cartTotal >= FREE_SHIPPING_THRESHOLD ? 'Kostenlos' : 'Wird berechnet'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">MwSt.</span>
                        <Price
                          amount={cart.cost.totalTaxAmount.amount}
                          currencyCode={cart.cost.totalTaxAmount.currencyCode}
                          className="font-medium"
                        />
                      </div>
                      <div className="border-t border-gray-200 pt-3 flex justify-between">
                        <span className="text-lg font-bold text-secondary">Gesamt</span>
                        <Price
                          amount={cart.cost.totalAmount.amount}
                          currencyCode={cart.cost.totalAmount.currencyCode}
                          className="text-lg font-bold text-secondary"
                        />
                      </div>
                    </div>

                    {/* Trust Elements */}
                    <div className="flex items-center justify-center gap-6 py-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <ShieldCheckIcon className="h-4 w-4" />
                        <span>Sicher</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <TruckIcon className="h-4 w-4" />
                        <span>Schnell</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <GiftIcon className="h-4 w-4" />
                        <span>30 Tage Rückgabe</span>
                      </div>
                    </div>

                    {/* Split Checkout Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                      <form action={redirectToCheckout} className="col-span-2">
                        <CheckoutButton isLoading={isLoading} />
                      </form>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center">
                        <CreditCardIcon className="h-5 w-5" />
                      </button>
                    </div>
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

// Empty Cart State Component
function EmptyCartState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center mb-6">
        <ShoppingCartIcon className="h-16 w-16 text-primary/60" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-2">
        Dein Warenkorb ist leer
      </h3>
      <p className="text-gray-600 mb-8 max-w-sm">
        Entdecke unsere Premium-Strohhalme und finde das perfekte Produkt für deine nächste Party!
      </p>
      <div className="space-y-3 w-full max-w-xs">
        <Link 
          href="/search"
          className="block w-full bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
        >
          Produkte entdecken
        </Link>
        <Link 
          href="/search/strohhalme"
          className="block w-full border-2 border-gray-200 text-secondary py-3 px-6 rounded-xl font-semibold hover:border-primary hover:text-primary transition-colors"
        >
          Strohhalme ansehen
        </Link>
      </div>
    </div>
  );
}

// Cart Item Component
function CartItem({ 
  item, 
  updateCartItem, 
  closeCart, 
  isLoading, 
  setLoadingItemId 
}: {
  item: any;
  updateCartItem: any;
  closeCart: () => void;
  isLoading: boolean;
  setLoadingItemId: (id: string | null) => void;
}) {
  const merchandiseSearchParams = {} as MerchandiseSearchParams;

  item.merchandise.selectedOptions.forEach(({ name, value }: any) => {
    if (value !== DEFAULT_OPTION) {
      merchandiseSearchParams[name.toLowerCase()] = value;
    }
  });

  const merchandiseUrl = createUrl(
    `/product/${item.merchandise.product.handle}`,
    new URLSearchParams(merchandiseSearchParams)
  );

  const basePrice = parseFloat(item.merchandise.price.amount);
  const totalPrice = parseFloat(item.cost.totalAmount.amount);
  const hasDiscount = item.quantity > 1 && (basePrice * item.quantity) > totalPrice;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all duration-200 group">
      <div className="flex gap-4">
        
        {/* Product Image */}
        <div className="relative">
          <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <Image
              className="h-full w-full object-contain"
              width={80}
              height={80}
              alt={item.merchandise.product.featuredImage?.altText || item.merchandise.product.title}
              src={item.merchandise.product.featuredImage?.url || '/placeholder-straw.jpg'}
            />
          </div>
          {/* Delete Button with Swipe Hint */}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => {
                setLoadingItemId(item.id);
                // DeleteItemButton functionality would be called here
              }}
              className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <TrashIcon className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <Link
            href={merchandiseUrl}
            onClick={closeCart}
            className="block group-hover:text-primary transition-colors"
          >
            <h4 className="font-semibold text-secondary mb-1 line-clamp-2">
              {item.merchandise.product.title}
            </h4>
            {item.merchandise.title !== DEFAULT_OPTION && (
              <p className="text-sm text-gray-500 mb-2">
                {item.merchandise.title}
              </p>
            )}
          </Link>

          {/* Price and Quantity */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Price
                  amount={item.cost.totalAmount.amount}
                  currencyCode={item.cost.totalAmount.currencyCode}
                  className="font-bold text-secondary"
                />
                {hasDiscount && (
                  <span className="text-xs text-gray-400 line-through">
                    CHF {(basePrice * item.quantity).toFixed(2)}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <span className="text-xs text-green-600 font-medium">
                  Mengenrabatt gespart!
                </span>
              )}
            </div>

            {/* Inline Quantity Selector */}
            <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => {
                  setLoadingItemId(item.id);
                  // EditItemQuantityButton minus functionality
                }}
                className="p-2 hover:bg-gray-100 transition-colors"
                disabled={isLoading || item.quantity <= 1}
              >
                <MinusIcon className="h-4 w-4 text-gray-600" />
              </button>
              <span className="px-3 py-2 text-sm font-semibold text-secondary min-w-[2rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => {
                  setLoadingItemId(item.id);
                  // EditItemQuantityButton plus functionality
                }}
                className="p-2 hover:bg-gray-100 transition-colors"
                disabled={isLoading}
              >
                <PlusIcon className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Gesture Hint */}
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center text-xs text-gray-400">
          <span>← Wischen zum Entfernen</span>
        </div>
      </div>
    </div>
  );
}

function CheckoutButton({ isLoading }: { isLoading?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full bg-gradient-to-r from-primary to-primary-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      type="submit"
      disabled={pending || isLoading}
    >
      {pending || isLoading ? (
        <LoadingDots className="bg-white" />
      ) : (
        <>
          <span>Zur Kasse</span>
          <CreditCardIcon className="h-5 w-5" />
        </>
      )}
    </button>
  );
}
