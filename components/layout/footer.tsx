import Link from 'next/link';
import { FEATURE_FLAGS } from 'lib/constants';
import { getMenu } from 'lib/shopify';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2025 + (currentYear > 2025 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700';
  
  let menu = [];
  try {
    menu = await getMenu('next-js-frontend-footer-menu');
  } catch (error) {
    // Fallback menu for CleanSip
    menu = [];
  }

  return (
    <footer className="text-sm text-secondary/60 bg-neutral">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-secondary/10 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div className="space-y-4">
          <Link className="flex items-center gap-2 text-secondary" href="/">
            <img
              src="/brand/logos/logo-icon-primary.svg"
              alt="CleanSip Logo"
              className="h-8 w-8"
            />
            <span className="font-semibold">CleanSip</span>
          </Link>
          <p className="max-w-xs text-xs leading-relaxed">
            Nie mehr matschige Alternativen. CleanSip liefert bewährte Kunststoff-Basics für deine Events und den täglichen Gebrauch.
          </p>
        </div>
        
        {/* CleanSip specific footer content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 flex-1">
          <div>
            <h3 className="font-semibold text-secondary mb-3">Produkte</h3>
            <ul className="space-y-2 text-xs">
              {FEATURE_FLAGS.SHOW_STROHHALME && (
                <li><Link href="/search/strohhalme" className="hover:text-primary transition-colors">Strohhalme</Link></li>
              )}
              {!FEATURE_FLAGS.SHOW_PARTY_CUPS && (
                <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Party Cups <span className="text-accent text-xs">(Coming Soon)</span></Link></li>
              )}
              {!FEATURE_FLAGS.SHOW_RUEHRSTABCHEN && (
                <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Rührstäbchen <span className="text-accent text-xs">(Coming Soon)</span></Link></li>
              )}
              {!FEATURE_FLAGS.SHOW_BESTECK && (
                <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Besteck <span className="text-accent text-xs">(Coming Soon)</span></Link></li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-secondary mb-3">Service</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/versand" className="hover:text-primary transition-colors">Versand & Lieferung</Link></li>
              <li><Link href="/kontakt" className="hover:text-primary transition-colors">Kontakt</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-secondary mb-3">Rechtliches</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/impressum" className="hover:text-primary transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link></li>
              <li><Link href="/agb" className="hover:text-primary transition-colors">AGB</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-secondary mb-3">Versandinfo</h3>
            <ul className="space-y-2 text-xs">
              <li>A-Post Brief: CHF 2.50</li>
              <li>PostPac Economy: CHF 7.00</li>
              <li>Gratis ab CHF 50</li>
              <li className="text-primary font-medium">48h Zustellung</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Newsletter CTA */}
      <div className="border-t border-secondary/10 bg-primary/5 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-secondary mb-2">
              Neue Produkte? 
            </h4>
            <p className="text-sm text-secondary/70 mb-4">
              Trag dich ein und erfahre zuerst, wenn Party Cups & Co. live gehen!
            </p>
            <Link 
              href="/coming-soon"
              className="inline-block bg-primary text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Benachrichtigung erhalten
            </Link>
          </div>
        </div>
      </div>
      
      <div className="border-t border-secondary/10 py-6 text-xs bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p className="text-secondary/60">
            &copy; {copyrightDate} CleanSip. Alle Rechte vorbehalten.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-secondary/20 md:inline-block" />
          <p className="text-secondary/60">
            Aktuell in der Schweiz erlaubt. Keine EU-Pappe nötig.
          </p>
          <p className="md:ml-auto text-secondary/40">
            Gebaut mit ❤️ für stabile Alternativen
          </p>
        </div>
      </div>
    </footer>
  );
}
