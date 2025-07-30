'use client';

import {
    ChevronDownIcon,
    HeartIcon,
    MinusIcon,
    PlusIcon,
    ShieldCheckIcon,
    StarIcon,
    TruckIcon
} from '@heroicons/react/24/outline';
import { AddToCart } from 'components/cart/add-to-cart';
import { Product } from 'lib/shopify/types';
import { useState } from 'react';
import { VariantSelector } from './variant-selector';

interface PremiumProductInfoProps {
  product: Product;
}

export function PremiumProductInfo({ product }: PremiumProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const basePrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const totalPrice = (basePrice * quantity).toFixed(2);

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const features = [
    { icon: '🌿', text: 'Umweltfreundlich' },
    { icon: '💧', text: 'Wasserdicht' },
    { icon: '✨', text: 'Premium Qualität' },
    { icon: '🔄', text: 'Wiederverwendbar' }
  ];

  return (
    <div className="space-y-8">
      {/* Product Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            Bestseller
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-600 ml-1">(127 Bewertungen)</span>
          </div>
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary leading-tight">
          {product.title}
        </h1>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          Premium Plastik-Strohhalme, die nie matschig werden. Perfekt für jede Party und jeden Anlass.
        </p>
      </div>

      {/* Price Calculator */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-secondary">Preis</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              CHF {totalPrice}
            </div>
            {quantity > 1 && (
              <div className="text-sm text-gray-600">
                CHF {product.priceRange.minVariantPrice.amount} pro Stück
              </div>
            )}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-secondary">Menge</span>
          <div className="flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={decrementQuantity}
              className="p-3 hover:bg-gray-50 transition-colors"
              disabled={quantity <= 1}
            >
              <MinusIcon className="w-4 h-4 text-gray-600" />
            </button>
            <div className="px-4 py-3 font-semibold text-secondary min-w-[3rem] text-center">
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              className="p-3 hover:bg-gray-50 transition-colors"
            >
              <PlusIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Variant Selector */}
      <div className="space-y-4">
        <VariantSelector options={product.options} variants={product.variants} />
      </div>

      {/* Add to Cart */}
      <div className="space-y-4">
        <AddToCart product={product} />
        <button className="w-full flex items-center justify-center gap-2 py-3 px-6 border-2 border-gray-200 rounded-xl font-semibold text-secondary hover:border-primary hover:text-primary transition-colors">
          <HeartIcon className="w-5 h-5" />
          Zu Favoriten hinzufügen
        </button>
      </div>

      {/* Product Features */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-secondary mb-4">Produkteigenschaften</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-sm font-medium text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Elements */}
      <div className="grid grid-cols-1 gap-4">
        {/* Security Badges */}
        <div className="flex items-center justify-around bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Sicher bezahlen</span>
          </div>
          <div className="flex items-center gap-2">
            <TruckIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Schneller Versand</span>
          </div>
        </div>

        {/* Shipping Timeline */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h4 className="font-semibold text-secondary mb-4">Lieferung</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-gray-600">Bestellt heute</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Verpackt morgen</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Geliefert in 2-3 Tagen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-2">
        {[
          {
            id: 'details',
            title: 'Produktdetails',
            content: product.descriptionHtml || 'Hochwertige Plastik-Strohhalme mit Premium-Qualität. Perfekt für Partys, Events und den täglichen Gebrauch.'
          },
          {
            id: 'shipping',
            title: 'Versand & Rückgabe',
            content: 'Kostenloser Versand ab CHF 50. 30 Tage Rückgaberecht. Expressversand verfügbar.'
          },
          {
            id: 'care',
            title: 'Pflege & Reinigung',
            content: 'Einfach mit warmem Wasser und Seife reinigen. Spülmaschinenfest bis 60°C. Nicht für Mikrowelle geeignet.'
          }
        ].map((section) => (
          <div key={section.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => toggleAccordion(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-secondary">{section.title}</span>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeAccordion === section.id ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {activeAccordion === section.id && (
              <div className="px-4 pb-4">
                <div 
                  className="text-sm text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Customer Reviews Preview */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-secondary mb-4">Kundenbewertungen</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">M</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">Maria K.</span>
              </div>
              <p className="text-sm text-gray-600">
                "Endlich Strohhalme, die nicht matschig werden! Top Qualität und schnelle Lieferung."
              </p>
            </div>
          </div>
          <button className="text-primary text-sm font-medium hover:underline">
            Alle 127 Bewertungen anzeigen →
          </button>
        </div>
      </div>
    </div>
  );
}
