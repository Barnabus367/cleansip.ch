/**
 * Trust Section - Professional trust indicators for CleanSip
 * Conservative design for adult B2B and B2C customers
 */

import Link from 'next/link';

interface TrustBadge {
  title: string;
  description: string;
  icon: string; // Simple text icons, no emojis
}

const TRUST_INDICATORS: TrustBadge[] = [
  {
    title: 'Schweizer Qualität',
    description: 'Hergestellt nach höchsten Qualitätsstandards',
    icon: 'CH'
  },
  {
    title: 'Gratis Versand',
    description: 'Kostenlose Lieferung ab CHF 50',
    icon: '24h'
  },
  {
    title: 'BPA-frei',
    description: 'Lebensmittelecht und gesundheitlich unbedenklich',
    icon: 'BPA'
  },
  {
    title: 'Schnelle Lieferung',
    description: 'Expressversand in der ganzen Schweiz',
    icon: 'Express'
  }
];

const QUALITY_METRICS = [
  { label: 'Zufriedene Kunden', value: '500+' },
  { label: 'Bewertung', value: '4.8/5' },
  { label: 'Wiederholungskäufer', value: '85%' }
];

export default function TrustSection() {
  return (
    <section className="relative bg-white py-16 lg:py-24 border-t-2 border-b-2 border-black">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Vertrauen Sie auf Qualität
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            CleanSip steht für zuverlässige Produkte und erstklassigen Service im Schweizer Markt
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {TRUST_INDICATORS.map((badge, index) => (
            <div 
              key={index}
              className="bg-gray-50 border-2 border-black shadow-brutal p-6 text-center hover:shadow-brutal-hover transition-all duration-300"
            >
              {/* Icon Badge */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 text-white font-mono font-bold text-sm border-2 border-black mb-4">
                {badge.icon}
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-lg text-black mb-2">
                {badge.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quality Metrics */}
        <div className="bg-gray-50 border-2 border-black shadow-brutal p-8 lg:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {QUALITY_METRICS.map((metric, index) => (
              <div key={index} className="border-r-2 last:border-r-0 border-black/20 last:pr-0 pr-8">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-700 font-medium uppercase tracking-wider text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-secondary-500/70 mb-6">
            Überzeugen Sie sich selbst von der CleanSip Qualität
          </p>
          <Link 
            href="/search/strohhalme"
            className="inline-block bg-primary-500 text-white px-8 py-4 font-bold border-2 border-black shadow-brutal hover:shadow-brutal-hover transition-all duration-300 uppercase tracking-wider"
          >
            Produkte ansehen
          </Link>
        </div>

      </div>
    </section>
  );
}
