/**
 * Shopify Webhooks Handler for CleanSip
 * Handles real-time inventory updates and order management
 */

import crypto from 'crypto';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Webhook event types
type WebhookEvent = 
  | 'products/update'
  | 'products/create'
  | 'products/delete'
  | 'inventory_levels/update'
  | 'orders/create'
  | 'orders/updated'
  | 'orders/paid';

interface ShopifyWebhookPayload {
  id: string;
  handle?: string;
  inventory_quantity?: number;
  variant_id?: string;
  location_id?: string;
  [key: string]: any;
}

interface InventoryUpdate {
  productId: string;
  variantId: string;
  locationId: string;
  available: number;
  reserved: number;
  timestamp: string;
}

/**
 * Verify Shopify webhook signature
 */
function verifyShopifyWebhook(rawBody: string, signature: string): boolean {
  const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.warn('SHOPIFY_WEBHOOK_SECRET not configured');
    return process.env.NODE_ENV === 'development'; // Allow in dev without secret
  }

  const computedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody, 'utf8')
    .digest('base64');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}

/**
 * Handle product updates
 */
async function handleProductUpdate(payload: ShopifyWebhookPayload): Promise<void> {
  try {
    console.log(`Product updated: ${payload.handle} (ID: ${payload.id})`);
    
    // Revalidate product cache
    if (payload.handle) {
      revalidateTag(`product-${payload.handle}`);
    }
    revalidateTag('products');
    
    // Update local cache/database if needed
    // This would integrate with your caching strategy
    
  } catch (error) {
    console.error('Error handling product update:', error);
    throw error;
  }
}

/**
 * Handle inventory level updates
 */
async function handleInventoryUpdate(payload: ShopifyWebhookPayload): Promise<void> {
  try {
    const update: InventoryUpdate = {
      productId: payload.id,
      variantId: payload.variant_id || '',
      locationId: payload.location_id || '',
      available: payload.inventory_quantity || 0,
      reserved: 0, // Would need additional logic for reserved stock
      timestamp: new Date().toISOString()
    };

    console.log('Inventory updated:', update);
    
    // Revalidate relevant caches
    revalidateTag('products');
    revalidateTag('collections');
    
    // Store inventory update for real-time UI updates
    await storeInventoryUpdate(update);
    
    // Trigger low stock alerts if needed
    if (update.available <= 10) {
      await triggerLowStockAlert(update);
    }
    
  } catch (error) {
    console.error('Error handling inventory update:', error);
    throw error;
  }
}

/**
 * Handle order creation
 */
async function handleOrderCreate(payload: ShopifyWebhookPayload): Promise<void> {
  try {
    console.log(`New order created: ${payload.id}`);
    
    // Update stock reservations
    if (payload.line_items) {
      for (const item of payload.line_items) {
        await updateStockReservation(item.variant_id, item.quantity);
      }
    }
    
    // Revalidate inventory
    revalidateTag('products');
    
    // Send order notifications (email, Slack, etc.)
    await sendOrderNotification(payload);
    
  } catch (error) {
    console.error('Error handling order creation:', error);
    throw error;
  }
}

/**
 * Store inventory update for real-time UI
 */
async function storeInventoryUpdate(update: InventoryUpdate): Promise<void> {
  // This would store in Redis, Database, or in-memory cache
  // For now, we'll just log it
  console.log('Storing inventory update:', update);
  
  // Example: Redis implementation
  // if (redis) {
  //   await redis.setex(
  //     `inventory:${update.variantId}`, 
  //     300, // 5 minutes TTL
  //     JSON.stringify(update)
  //   );
  // }
}

/**
 * Trigger low stock alert
 */
async function triggerLowStockAlert(update: InventoryUpdate): Promise<void> {
  console.warn(`⚠️ Low stock alert: Variant ${update.variantId} has ${update.available} items left`);
  
  // Send alert to admin (email, Slack, webhook, etc.)
  if (process.env.SLACK_WEBHOOK_URL) {
    try {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 Low Stock Alert: Product variant ${update.variantId} has only ${update.available} items remaining`,
          channel: '#inventory-alerts'
        })
      });
    } catch (error) {
      console.error('Failed to send Slack alert:', error);
    }
  }
}

/**
 * Update stock reservation
 */
async function updateStockReservation(variantId: string, quantity: number): Promise<void> {
  console.log(`Reserving ${quantity} items for variant ${variantId}`);
  
  // This would update your reservation system
  // For now, we'll just revalidate cache
  revalidateTag('products');
}

/**
 * Send order notification
 */
async function sendOrderNotification(order: ShopifyWebhookPayload): Promise<void> {
  console.log(`📦 New order notification: ${order.id}`);
  
  // Send email, push notification, or other alerts
  // This would integrate with your notification system
}

/**
 * Main webhook handler
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-shopify-hmac-sha256') || '';
    const topic = request.headers.get('x-shopify-topic') as WebhookEvent;
    
    // Verify webhook signature
    if (!verifyShopifyWebhook(rawBody, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    // Parse payload
    const payload: ShopifyWebhookPayload = JSON.parse(rawBody);
    
    console.log(`Processing webhook: ${topic}`, { id: payload.id });
    
    // Route to appropriate handler
    switch (topic) {
      case 'products/update':
      case 'products/create':
        await handleProductUpdate(payload);
        break;
        
      case 'products/delete':
        // Handle product deletion
        revalidateTag('products');
        revalidateTag('collections');
        break;
        
      case 'inventory_levels/update':
        await handleInventoryUpdate(payload);
        break;
        
      case 'orders/create':
        await handleOrderCreate(payload);
        break;
        
      case 'orders/updated':
      case 'orders/paid':
        // Handle order updates
        revalidateTag('products'); // May affect inventory
        break;
        
      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Processed ${topic} webhook` 
    });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler for webhook verification
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'CleanSip Shopify Webhook Endpoint',
    timestamp: new Date().toISOString(),
    status: 'active'
  });
}

// Export types for use in other files
export type { InventoryUpdate, ShopifyWebhookPayload, WebhookEvent };

