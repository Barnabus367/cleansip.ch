# CleanSip - Headless E-Commerce Shop

**"Nie mehr matschige Alternativen."**

CleanSip ist ein moderner Headless-Shop für bewährte Kunststoff-Party-Basics, gebaut auf Next.js 14 + Tailwind CSS mit Shopify als Backend.

## 🎯 Projekt-Übersicht

### Brand DNA
- **Markenname**: CleanSip
- **Claim**: "Nie mehr matschige Alternativen."
- **Brand Voice**: Sachlich, lösungsorientiert, leichte Provokation gegen "Pappe & Bambus"
- **Zielgruppe**: Event-Planer, Gastronomen, Privatkunden in der Schweiz

### USP-Bullets
- ✅ 100% Kunststoff-Qualität – kein Aufweichen
- 🇨🇭 Schweizer Lager: 48-h-Zustellung  
- 🔒 Bewährte Hygiene-Standards (BPA-frei, lebensmittelecht)

## 📦 Produktsortiment

### Aktuell verfügbar
1. **CS-100** | CleanSip Strohhalme 100er Pack | 14.90 CHF | 120g

### Coming Soon (Q3 2025)
2. **PC-50** | Classic Party Cups 50er Pack | 12.90 CHF | 500g
3. **PS-100** | Pro Stirrer 100er Pack | 5.90 CHF | 150g  
4. **FB-40** | Flex Fork & Knife 40er Kit | 9.80 CHF | 300g

## 🎨 Design System

### Farben (Tailwind Extended)
```css
primary:   #00BFA6   /* Mint-Türkis */
secondary: #003B46   /* Tiefes Petrol */  
accent:    #FFD54F   /* Warmes Gelb */
neutral:   #F9FAFB   /* Hellgrau */
```

### Typografie
- **Base Font**: Inter, system-ui
- **Hierarchie**: Klare Strukturierung mit serifenloser Schrift

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.0 (App Router)
- **Styling**: Tailwind CSS v4
- **Backend**: Shopify Storefront API
- **TypeScript**: Vollständig typisiert
- **Image Optimization**: Next.js Image Component
- **Deployment**: Vercel-ready

## 🛠 Development Setup

### Installation
```bash
# Dependencies installieren
npm install

# Development Server starten  
npm run dev

# Production Build
npm run build

# Linting
npm run prettier:check
```

### Environment Variables
Erstelle eine `.env.local` Datei:
```bash
COMPANY_NAME="CleanSip"
SITE_NAME="CleanSip"
SHOPIFY_REVALIDATION_SECRET="your-secret-here"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-token-here"  
SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
```

## 📱 Features Implementiert

### ✅ Core Funktionalität
- [x] **Homepage mit Hero-Section** - CleanSip Branding & USPs
- [x] **Responsive Navigation** - Mehrprodukt-Kategorien vorbereitet
- [x] **Produktgrid** - Mit Fallback auf Mock-Daten bei Shopify-Ausfall
- [x] **Coming Soon Seite** - Newsletter-Anmeldung für künftige Produkte
- [x] **Produktdetailseite** - Vollständig ausgearbeitet für Strohhalme
- [x] **Mehrsprachig (DE-CH)** - Schweizer Zielgruppe optimiert

### ✅ Business Logic
- [x] **Versandlogik** - CHF 2.50 / 7.00 / Gratis ab CHF 50
- [x] **Regulatory Compliance** - Hinweise zu CH-Gesetzgebung
- [x] **Mock-Daten Fallback** - Funktioniert ohne Shopify-Setup
- [x] **SEO-Optimiert** - Meta-Tags, OpenGraph, deutsche Suchbegriffe

### ✅ UX/UI Features  
- [x] **Brand-konsistente Farbpalette** - Primary/Secondary/Accent
- [x] **Accessibility** - Focus States, Screen Reader Support
- [x] **Performance** - Optimierte Images, Lazy Loading
- [x] **Mobile-First** - Responsive Grid & Navigation

## 🎯 Nächste Schritte

### Phase 1: Shopify Integration
- [ ] Shopify Store Setup mit echten Produkten
- [ ] Storefront API Token konfigurieren  
- [ ] Inventory Management aktivieren
- [ ] Payment Gateway (Stripe/PostFinance) setup

### Phase 2: Advanced Features
- [ ] Cart Functionality mit persistenter Session
- [ ] Customer Accounts & Login
- [ ] Bestellhistorie & Tracking
- [ ] Newsletter-Integration (Shopify Customer API)

### Phase 3: Marketing & Analytics
- [ ] Google Analytics / Plausible Setup
- [ ] SEO-Audit & Content-Optimierung
- [ ] Social Media Integration  
- [ ] A/B Testing für Conversion-Optimierung

## 🚚 Versandoptionen

| Methode | Preis | Gewichtslimit | Tracking |
|---------|-------|---------------|----------|
| A-Post Brief | CHF 2.50 | bis 120g | ❌ |
| PostPac Economy | CHF 7.00 | bis 2kg | ✅ |
| **Gratis Versand** | CHF 0.00 | ab CHF 50 | ✅ |

*Alle Sendungen: 48h Zustellung aus Schweizer Lager*

