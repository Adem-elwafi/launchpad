import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const PORT = 4180;
const DIST_DIR = path.resolve('dist');
const OUTPUT_DIR = 'C:\\Users\\Adem\\.gemini\\antigravity\\brain\\08e0e0e2-4d9b-46c8-a93b-b469bab19b5b\\screenshots';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp'
};

function startServer() {
  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';
    
    let filePath = path.join(DIST_DIR, reqPath);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST_DIR, 'index.html');
    }
    
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading file: ' + err.message);
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, '127.0.0.1', () => {
      console.log(`Server listening on http://127.0.0.1:${PORT}`);
      resolve(server);
    });
  });
}

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const server = await startServer();

  console.log('Launching Puppeteer with Chrome at:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=none',
      '--force-color-profile=srgb'
    ]
  });

  const targets = [
    {
      name: 'Mobile',
      file: 'capture-mobile.png',
      width: 393,
      height: 852
    },
    {
      name: 'Tablet',
      file: 'capture-tablet.png',
      width: 834,
      height: 1194
    },
    {
      name: 'Desktop',
      file: 'capture-desktop.png',
      width: 1512,
      height: 982
    }
  ];

  for (const target of targets) {
    console.log(`Capturing ${target.name} (${target.width}x${target.height})...`);
    const page = await browser.newPage();
    await page.setViewport({
      width: target.width,
      height: target.height,
      deviceScaleFactor: 2
    });

    await page.goto(`http://127.0.0.1:${PORT}`, {
      waitUntil: ['load', 'networkidle0'],
      timeout: 30000
    });

    // Wait for fonts to be ready
    await page.evaluate(async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }
    });

    // Wait extra time for React render and any animations to complete
    await new Promise(r => setTimeout(r, 1500));

    const outputPath = path.join(OUTPUT_DIR, target.file);
    await page.screenshot({
      path: outputPath,
      clip: {
        x: 0,
        y: 0,
        width: target.width,
        height: target.height
      }
    });

    console.log(`Saved ${target.name} to ${outputPath}`);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('All captures completed successfully.');
}

run().catch(err => {
  console.error('Fatal error in capture script:', err);
  process.exit(1);
});
