import { mockProducts } from 'lib/mock-data';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This would normally come from Shopify, but we're using our mock data
const product = mockProducts[0];

export async function generateMetadata(): Promise<Metadata> {
  if (!product) return notFound();

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description,
    openGraph: {
      type: 'website',
      locale: 'de_CH',
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.featuredImage.url,
          width: product.featuredImage.width,
          height: product.featuredImage.height,
          alt: product.featuredImage.altText || product.title
        }
      ]
    }
  };
}

export default function ProductPage() {
  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8">
        {/* Product Image */}
        <div className="h-full w-full basis-full lg:basis-4/6">
          <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
            <Image
              className="h-full w-full object-cover"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt={product.featuredImage.altText || product.title}
              src={product.featuredImage.url}
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="basis-full lg:basis-2/6">
          <div className="mb-6 flex flex-col border-b border-neutral-200 pb-6">
            <h1 className="mb-2 text-5xl font-medium text-secondary">{product.title}</h1>
            <div className="mr-auto w-auto rounded-full bg-primary p-2 text-sm text-white">
              {product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
            </div>
          </div>

          {/* Product Description */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-secondary">Produktbeschreibung</h3>
            <div 
              className="prose prose-sm text-secondary/80"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
            
            {/* Enhanced Description for Straws */}
            <div className="mt-4 space-y-3">
              <p className="text-sm text-secondary/70">
                <strong>Warum CleanSip wählen?</strong> Frustriert von bröckelnden Papierhalmen? 
                CleanSip bleibt stabil – vom ersten bis zum letzten Schluck.
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>100% Kunststoff-Qualität – kein Aufweichen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Schweizer Lager: 48-h-Zustellung</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>BPA-frei, lebensmittelecht</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>100 Stück pro Pack</span>
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory Info */}
          <div className="mb-6 rounded-lg bg-accent/10 p-4">
            <h4 className="mb-2 font-semibold text-secondary">Regulierungs-Info</h4>
            <p className="text-sm text-secondary/70">
              Aktuell in der Schweiz erlaubt. Keine EU-Pappe nötig. 
              CleanSip nutzt bewährte Hygiene-Standards für sichere Verwendung.
            </p>
          </div>

          {/* Shipping Info */}
          <div className="mb-6 rounded-lg bg-primary/5 p-4">
            <h4 className="mb-2 font-semibold text-secondary">Versandinfo</h4>
            <div className="space-y-1 text-sm text-secondary/70">
              <p>• A-Post Brief (untracked): <strong>CHF 2.50</strong> – bis 120g</p>
              <p>• PostPac Economy (tracked): <strong>CHF 7.00</strong> – bis 2kg</p>
              <p>• <strong>Gratis Versand</strong> ab CHF 50 Warenwert</p>
              <p className="text-primary font-medium">⚡ 48h Zustellung aus Schweizer Lager</p>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="mb-6">
            <div className="mb-4">
              <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-secondary">
                Anzahl Packs (1-10)
              </label>
              <select 
                id="quantity" 
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                defaultValue={1}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} Pack{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            
            <button 
              className="w-full rounded-md bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              disabled
            >
              In den Warenkorb (Demo-Modus)
            </button>
            
            <p className="mt-2 text-xs text-secondary/60 text-center">
              Dies ist eine Demo. Shopify-Integration erforderlich für echte Bestellungen.
            </p>
          </div>

          {/* Coming Soon Products Teaser */}
          <div className="rounded-lg border border-neutral-200 p-4">
            <h4 className="mb-2 font-semibold text-secondary">Mehr Produkte demnächst</h4>
            <p className="mb-3 text-sm text-secondary/70">
              Party Cups, Rührstäbchen und Besteck folgen bald!
            </p>
            <Link 
              href="/coming-soon"
              className="inline-block text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Benachrichtigung erhalten →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
