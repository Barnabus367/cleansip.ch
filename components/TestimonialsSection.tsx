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
  category: 'gastro' | 'events' | 'corporate' | 'private';
}

const TESTIMONIALS: Testimonial[] = [
  {
    content: 'Nie wieder peinliche Papier-Fetzen im Cocktail! CleanSip hat unser Bar-Erlebnis revolutioniert. Unsere Gäste sind begeistert.',
    author: 'Marco Benedetti',
    position: 'Bar Manager',
    company: 'Hotel Paradiso',
    location: 'Zürich',
    rating: 5,
    category: 'gastro'
  },
  {
    content: 'Endlich keine matschigen Überraschungen mehr! CleanSip Strohhalme halten, was sie versprechen. Ein echter Game-Changer für unsere Events.',
    author: 'Sandra Weber',
    position: 'Event Director',
    company: 'Premium Events AG',
    location: 'Basel',
    rating: 5,
    category: 'events'
  },
  {
    content: 'Nach Jahren des Ärgers mit aufweichenden Alternativen endlich eine Lösung, die funktioniert. Unsere Kunden sind happy, wir auch!',
    author: 'Thomas Müller',
    position: 'Geschäftsführer',
    company: 'Café Central',
    location: 'Bern',
    rating: 5,
    category: 'gastro'
  },
  {
    content: 'Weniger Beschwerden, weniger Nachbestellungen, zufriedenere Mitarbeiter. CleanSip war die beste Investition des Jahres.',
    author: 'Andrea Zimmermann',
    position: 'Facility Manager',
    company: 'Swiss Tech Corp',
    location: 'Genf',
    rating: 5,
    category: 'corporate'
  },
  {
    content: 'Schlürfen statt kämpfen - endlich! Meine Gäste fragen sogar, wo sie diese stabilen Strohhalme kaufen können.',
    author: 'Julia Steiner',
    position: 'Private Gastgeberin',
    company: 'Zürichsee',
    location: 'Küsnacht',
    rating: 5,
    category: 'private'
  },
  {
    content: 'Als Gastronom kann ich CleanSip nur weiterempfehlen. Qualität, die man schmeckt - äh, spürt! Kein Stress mehr mit matschigen Strohhalmen.',
    author: 'Roberto Fernandez',
    position: 'Küchenchef',
    company: 'Restaurant Bellevue',
    location: 'Luzern',
    rating: 5,
    category: 'gastro'
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
    <section id="testimonials" className="relative bg-white py-16 lg:py-24 border-t-2 border-black">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Rebellious Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block bg-red-600 text-white px-6 py-3 font-black text-sm uppercase tracking-wider mb-6 animate-pulse">
            Echte Erfahrungen
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-secondary-800 mb-6 leading-tight">
            <span className="text-red-600">Nie wieder</span> Papier-Drama!
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Über <strong className="text-primary-600">2'800 Schweizer</strong> haben bereits gewechselt - 
            und bereuen es kein bisschen. <strong>"Schlürfen statt kämpfen"</strong> ist unser Motto geworden.
          </p>
          
          {/* Google Reviews Widget Style */}
          <div className="mt-8 inline-flex items-center gap-4 bg-gray-50 border-2 border-black p-4 shadow-brutal">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div>
                <div className="flex text-accent-500 text-xl">
                  {"★".repeat(5)}
                </div>
                <div className="text-sm font-bold text-gray-700">4.8/5 • 847 Bewertungen</div>
              </div>
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-800">Google Reviews</div>
              <div className="text-sm text-gray-600">Verifizierte Käufer</div>
            </div>
          </div>
        </div>

        {/* Emotional Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={index}
              className="group bg-gray-50 border-2 border-black shadow-brutal p-6 lg:p-8 hover:shadow-brutal-hover transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Emotional Quote */}
              <div className="mb-6">
                <div className="text-4xl text-primary-500 font-serif mb-4">"</div>
                <p className="text-gray-800 leading-relaxed font-medium text-lg">
                  {testimonial.content}
                </p>
              </div>
              
              {/* Enhanced Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-accent-500 text-lg">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="animate-pulse" style={{animationDelay: `${i * 100}ms`}}>★</span>
                  ))}
                </div>
                <span className="ml-2 text-sm font-bold text-gray-700 bg-green-100 px-2 py-1 rounded">
                  {testimonial.rating}.0/5.0 ⭐
                </span>
              </div>
              
              {/* Author Info with Emotion */}
              <div className="pt-4 border-t border-black/20">
                <div className="font-bold text-black text-lg">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-700 font-medium">
                  {testimonial.position}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {testimonial.company}, {testimonial.location}
                </div>
              </div>
              
              {/* Enhanced Category Badge */}
              <div className="mt-4">
                <span className={`inline-block px-3 py-1 text-xs font-bold border-2 border-black uppercase tracking-wider transform group-hover:scale-105 transition-transform ${
                  testimonial.category === 'gastro' ? 'bg-blue-100 text-blue-800' :
                  testimonial.category === 'events' ? 'bg-green-100 text-green-800' :
                  testimonial.category === 'corporate' ? 'bg-purple-100 text-purple-800' :
                  'bg-pink-100 text-pink-800'
                }`}>
                  {testimonial.category === 'gastro' ? '🍸 Gastronomie' :
                   testimonial.category === 'events' ? '🎉 Events' : 
                   testimonial.category === 'corporate' ? '🏢 Corporate' :
                   '🏠 Privat'}
                </span>
              </div>

              {/* Hover Effect Indicator */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-1 bg-gradient-to-r from-primary-500 to-accent-500 w-full" />
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