## 📄 Rechtliches

### Compliance
- **Aktuell in der Schweiz erlaubt** - Keine EU-Pappe-Regulierung
- **BPA-frei & lebensmittelecht** - Erfüllt CH-Hygienestandards
- **Rest-Stock Verkauf** - "Solange erlaubt" Positionierung

### Datenschutz  
- DSGVO-konform für EU-Kunden
- Schweizer Datenschutzgesetz-konform
- Cookie-Banner Integration geplant

---

## 💡 Brand Positioning

**CleanSip positioniert sich bewusst als Alternative zu "matschigen" nachhaltigen Lösungen.** 

Wir sprechen Kunden an, die Wert auf **Funktionalität** und **Zuverlässigkeit** legen, ohne auf **Hygiene-Standards** zu verzichten. Die sachliche, leicht provokante Brand Voice unterscheidet uns von "Öko-Wellness"-Konkurrenten.

**Kern-Message**: *"Warum Kompromisse eingehen, wenn es auch stabil geht?"*

---

**Built with ❤️ for stable alternatives** | [cleansip.ch](https://cleansip.ch)

# Next.js Commerce

A high-performance, server-rendered Next.js App Router ecommerce application.

This template uses React Server Components, Server Actions, `Suspense`, `useOptimistic`, and more.

<h3 id="v1-note"></h3>

> Note: Looking for Next.js Commerce v1? View the [code](https://github.com/vercel/commerce/tree/v1), [demo](https://commerce-v1.vercel.store), and [release notes](https://github.com/vercel/commerce/releases/tag/v1).

## Providers

Vercel will only be actively maintaining a Shopify version [as outlined in our vision and strategy for Next.js Commerce](https://github.com/vercel/commerce/pull/966).

Vercel is happy to partner and work with any commerce provider to help them get a similar template up and running and listed below. Alternative providers should be able to fork this repository and swap out the `lib/shopify` file with their own implementation while leaving the rest of the template mostly unchanged.

- Shopify (this repository)
- [BigCommerce](https://github.com/bigcommerce/nextjs-commerce) ([Demo](https://next-commerce-v2.vercel.app/))
- [Ecwid by Lightspeed](https://github.com/Ecwid/ecwid-nextjs-commerce/) ([Demo](https://ecwid-nextjs-commerce.vercel.app/))
- [Geins](https://github.com/geins-io/vercel-nextjs-commerce) ([Demo](https://geins-nextjs-commerce-starter.vercel.app/))
- [Medusa](https://github.com/medusajs/vercel-commerce) ([Demo](https://medusa-nextjs-commerce.vercel.app/))
- [Prodigy Commerce](https://github.com/prodigycommerce/nextjs-commerce) ([Demo](https://prodigy-nextjs-commerce.vercel.app/))
- [Saleor](https://github.com/saleor/nextjs-commerce) ([Demo](https://saleor-commerce.vercel.app/))
- [Shopware](https://github.com/shopwareLabs/vercel-commerce) ([Demo](https://shopware-vercel-commerce-react.vercel.app/))
- [Swell](https://github.com/swellstores/verswell-commerce) ([Demo](https://verswell-commerce.vercel.app/))
- [Umbraco](https://github.com/umbraco/Umbraco.VercelCommerce.Demo) ([Demo](https://vercel-commerce-demo.umbraco.com/))
- [Wix](https://github.com/wix/headless-templates/tree/main/nextjs/commerce) ([Demo](https://wix-nextjs-commerce.vercel.app/))
- [Fourthwall](https://github.com/FourthwallHQ/vercel-commerce) ([Demo](https://vercel-storefront.fourthwall.app/))

> Note: Providers, if you are looking to use similar products for your demo, you can [download these assets](https://drive.google.com/file/d/1q_bKerjrwZgHwCw0ovfUMW6He9VtepO_/view?usp=sharing).

## Integrations

Integrations enable upgraded or additional functionality for Next.js Commerce

- [Orama](https://github.com/oramasearch/nextjs-commerce) ([Demo](https://vercel-commerce.oramasearch.com/))

  - Upgrades search to include typeahead with dynamic re-rendering, vector-based similarity search, and JS-based configuration.
  - Search runs entirely in the browser for smaller catalogs or on a CDN for larger.

- [React Bricks](https://github.com/ReactBricks/nextjs-commerce-rb) ([Demo](https://nextjs-commerce.reactbricks.com/))
  - Edit pages, product details, and footer content visually using [React Bricks](https://www.reactbricks.com) visual headless CMS.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopify store.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

<details>
  <summary>Expand if you work at Vercel and want to run locally and / or contribute</summary>

1. Run `vc link`.
1. Select the `Vercel Solutions` scope.
1. Connect to the existing `commerce-shopify` project.
1. Run `vc env pull` to get environment variables.
1. Run `pnpm dev` to ensure everything is working correctly.
</details>

## Vercel, Next.js Commerce, and Shopify Integration Guide

You can use this comprehensive [integration guide](https://vercel.com/docs/integrations/ecommerce/shopify) with step-by-step instructions on how to configure Shopify as a headless CMS using Next.js Commerce as your headless Shopify storefront on Vercel.
