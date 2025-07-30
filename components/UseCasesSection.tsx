/**
 * Use Cases Section - Professional applications for CleanSip products
 * Targeting B2B and serious consumers without playful elements
 */

import Link from 'next/link';

interface UseCase {
  title: string;
  description: string;
  applications: string[];
  targetAudience: string;
  icon: string; // Professional text-based icons
}

const USE_CASES: UseCase[] = [
  {
    title: 'Gastronomie & Restaurants',
    description: 'Professionelle Lösung für gehobene Gastronomie und Cocktailbars',
    applications: [
      'Cocktails und Longdrinks',
      'Smoothies und Säfte',
      'Kalte Getränke aller Art',
      'Event-Catering'
    ],
    targetAudience: 'Hotels, Restaurants, Bars',
    icon: 'REST'
  },
  {
    title: 'Events & Veranstaltungen',
    description: 'Zuverlässige Qualität für Corporate Events und private Feiern',
    applications: [
      'Firmenvents und Messen',
      'Hochzeiten und Feiern',
      'Catering-Services',
      'Outdoor-Veranstaltungen'
    ],
    targetAudience: 'Event-Agenturen, Caterer',
    icon: 'EVENT'
  },
  {
    title: 'Büro & Corporate',
    description: 'Praktische Lösung für Büroküchen und Besprechungsräume',
    applications: [
      'Büroküchen und Cafeterias',
      'Meeting-Catering',
      'Firmen-Events',
      'Besucherbetreuung'
    ],
    targetAudience: 'Unternehmen, Büros',
    icon: 'CORP'
  },
  {
    title: 'Privatkunden',
    description: 'Hochwertige Lösung für anspruchsvolle Haushalte',
    applications: [
      'Private Partys',
      'Familienfeiern',
      'Hausbar und Küche',
      'Kindergeburtstage'
    ],
    targetAudience: 'Private Haushalte',
    icon: 'HOME'
  }
];

const BENEFITS_BY_SECTOR = [
  {
    sector: 'Gastronomie',
    benefit: 'Professionelle Präsentation',
    detail: 'Konstante Qualität für gehobene Ansprüche'
  },
  {
    sector: 'Events',
    benefit: 'Zuverlässige Verfügbarkeit',
    detail: 'Keine Ausfälle bei wichtigen Anlässen'
  },
  {
    sector: 'Corporate',
    benefit: 'Kosteneffizienz',
    detail: 'Langlebige Alternative zu häufigen Nachbestellungen'
  }
];

export default function UseCasesSection() {
  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Professionelle Anwendungen
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            CleanSip Strohhalme bewähren sich in verschiedensten professionellen Umgebungen. 
            Von der gehobenen Gastronomie bis zum Corporate Event.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {USE_CASES.map((useCase, index) => (
            <div 
              key={index}
              className="bg-gray-50 border-2 border-black shadow-brutal p-6 hover:shadow-brutal-hover transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white font-mono font-bold text-xs border-2 border-black mb-4">
                {useCase.icon}
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-lg text-black mb-3">
                {useCase.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {useCase.description}
              </p>
              
              {/* Applications List */}
              <ul className="space-y-2 mb-4">
                {useCase.applications.map((application, appIndex) => (
                  <li key={appIndex} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1 h-1 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    {application}
                  </li>
                ))}
              </ul>
              
              {/* Target Audience */}
              <div className="pt-4 border-t border-black/20">
                <p className="text-xs text-gray-600 uppercase tracking-wider font-medium">
                  {useCase.targetAudience}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits by Sector */}
        <div className="bg-gray-50 border-2 border-black shadow-brutal p-8 lg:p-12 mb-12">
          <h3 className="text-2xl font-bold text-black mb-8 text-center">
            Branchenspezifische Vorteile
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS_BY_SECTOR.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-500 text-white px-4 py-2 font-bold text-sm border-2 border-black mb-4 inline-block">
                  {item.sector}
                </div>
                <h4 className="font-bold text-lg text-black mb-2">
                  {item.benefit}
                </h4>
                <p className="text-gray-700 text-sm">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* B2B CTA */}
        <div className="bg-black text-white border-2 border-black shadow-brutal p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Geschäftskunden und Grossabnehmer
          </h3>
          <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
            Individuelle Konditionen und Mengenrabatte für professionelle Anwender. 
            Sprechen Sie uns für Ihr Unternehmen an.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/kontakt"
              className="bg-primary-500 text-white px-8 py-4 font-bold border-2 border-white hover:bg-white hover:text-primary-500 transition-all duration-300 uppercase tracking-wider"
            >
              B2B Anfrage
            </Link>
            <Link 
              href="/search/strohhalme"
              className="bg-transparent text-white px-8 py-4 font-bold border-2 border-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider"
            >
              Produkte ansehen
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
