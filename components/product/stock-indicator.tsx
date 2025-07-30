/**
 * Stock Indicator Component for CleanSip
 * Shows real-time stock levels and availability warnings
 */

'use client';

import { useEffect, useState } from 'react';

interface StockIndicatorProps {
  stockLevel: number;
  reservedStock?: number;
  variantId?: string;
  className?: string;
  showExactCount?: boolean;
  warningThreshold?: number;
  criticalThreshold?: number;
}

interface StockStatus {
  level: 'high' | 'medium' | 'low' | 'critical' | 'out';
  message: string;
  color: string;
  icon: string;
}

export default function StockIndicator({
  stockLevel,
  reservedStock = 0,
  variantId,
  className = '',
  showExactCount = true,
  warningThreshold = 20,
  criticalThreshold = 5
}: StockIndicatorProps) {
  const [realTimeStock, setRealTimeStock] = useState(stockLevel);
  const availableStock = realTimeStock - reservedStock;

  // Real-time stock updates (would connect to WebSocket/SSE in production)
  useEffect(() => {
    if (!variantId) return;

    // Simulate real-time updates
    const interval = setInterval(async () => {
      try {
        // In production, this would fetch from your real-time inventory API
        // For now, we'll just use the initial stock level
        const response = await fetch(`/api/inventory/${variantId}`, {
          cache: 'no-store'
        });
        
        if (response.ok) {
          const data = await response.json();
          setRealTimeStock(data.stockLevel || stockLevel);
        }
      } catch (error) {
        console.error('Failed to fetch real-time stock:', error);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [variantId, stockLevel]);

  // Determine stock status
  const getStockStatus = (): StockStatus => {
    if (availableStock <= 0) {
      return {
        level: 'out',
        message: 'Ausverkauft',
        color: 'text-red-600 bg-red-50 border-red-200',
        icon: '❌'
      };
    }
    
    if (availableStock <= criticalThreshold) {
      return {
        level: 'critical',
        message: showExactCount 
          ? `Nur noch ${availableStock} verfügbar!` 
          : 'Nur noch wenige verfügbar!',
        color: 'text-red-600 bg-red-50 border-red-200',
        icon: '⚠️'
      };
    }
    
    if (availableStock <= warningThreshold) {
      return {
        level: 'low',
        message: showExactCount 
          ? `Noch ${availableStock} verfügbar` 
          : 'Begrenzte Verfügbarkeit',
        color: 'text-orange-600 bg-orange-50 border-orange-200',
        icon: '📦'
      };
    }
    
    if (availableStock <= 50) {
      return {
        level: 'medium',
        message: showExactCount 
          ? `${availableStock} auf Lager` 
          : 'Auf Lager',
        color: 'text-blue-600 bg-blue-50 border-blue-200',
        icon: '✅'
      };
    }
    
    return {
      level: 'high',
      message: 'Auf Lager',
      color: 'text-green-600 bg-green-50 border-green-200',
      icon: '✅'
    };
  };

  const status = getStockStatus();

  // Don't show indicator for high stock levels unless explicitly requested
  if (status.level === 'high' && !showExactCount) {
    return null;
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${status.color} ${className}`}>
      <span className="text-base" role="img" aria-label="Stock status">
        {status.icon}
      </span>
      <span>{status.message}</span>
      
      {/* Real-time indicator */}
      {realTimeStock !== stockLevel && (
        <div className="w-2 h-2 bg-current rounded-full animate-pulse" title="Live-Update" />
      )}
      
      {/* Reserved stock indicator */}
      {reservedStock > 0 && showExactCount && (
        <span className="text-xs opacity-75" title={`${reservedStock} reserviert`}>
          ({reservedStock} reserviert)
        </span>
      )}
    </div>
  );
}

/**
 * Compact stock indicator for product cards
 */
export function CompactStockIndicator({
  stockLevel,
  reservedStock = 0,
  className = ''
}: Pick<StockIndicatorProps, 'stockLevel' | 'reservedStock' | 'className'>) {
  const availableStock = stockLevel - reservedStock;

  if (availableStock > 20) {
    return (
      <div className={`text-green-600 text-sm ${className}`}>
        ✅ Auf Lager
      </div>
    );
  }

  if (availableStock > 5) {
    return (
      <div className={`text-orange-600 text-sm ${className}`}>
        📦 Noch {availableStock} verfügbar
      </div>
    );
  }

  if (availableStock > 0) {
    return (
      <div className={`text-red-600 text-sm font-medium ${className}`}>
        ⚠️ Nur noch {availableStock} verfügbar!
      </div>
    );
  }

  return (
    <div className={`text-red-600 text-sm font-medium ${className}`}>
      ❌ Ausverkauft
    </div>
  );
}

/**
 * Stock level progress bar
 */
export function StockProgressBar({
  stockLevel,
  reservedStock = 0,
  maxStock = 100,
  className = ''
}: StockIndicatorProps & { maxStock?: number }) {
  const availableStock = stockLevel - reservedStock;
  const percentage = Math.min((availableStock / maxStock) * 100, 100);
  
  const getBarColor = () => {
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm mb-1">
        <span>Lagerbestand</span>
        <span>{availableStock} / {maxStock}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getBarColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {reservedStock > 0 && (
        <div className="text-xs text-gray-500 mt-1">
          {reservedStock} Stück reserviert
        </div>
      )}
    </div>
  );
}

/**
 * Hook for real-time stock updates
 */
export function useRealTimeStock(variantId: string, initialStock: number) {
  const [stock, setStock] = useState(initialStock);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    if (!variantId) return;

    // In production, this would establish a WebSocket connection
    // or Server-Sent Events for real-time updates
    const updateStock = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/inventory/${variantId}`, {
          cache: 'no-store'
        });
        
        if (response.ok) {
          const data = await response.json();
          setStock(data.stockLevel || initialStock);
          setLastUpdate(new Date());
        }
      } catch (error) {
        console.error('Failed to update stock:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Update immediately
    updateStock();

    // Then update every 30 seconds
    const interval = setInterval(updateStock, 30000);

    return () => clearInterval(interval);
  }, [variantId, initialStock]);

  return { stock, isLoading, lastUpdate };
}

/**
 * Swiss-specific stock messages
 */
export const SWISS_STOCK_MESSAGES = {
  IN_STOCK: 'Auf Lager - Versand innerhalb 24h',
  LOW_STOCK: 'Begrenzt verfügbar - Schnell bestellen!',
  VERY_LOW_STOCK: 'Nur noch wenige verfügbar!',
  OUT_OF_STOCK: 'Vorübergehend nicht verfügbar',
  BACKORDER: 'Nachbestellung möglich - Lieferzeit 5-7 Tage',
  DISCONTINUED: 'Artikel wird nicht mehr geführt'
} as const;
