'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FEATURE_FLAGS } from 'lib/constants';

// Future products data - controlled by feature flags
const futureProducts = [
  {
    id: 'PC-50',
    name: 'Classic Party Cups 50er Pack',
    price: '12.90 CHF',
    weight: '500 g',
    icon: '/brand/icons/icon-cup.svg',
    description: 'Stabile Plastikbecher für deine Party – ohne Durchweichen oder Bruch.',
    featureFlag: 'SHOW_PARTY_CUPS'
  },
  {
    id: 'PS-100', 
    name: 'Pro Stirrer 100er Pack',
    price: '5.90 CHF',
    weight: '150 g',
    icon: '/brand/icons/icon-straw.svg',
    description: 'Holzfreie Rührstäbchen für jeden Anlass – hygienisch und stabil.',
    featureFlag: 'SHOW_RUEHRSTABCHEN'
  },
  {
    id: 'FB-40',
    name: 'Flex Fork & Knife 40er Kit',
    price: '9.80 CHF',
    weight: '300 g', 
    icon: '/brand/icons/icon-delivery.svg',
    description: 'Kunststoff-Besteck-Kit für unterwegs – praktisch und robust.',
    featureFlag: 'SHOW_BESTECK'
  }
];

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Filter products based on feature flags - only show products that are NOT yet available
  const visibleProducts = futureProducts.filter(product => 
    !FEATURE_FLAGS[product.featureFlag as keyof typeof FEATURE_FLAGS]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Shopify Customer API integration
    console.log('Subscribe:', { email, products: selectedProducts });
    setIsSubmitted(true);
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // If no products are in coming soon state, redirect to main shop
  if (visibleProducts.length === 0) {
    return (
      <div className="bg-neutral min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-secondary mb-4">
            Alle Produkte sind jetzt verfügbar!
          </h1>
          <p className="text-lg text-secondary/80 mb-8">
            Entdecke unser komplettes Sortiment im Shop.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            Zum Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-neutral/20">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-secondary hover:text-primary transition-colors">
              ← Zurück zum Shop
            </Link>
            <div className="text-sm text-secondary/60">Coming Soon</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
            Neue Produkte in Kürze verfügbar
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary/80">
            CleanSip erweitert das Sortiment! Erfahre als Erste:r, wenn Party Cups, Rührstäbchen und Besteck live gehen.
          </p>
        </div>

        {/* Product Preview */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <div 
              key={product.id} 
              className={`rounded-lg border p-6 shadow-sm transition-all cursor-pointer ${
                selectedProducts.includes(product.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-neutral/20 bg-white hover:border-primary/30'
              }`}
              onClick={() => toggleProduct(product.id)}
            >
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4">
                <Image
                  src={product.icon}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="transition-opacity hover:opacity-80"
                />
              </div>
              <h3 className="text-lg font-semibold text-secondary text-center">{product.name}</h3>
              <p className="mt-2 text-sm text-secondary/70 text-center">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-primary">{product.price}</span>
                <span className="text-sm text-secondary/50">{product.weight}</span>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <div className={`h-5 w-5 rounded border-2 transition-colors ${
                  selectedProducts.includes(product.id)
                    ? 'bg-primary border-primary'
                    : 'border-neutral/30'
                }`}>
                  {selectedProducts.includes(product.id) && (
                    <svg className="h-3 w-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="ml-2 text-sm text-secondary/70">
                  {selectedProducts.includes(product.id) ? 'Benachrichtigung aktiv' : 'Für Benachrichtigung auswählen'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mx-auto mt-16 max-w-lg">
          <div className="rounded-lg bg-white p-8 shadow-sm border border-neutral/20">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-secondary">
                    Benachrichtigung erhalten
                  </h3>
                  <p className="mt-2 text-sm text-secondary/70">
                    {selectedProducts.length > 0 
                      ? `Erhalte eine E-Mail, wenn ${selectedProducts.length} ausgewählte Produkte verfügbar sind.`
                      : 'Wähle Produkte aus und trage deine E-Mail ein.'
                    }
                  </p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary">
                    E-Mail-Adresse
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border border-neutral/30 px-3 py-2 text-secondary placeholder-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="deine@email.ch"
                  />
                </div>

                <button
                  type="submit"
                  disabled={selectedProducts.length === 0 || !email}
                  className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Benachrichtigung aktivieren
                </button>

                <p className="text-xs text-secondary/60 text-center">
                  Keine Spam-Mails. Nur eine Benachrichtigung pro Produkt-Launch.
                </p>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary">Perfekt!</h3>
                <p className="text-sm text-secondary/70">
                  Du erhältst eine E-Mail, sobald deine ausgewählten Produkte verfügbar sind.
                </p>
                <Link 
                  href="/"
                  className="inline-block text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Zurück zum Shop →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mx-auto mt-16 max-w-4xl text-center">
          <div className="rounded-lg bg-accent/10 p-6">
            <h4 className="text-lg font-semibold text-secondary mb-3">
              Warum CleanSip erweitert wird
            </h4>
            <p className="text-sm text-secondary/70 leading-relaxed">
              Nach dem erfolgreichen Start unserer Plastikstrohhalme erweitern wir das Sortiment um weitere bewährte Kunststoff-Basics. 
              Keine matschigen Alternativen – nur stabile, hygienische Lösungen für deine Events und den täglichen Gebrauch.
              <br /><br />
              <strong>Launch geplant:</strong> Q3 2025 | <strong>Versand:</strong> Weiterhin 48h aus dem Schweizer Lager
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
