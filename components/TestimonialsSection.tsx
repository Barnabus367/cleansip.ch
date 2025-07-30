/**
 * Testimonials Section - Professional customer reviews for CleanSip
 * Conservative, business-focused testimonials without emojis or playful elements
 */

interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
  location: string;
  rating: number;
  category: 'gastro' | 'events' | 'corporate';
}

const TESTIMONIALS: Testimonial[] = [
  {
    content: 'CleanSip Strohhalme sind ein wesentlicher Bestandteil unserer Cocktail-Präsentation. Sie bleiben während des gesamten Service stabil und zuverlässig.',
    author: 'Marco Benedetti',
    position: 'Bar Manager',
    company: 'Hotel Paradiso',
    location: 'Zürich',
    rating: 5,
    category: 'gastro'
  },
  {
    content: 'Für unsere Corporate Events sind CleanSip Strohhalme unverzichtbar geworden. Die Qualität überzeugt unsere anspruchsvollen Kunden.',
    author: 'Sandra Weber',
    position: 'Event Director',
    company: 'Premium Events AG',
    location: 'Basel',
    rating: 5,
    category: 'events'
  },
  {
    content: 'Nach jahrelangen Problemen mit aufweichenden Alternativen haben wir endlich eine zuverlässige Lösung gefunden. Klare Empfehlung.',
    author: 'Thomas Müller',
    position: 'Geschäftsführer',
    company: 'Café Central',
    location: 'Bern',
    rating: 5,
    category: 'gastro'
  },
  {
    content: 'Die Kosteneffizienz von CleanSip überzeugt. Weniger Nachbestellungen, weniger Beschwerden, zufriedenere Mitarbeiter.',
    author: 'Andrea Zimmermann',
    position: 'Facility Manager',
    company: 'Swiss Tech Corp',
    location: 'Genf',
    rating: 5,
    category: 'corporate'
  }
];

const COMPANY_LOGOS = [
  'Hotel Paradiso',
  'Premium Events AG', 
  'Café Central',
  'Swiss Tech Corp',
  'Restaurant Bellevue',
  'Event Solutions'
];

export default function TestimonialsSection() {
  return (
    <section className="relative bg-white py-16 lg:py-24 border-t-2 border-black">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Professionelle Anwender aus Gastronomie, Events und Corporate setzen auf CleanSip Qualität
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 border-2 border-black shadow-brutal p-6 lg:p-8"
            >
              {/* Quote */}
              <div className="mb-6">
                <div className="text-4xl text-primary-500 font-serif mb-4">"</div>
                <p className="text-gray-800 leading-relaxed italic">
                  {testimonial.content}
                </p>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-primary-500 border border-black"></div>
                ))}
                <span className="ml-2 text-sm text-gray-700">
                  {testimonial.rating}.0/5.0
                </span>
              </div>
              
              {/* Author Info */}
              <div className="pt-4 border-t border-black/20">
                <div className="font-bold text-black">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-700">
                  {testimonial.position}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {testimonial.company}, {testimonial.location}
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="mt-4">
                <span className={`inline-block px-3 py-1 text-xs font-bold border-2 border-black uppercase tracking-wider ${
                  testimonial.category === 'gastro' ? 'bg-blue-100 text-blue-800' :
                  testimonial.category === 'events' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {testimonial.category === 'gastro' ? 'Gastronomie' :
                   testimonial.category === 'events' ? 'Events' : 'Corporate'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Logos */}
        <div className="bg-white border-2 border-black shadow-brutal p-8 lg:p-12">
          <h3 className="text-xl font-bold text-black mb-8 text-center">
            Vertrauen von professionellen Anwendern
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {COMPANY_LOGOS.map((company, index) => (
              <div 
                key={index}
                className="bg-gray-50 border-2 border-black p-4 text-center"
              >
                <div className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">4.8/5</div>
            <div className="text-gray-700 font-medium">Durchschnittliche Bewertung</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">500+</div>
            <div className="text-gray-700 font-medium">Zufriedene Kunden</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">85%</div>
            <div className="text-gray-700 font-medium">Wiederholungskäufer</div>
          </div>
        </div>

      </div>
    </section>
  );
}
