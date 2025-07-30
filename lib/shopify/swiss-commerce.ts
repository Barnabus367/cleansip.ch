/**
 * Swiss Commerce Logic for CleanSip
 * Handles CHF currency, Swiss Post shipping, VAT, and Swiss market specifics
 */


// Swiss postal codes and regions
export const SWISS_REGIONS = {
  'AG': 'Aargau',
  'AI': 'Appenzell Innerrhoden',
  'AR': 'Appenzell Ausserrhoden',
  'BE': 'Bern',
  'BL': 'Basel-Landschaft',
  'BS': 'Basel-Stadt',
  'FR': 'Freiburg',
  'GE': 'Genf',
  'GL': 'Glarus',
  'GR': 'Graubünden',
  'JU': 'Jura',
  'LU': 'Luzern',
  'NE': 'Neuenburg',
  'NW': 'Nidwalden',
  'OW': 'Obwalden',
  'SG': 'St. Gallen',
  'SH': 'Schaffhausen',
  'SO': 'Solothurn',
  'SZ': 'Schwyz',
  'TG': 'Thurgau',
  'TI': 'Tessin',
  'UR': 'Uri',
  'VD': 'Waadt',
  'VS': 'Wallis',
  'ZG': 'Zug',
  'ZH': 'Zürich'
} as const;

export type SwissCanton = keyof typeof SWISS_REGIONS;

// Swiss Post shipping classes
export interface SwissShippingOption {
  id: string;
  name: string;
  description: string;
  priceNet: number; // CHF without VAT
  priceGross: number; // CHF with VAT
  deliveryTime: string;
  trackingIncluded: boolean;
  insuranceIncluded: boolean;
  maxWeight: number; // grams
  maxDimensions: {
    length: number; // cm
    width: number; // cm
    height: number; // cm
  };
}

export const SWISS_SHIPPING_OPTIONS: SwissShippingOption[] = [
  {
    id: 'a-post-standard',
    name: 'A-Post Standard',
    description: 'Standardversand mit A-Post',
    priceNet: 7.00,
    priceGross: 7.54, // 7.00 * 1.077
    deliveryTime: '1-2 Werktage',
    trackingIncluded: false,
    insuranceIncluded: false,
    maxWeight: 2000, // 2kg
    maxDimensions: { length: 35, width: 25, height: 3 }
  },
  {
    id: 'a-post-tracked',
    name: 'A-Post Plus',
    description: 'Versand mit Sendungsverfolgung',
    priceNet: 9.00,
    priceGross: 9.69,
    deliveryTime: '1-2 Werktage',
    trackingIncluded: true,
    insuranceIncluded: false,
    maxWeight: 2000,
    maxDimensions: { length: 35, width: 25, height: 3 }
  },
  {
    id: 'postpac-economy',
    name: 'PostPac Economy',
    description: 'Günstiger Paketversand',
    priceNet: 6.50,
    priceGross: 7.00,
    deliveryTime: '2-3 Werktage',
    trackingIncluded: true,
    insuranceIncluded: true,
    maxWeight: 30000, // 30kg
    maxDimensions: { length: 60, width: 60, height: 60 }
  },
  {
    id: 'postpac-priority',
    name: 'PostPac Priority',
    description: 'Schneller Paketversand',
    priceNet: 8.50,
    priceGross: 9.15,
    deliveryTime: '1-2 Werktage',
    trackingIncluded: true,
    insuranceIncluded: true,
    maxWeight: 30000,
    maxDimensions: { length: 60, width: 60, height: 60 }
  },
  {
    id: 'express',
    name: 'Express',
    description: 'Expressversand am nächsten Tag',
    priceNet: 15.00,
    priceGross: 16.16,
    deliveryTime: 'Nächster Werktag bis 12:00',
    trackingIncluded: true,
    insuranceIncluded: true,
    maxWeight: 30000,
    maxDimensions: { length: 60, width: 60, height: 60 }
  },
  {
    id: 'pickup',
    name: 'Selbstabholung',
    description: 'Kostenlose Abholung in unserem Lager',
    priceNet: 0.00,
    priceGross: 0.00,
    deliveryTime: 'Nach Vereinbarung',
    trackingIncluded: false,
    insuranceIncluded: false,
    maxWeight: Infinity,
    maxDimensions: { length: Infinity, width: Infinity, height: Infinity }
  }
];

// Free shipping thresholds
export const FREE_SHIPPING_THRESHOLD = 50.00; // CHF
export const EXPRESS_THRESHOLD = 100.00; // CHF - free express above this amount

