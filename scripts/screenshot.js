const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-example.png', fullPage: true });
  await browser.close();
  console.log('Saved screenshot: screenshot-example.png');
})();
