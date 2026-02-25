import puppeteer from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const screenshotsDir = join(__dirname, 'temporary screenshots');
if (!existsSync(screenshotsDir)) mkdirSync(screenshotsDir, { recursive: true });

// Auto-increment
const existing = existsSync(screenshotsDir) ? readdirSync(screenshotsDir).filter(f => f.endsWith('.png')) : [];
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] || '0')).filter(Boolean);
const n = nums.length ? Math.max(...nums) + 1 : 1;
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const filepath = join(screenshotsDir, filename);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
// Scroll through page to trigger IntersectionObserver for all reveal elements
await page.evaluate(async () => {
  await new Promise(resolve => {
    const distance = 400;
    const delay = 80;
    const timer = setInterval(() => {
      window.scrollBy(0, distance);
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        clearInterval(timer);
        window.scrollTo(0, 0);
        resolve();
      }
    }, delay);
  });
});
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: filepath, fullPage: true });
await browser.close();

console.log('Saved:', filepath);
