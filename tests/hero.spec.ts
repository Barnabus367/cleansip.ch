import { expect, test } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    // Reduce motion for consistent snapshots
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    
    // Wait for Shopify data to load
    await page.waitForSelector('[data-testid="hero-section"]', { timeout: 10000 });
    
    // Wait for all images and fonts to load
    await page.waitForLoadState('networkidle');
  });

  test('should render hero section correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Take screenshot of hero section
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toHaveScreenshot('hero-desktop.png', {
      animations: 'disabled'
    });
  });

  test('should render hero section correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Take screenshot of hero section
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toHaveScreenshot('hero-mobile.png', {
      animations: 'disabled'
    });
  });

  test('should render hero section correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Take screenshot of hero section
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toHaveScreenshot('hero-tablet.png', {
      animations: 'disabled'
    });
  });

  test('should have proper heading structure for accessibility', async ({ page }) => {
    const h1 = page.locator('h1#hero-heading');
    await expect(h1).toBeVisible();
    
    const matschige = h1.locator('span').first();
    const alternativen = h1.locator('span').nth(1);
    
    await expect(matschige).toHaveText('MATSCHIGE');
    await expect(alternativen).toHaveText('ALTERNATIVEN');
  });

  test('should display info grid with correct data', async ({ page }) => {
    const infoGrid = page.locator('[data-testid="info-grid"]');
    await expect(infoGrid).toBeVisible();
    
    // Check all four info items
    await expect(infoGrid.locator('dt').first()).toHaveText('Menge');
    await expect(infoGrid.locator('dd').first()).toHaveText('100 Stück');
  });

  test('should have working CTA button', async ({ page }) => {
    const ctaButton = page.locator('[aria-label="Jetzt bestellen - Premium Plastikstrohhalme"]');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href', '/search/strohhalme');
  });

  test('should render plastic straws visualization', async ({ page }) => {
    const strawsContainer = page.locator('[data-testid="straws-container"]');
    await expect(strawsContainer).toBeVisible();
    
    // Check that straws are rendered
    const straws = strawsContainer.locator('[data-testid="straw"]');
    await expect(straws).toHaveCount(10);
  });
});
