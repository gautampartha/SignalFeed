import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:5180', channel: 'chrome', headless: true },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1050 } } },
    { name: 'iphone', use: { viewport: { width: 393, height: 852 }, isMobile: true, deviceScaleFactor: 3, hasTouch: true } },
  ],
  webServer: { command: 'npm run dev', url: 'http://127.0.0.1:5180', reuseExistingServer: true },
});
