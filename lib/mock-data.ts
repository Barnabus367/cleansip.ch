import type { Product } from './shopify/types';

// Mock data for CleanSip when Shopify is not configured
export const mockProducts: Product[] = [
  {
    id: 'cs-100-strohhalme',
    handle: 'cleansip-100',
    title: 'CleanSip Strohhalme 100er Pack',
    description: 'Frustriert von bröckelnden Papierhalmen? CleanSip bleibt stabil – vom ersten bis zum letzten Schluck.',
    descriptionHtml: '<p>Frustriert von bröckelnden Papierhalmen? CleanSip bleibt stabil – vom ersten bis zum letzten Schluck.</p>',
    availableForSale: true,
    options: [
      {
        id: 'option-1',
        name: 'Title',
        values: ['Default Title']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '14.90',
        currencyCode: 'CHF'
      },
      minVariantPrice: {
        amount: '14.90',
        currencyCode: 'CHF'
      }
    },
    variants: [
      {
        id: 'variant-1',
        title: 'Default Title',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Title',
            value: 'Default Title'
          }
        ],
        price: {
          amount: '14.90',
          currencyCode: 'CHF'
        }
      }
    ],
    featuredImage: {
      url: '/placeholder-straw.jpg',
      altText: 'CleanSip Strohhalme 100er Pack',
      width: 500,
      height: 500
    },
    images: [
      {
        url: '/placeholder-straw.jpg',
        altText: 'CleanSip Strohhalme 100er Pack',
        width: 500,
        height: 500
      }
    ],
    seo: {
      title: 'CleanSip Strohhalme 100er Pack',
      description: 'Frustriert von bröckelnden Papierhalmen? CleanSip bleibt stabil – vom ersten bis zum letzten Schluck.'
    },
    tags: ['strohhalme', 'plastik', 'party'],
    updatedAt: '2025-07-30T00:00:00Z'
  }
];

export const mockCollections = [
  {
    handle: 'strohhalme',
    title: 'Strohhalme',
    description: 'Stabile Plastikstrohhalme die nicht aufweichen',
    seo: {
      title: 'Strohhalme | CleanSip',
      description: 'Stabile Plastikstrohhalme die nicht aufweichen'
    },
    updatedAt: '2025-07-30T00:00:00Z',
    path: '/search/strohhalme'
  },
  {
    handle: 'party-cups',
    title: 'Party Cups',
    description: 'Coming Soon - Stabile Plastikbecher',
    seo: {
      title: 'Party Cups | CleanSip',
      description: 'Coming Soon - Stabile Plastikbecher'
    },
    updatedAt: '2025-07-30T00:00:00Z',
    path: '/coming-soon'
  }
];

export const mockMenu = [
  { title: 'Home', path: '/' },
  { title: 'Strohhalme', path: '/search/strohhalme' },
  { title: 'Party Cups', path: '/coming-soon' },
  { title: 'Rührstäbchen', path: '/coming-soon' },
  { title: 'Besteck', path: '/coming-soon' }
];
