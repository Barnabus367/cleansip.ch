import { FEATURE_FLAGS } from 'lib/constants';
import Link from 'next/link';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2025 + (currentYear > 2025 ? `-${currentYear}` : '');

  return (
    <footer className="bg-white border-t-2 border-black">
      {/* Main Footer Content */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div>
              <Link href="/" className="font-mono text-xl uppercase tracking-[0.3em] font-black text-black mb-4 block">
                CLEANSIP
              </Link>
              <p className="text-secondary-500/70 text-sm mb-4 leading-relaxed">
                Premium Plastikstrohhalme für professionelle Anwendungen. 
                Schweizer Qualität seit 2025.
              </p>
              <div className="text-sm text-secondary-500/60">
                <p>CleanSip AG</p>
                <p>Schweiz</p>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-mono text-sm uppercase tracking-wider font-bold text-black mb-4">
                Produkte
              </h3>
              <ul className="space-y-2">
                {FEATURE_FLAGS.SHOW_STROHHALME && (
                  <li>
                    <Link href="/search/strohhalme" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                      Strohhalme
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/coming-soon" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    Party Cups
                  </Link>
                </li>
                <li>
                  <Link href="/coming-soon" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    Rührstäbchen
                  </Link>
                </li>
                <li>
                  <Link href="/coming-soon" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    Besteck Sets
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service */}
            <div>
              <h3 className="font-mono text-sm uppercase tracking-wider font-bold text-black mb-4">
                Service
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/versand" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    Versand & Lieferung
                  </Link>
                </li>
                <li>
                  <Link href="/retouren" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    Retouren
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    Kundensupport
                  </Link>
                </li>
                <li>
                  <Link href="/b2b" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    B2B Anfragen
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-mono text-sm uppercase tracking-wider font-bold text-black mb-4">
                Unternehmen
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/ueber-uns" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    Über CleanSip
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href="/impressum" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz" className="text-secondary-500/70 hover:text-black text-sm transition-colors">
                    Datenschutz
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Payment & Shipping Info */}
      <div className="bg-white border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            
            {/* Payment Methods */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-black mb-3">
                Zahlungsmethoden
              </h4>
              <div className="flex flex-wrap gap-3">
                {['TWINT', 'PostFinance', 'Visa', 'Mastercard', 'Rechnung'].map((method) => (
                  <div key={method} className="bg-gray-100 border border-black/20 px-3 py-1 text-xs font-mono">
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Partners */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-black mb-3">
                Versandpartner
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Swiss Post', 'DHL Express', 'Selbstabholung'].map((partner) => (
                  <div key={partner} className="bg-gray-100 border border-black/20 px-3 py-1 text-xs font-mono">
                    {partner}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Copyright */}
          <div className="font-mono text-xs uppercase tracking-wider">
            © {copyrightDate} CleanSip AG. Alle Rechte vorbehalten.
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-6">
            <Link href="/agb" className="font-mono text-xs uppercase tracking-wider text-white/80 hover:text-white transition-colors">
              AGB
            </Link>
            <Link href="/widerrufsrecht" className="font-mono text-xs uppercase tracking-wider text-white/80 hover:text-white transition-colors">
              Widerrufsrecht
            </Link>
            <Link href="/cookies" className="font-mono text-xs uppercase tracking-wider text-white/80 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>

          {/* Swiss Quality Badge */}
          <div className="bg-white text-black px-3 py-1 text-xs font-mono font-bold border-2 border-white">
            SWISS QUALITY
          </div>

        </div>
      </div>
    </footer>
  );
}