interface ShippingCalculationParams {
  totalWeight: number; // grams
  orderValue: number; // CHF
  canton?: SwissCanton;
  isExpress?: boolean;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

interface ShippingCalculationResult {
  availableOptions: SwissShippingOption[];
  recommendedOption: SwissShippingOption;
  freeShippingEligible: boolean;
  freeShippingRemaining?: number;
}

/**
 * Calculate shipping options for Swiss orders
 */
export function calculateSwissShipping({
  totalWeight,
  orderValue,
  canton,
  isExpress = false,
  dimensions
}: ShippingCalculationParams): ShippingCalculationResult {
  
  // Filter available options based on weight and dimensions
  let availableOptions = SWISS_SHIPPING_OPTIONS.filter(option => {
    if (totalWeight > option.maxWeight) return false;
    
    if (dimensions) {
      const { length, width, height } = dimensions;
      const { maxDimensions } = option;
      
      if (length > maxDimensions.length || 
          width > maxDimensions.width || 
          height > maxDimensions.height) {
        return false;
      }
    }
    
    return true;
  });

  // Check free shipping eligibility
  const freeShippingEligible = orderValue >= FREE_SHIPPING_THRESHOLD;
  const freeShippingRemaining = freeShippingEligible ? 0 : FREE_SHIPPING_THRESHOLD - orderValue;

  // Apply free shipping
  if (freeShippingEligible) {
    availableOptions = availableOptions.map(option => ({
      ...option,
      priceNet: option.id === 'pickup' ? 0 : 0, // Free shipping for all except express
      priceGross: option.id === 'pickup' ? 0 : 0
    }));
  }

  // Free express shipping for high-value orders
  if (orderValue >= EXPRESS_THRESHOLD) {
    availableOptions = availableOptions.map(option => ({
      ...option,
      priceNet: 0,
      priceGross: 0
    }));
  }

  // Determine recommended option
  let recommendedOption: SwissShippingOption;
  
  if (isExpress && availableOptions.find(opt => opt.id === 'express')) {
    recommendedOption = availableOptions.find(opt => opt.id === 'express')!;
  } else if (totalWeight <= 2000) {
    // Light packages: A-Post
    recommendedOption = availableOptions.find(opt => opt.id === 'a-post-tracked') || 
                      availableOptions.find(opt => opt.id === 'a-post-standard')!;
  } else {
    // Heavy packages: PostPac
    recommendedOption = availableOptions.find(opt => opt.id === 'postpac-priority') ||
                      availableOptions.find(opt => opt.id === 'postpac-economy')!;
  }

  return {
    availableOptions,
    recommendedOption,
    freeShippingEligible,
    freeShippingRemaining
  };
}

/**
 * Format Swiss address
 */
export interface SwissAddress {
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  canton: SwissCanton;
  country: 'CH';
}

export function formatSwissAddress(address: SwissAddress): string {
  const lines = [];
  
  // Name line
  const name = address.company 
    ? `${address.company}\n${address.firstName} ${address.lastName}`
    : `${address.firstName} ${address.lastName}`;
  lines.push(name);
  
  // Address line
  lines.push(`${address.street} ${address.houseNumber}`);
  
  // City line
  lines.push(`${address.postalCode} ${address.city}`);
  
  // Country
  lines.push('Schweiz');
  
  return lines.join('\n');
}

/**
 * Validate Swiss postal code
 */
export function validateSwissPostalCode(postalCode: string): boolean {
  // Swiss postal codes are 4 digits, 1000-9999
  const code = parseInt(postalCode);
  return /^\d{4}$/.test(postalCode) && code >= 1000 && code <= 9999;
}

/**
 * Get canton from postal code (simplified mapping)
 */
export function getCantonFromPostalCode(postalCode: string): SwissCanton | null {
  const code = parseInt(postalCode);
  
  // Simplified mapping - in production you'd use a complete postal code database
  if (code >= 1000 && code <= 1999) return 'VD'; // Lausanne area
  if (code >= 2000 && code <= 2999) return 'NE'; // Neuchâtel area
  if (code >= 3000 && code <= 3999) return 'BE'; // Bern area
  if (code >= 4000 && code <= 4999) return 'BL'; // Basel area
  if (code >= 5000 && code <= 5999) return 'AG'; // Aargau area
  if (code >= 6000 && code <= 6999) return 'LU'; // Lucerne area
  if (code >= 7000 && code <= 7999) return 'GR'; // Graubünden area
  if (code >= 8000 && code <= 8999) return 'ZH'; // Zurich area
  if (code >= 9000 && code <= 9999) return 'SG'; // St. Gallen area
  
  return null;
}

/**
 * Swiss business hours helper
 */
export interface BusinessHours {
  isOpen: boolean;
  opensAt?: string;
  closesAt?: string;
  nextOpenTime?: Date;
}

export function getSwissBusinessHours(): BusinessHours {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours();
  
  // Swiss business hours: Mon-Fri 8:00-18:00, Sat 9:00-16:00
  if (day >= 1 && day <= 5) { // Monday to Friday
    if (hour >= 8 && hour < 18) {
      return {
        isOpen: true,
        opensAt: '08:00',
        closesAt: '18:00'
      };
    }
  } else if (day === 6) { // Saturday
    if (hour >= 9 && hour < 16) {
      return {
        isOpen: true,
        opensAt: '09:00',
        closesAt: '16:00'
      };
    }
  }
  
  // Calculate next opening time
  const nextOpen = new Date(now);
  if (day === 0 || (day === 6 && hour >= 16) || (day >= 1 && day <= 5 && hour >= 18)) {
    // Move to next Monday 8:00
    const daysUntilMonday = day === 0 ? 1 : (8 - day);
    nextOpen.setDate(now.getDate() + daysUntilMonday);
    nextOpen.setHours(8, 0, 0, 0);
  } else if (day === 6 && hour < 9) {
    // Saturday before 9:00
    nextOpen.setHours(9, 0, 0, 0);
  } else if (day >= 1 && day <= 5 && hour < 8) {
    // Weekday before 8:00
    nextOpen.setHours(8, 0, 0, 0);
  }
  
  return {
    isOpen: false,
    nextOpenTime: nextOpen
  };
}

/**
 * Swiss payment methods
 */
export const SWISS_PAYMENT_METHODS = [
  {
    id: 'twint',
    name: 'TWINT',
    description: 'Mobile Payment mit TWINT App',
    icon: '📱',
    fee: 0,
    processingTime: 'Sofort'
  },
  {
    id: 'postfinance',
    name: 'PostFinance',
    description: 'PostFinance E-Payment',
    icon: '🏛️',
    fee: 0,
    processingTime: 'Sofort'
  },
  {
    id: 'invoice',
    name: 'Rechnung',
    description: 'Zahlung auf Rechnung (30 Tage)',
    icon: '📄',
    fee: 2.50,
    processingTime: '1-2 Werktage'
  },
  {
    id: 'credit-card',
    name: 'Kreditkarte',
    description: 'Visa, Mastercard, American Express',
    icon: '💳',
    fee: 0,
    processingTime: 'Sofort'
  },
  {
    id: 'bank-transfer',
    name: 'Überweisung',
    description: 'Banküberweisung (Vorkasse)',
    icon: '🏦',
    fee: 0,
    processingTime: '1-3 Werktage'
  }
] as const;

/**
 * Swiss market holidays (simplified)
 */
export const SWISS_HOLIDAYS_2025 = [
  new Date('2025-01-01'), // Neujahr
  new Date('2025-01-02'), // Berchtoldstag
  new Date('2025-04-18'), // Karfreitag
  new Date('2025-04-21'), // Ostermontag
  new Date('2025-05-01'), // Tag der Arbeit
  new Date('2025-05-29'), // Auffahrt
  new Date('2025-06-09'), // Pfingstmontag
  new Date('2025-08-01'), // Nationalfeiertag
  new Date('2025-12-25'), // Weihnachten
  new Date('2025-12-26')  // Stephanstag
];

export function isSwissHoliday(date: Date): boolean {
  return SWISS_HOLIDAYS_2025.some(holiday => 
    holiday.toDateString() === date.toDateString()
  );
}

/**
 * Calculate delivery date considering Swiss holidays and business hours
 */
export function calculateDeliveryDate(
  shippingOption: SwissShippingOption,
  orderDate: Date = new Date()
): Date {
  const deliveryDate = new Date(orderDate);
  
  // Parse delivery time (e.g., "1-2 Werktage" -> 2 days)
  const match = shippingOption.deliveryTime.match(/(\d+)-?(\d+)?\s*Werktage?/);
  const maxDays = match ? parseInt(match[2] || match[1] || '3') : 3;
  
  let businessDaysAdded = 0;
  let currentDate = new Date(orderDate);
  
  // If ordered after business hours, start counting from next business day
  const businessHours = getSwissBusinessHours();
  if (!businessHours.isOpen && businessHours.nextOpenTime) {
    currentDate = businessHours.nextOpenTime;
  }
  
  while (businessDaysAdded < maxDays) {
    currentDate.setDate(currentDate.getDate() + 1);
    
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = isSwissHoliday(currentDate);
    
    if (!isWeekend && !isHoliday) {
      businessDaysAdded++;
    }
  }
  
  return currentDate;
}
