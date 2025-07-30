/**
 * Inventory API endpoint for real-time stock updates
 * Provides stock levels for individual variants
 */

import { NextRequest, NextResponse } from 'next/server';
import { shouldUseMockData, validateShopifyConfig } from '../../../../lib/shopify/validate-config';

interface InventoryResponse {
  variantId: string;
  stockLevel: number;
  reservedStock: number;
  availableStock: number;
  lastUpdated: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

/**
 * GET /api/inventory/[variantId]
 * Returns current stock level for a specific variant
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ variantId: string }> }
): Promise<NextResponse> {
  try {
    const { variantId } = await context.params;
    
    if (!variantId) {
      return NextResponse.json(
        { error: 'Variant ID is required' },
        { status: 400 }
      );
    }

    // Check if we should use mock data
    if (shouldUseMockData()) {
      const mockInventory: InventoryResponse = {
        variantId,
        stockLevel: 1000,
        reservedStock: 0,
        availableStock: 1000,
        lastUpdated: new Date().toISOString(),
        status: 'in_stock'
      };

      return NextResponse.json(mockInventory, {
        headers: {
          'Cache-Control': 'public, max-age=30', // Cache for 30 seconds
        }
      });
    }

    // In production, this would query your inventory management system
    // For now, we'll simulate a database lookup
    
    const inventory = await getInventoryByVariantId(variantId);
    
    if (!inventory) {
      return NextResponse.json(
        { error: 'Variant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(inventory, {
      headers: {
        'Cache-Control': 'public, max-age=30',
      }
    });

  } catch (error) {
    console.error('Inventory API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch inventory',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Simulate inventory lookup (replace with real database query)
 */
async function getInventoryByVariantId(variantId: string): Promise<InventoryResponse | null> {
  try {
    // This would be a real database query in production
    // For now, we'll simulate with some logic
    
    const validation = validateShopifyConfig();
    if (!validation.config.isConfigured) {
      // Return mock data if Shopify not configured
      return {
        variantId,
        stockLevel: 1000,
        reservedStock: 0,
        availableStock: 1000,
        lastUpdated: new Date().toISOString(),
        status: 'in_stock'
      };
    }

    // In production, you would:
    // 1. Query your database for the variant
    // 2. Get current stock from Shopify API
    // 3. Get reserved stock from order management system
    // 4. Calculate available stock
    
    // Simulate different stock levels based on variant ID
    let stockLevel: number;
    let reservedStock: number;
    
    if (variantId.includes('low')) {
      stockLevel = 5;
      reservedStock = 1;
    } else if (variantId.includes('out')) {
      stockLevel = 0;
      reservedStock = 0;
    } else if (variantId.includes('medium')) {
      stockLevel = 25;
      reservedStock = 3;
    } else {
      stockLevel = 100;
      reservedStock = 10;
    }
    
    const availableStock = Math.max(0, stockLevel - reservedStock);
    
    let status: 'in_stock' | 'low_stock' | 'out_of_stock';
    if (availableStock === 0) {
      status = 'out_of_stock';
    } else if (availableStock <= 10) {
      status = 'low_stock';
    } else {
      status = 'in_stock';
    }

    return {
      variantId,
      stockLevel,
      reservedStock,
      availableStock,
      lastUpdated: new Date().toISOString(),
      status
    };

  } catch (error) {
    console.error('Error fetching inventory:', error);
    return null;
  }
}

/**
 * PUT /api/inventory/[variantId]
 * Update stock level (admin only)
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ variantId: string }> }
): Promise<NextResponse> {
  try {
    const { variantId } = await context.params;
    const body = await request.json();
    
    // Validate admin access (in production, check JWT/session)
    const isAdmin = request.headers.get('Authorization')?.includes('admin');
    
    if (!isAdmin && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { stockLevel, reservedStock } = body;
    
    if (typeof stockLevel !== 'number' || stockLevel < 0) {
      return NextResponse.json(
        { error: 'Invalid stock level' },
        { status: 400 }
      );
    }

    // Update inventory in database/Shopify
    const updatedInventory = await updateInventory(variantId, {
      stockLevel,
      reservedStock: reservedStock || 0
    });

    return NextResponse.json(updatedInventory);

  } catch (error) {
    console.error('Inventory update error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to update inventory',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Update inventory (simulation)
 */
async function updateInventory(
  variantId: string, 
  update: { stockLevel: number; reservedStock: number }
): Promise<InventoryResponse> {
  // In production, this would:
  // 1. Update your database
  // 2. Update Shopify inventory via Admin API
  // 3. Trigger webhook to update caches
  
  const { stockLevel, reservedStock } = update;
  const availableStock = Math.max(0, stockLevel - reservedStock);
  
  let status: 'in_stock' | 'low_stock' | 'out_of_stock';
  if (availableStock === 0) {
    status = 'out_of_stock';
  } else if (availableStock <= 10) {
    status = 'low_stock';
  } else {
    status = 'in_stock';
  }

  console.log(`Updated inventory for ${variantId}:`, update);

  return {
    variantId,
    stockLevel,
    reservedStock,
    availableStock,
    lastUpdated: new Date().toISOString(),
    status
  };
}

export type { InventoryResponse };
