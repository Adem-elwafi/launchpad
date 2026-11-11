import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const DIST_DIR = path.resolve('dist');
const SCREENSHOT_DIR = 'C:\\Users\\Adem\\.gemini\\antigravity\\brain\\08e0e0e2-4d9b-46c8-a93b-b469bab19b5b\\screenshots';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
};

// Simple static server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA fallback
    const indexPath = path.join(DIST_DIR, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(indexPath).pipe(res);
  }
});

server.listen(4174, async () => {
  console.log('Static preview server running at http://localhost:4174');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:4174', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // 1. Initial State (Scroll = 0)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hero-scroll-0.png') });
  console.log('Saved hero-scroll-0.png');

  // 2. Scrolled State 1 (Scroll = 250px)
  await page.evaluate(() => window.scrollTo(0, 250));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hero-scroll-250.png') });
  console.log('Saved hero-scroll-250.png');

  // 3. Scrolled State 2 (Scroll = 450px)
  await page.evaluate(() => window.scrollTo(0, 450));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hero-scroll-450.png') });
  console.log('Saved hero-scroll-450.png');

  // 4. Network Section View
  const networkEl = await page.$('#network');
  if (networkEl) {
    await networkEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 800));
    await networkEl.screenshot({ path: path.join(SCREENSHOT_DIR, 'network-section.png') });
  } else {
    await page.evaluate(() => {
      const el = document.getElementById('network');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'network-section.png') });
  }
  console.log('Saved network-section.png');

  await browser.close();
  server.close();
  console.log('All screenshots captured successfully.');
  process.exit(0);
});
