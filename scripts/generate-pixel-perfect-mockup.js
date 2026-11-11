import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const SCREENSHOT_DIR = 'C:\\Users\\Adem\\.gemini\\antigravity\\brain\\08e0e0e2-4d9b-46c8-a93b-b469bab19b5b\\screenshots';
const OUTPUT_PATH = 'C:\\Users\\Adem\\.gemini\\antigravity\\brain\\08e0e0e2-4d9b-46c8-a93b-b469bab19b5b\\launchpad_100pct_real_mockup.png';

const desktopBase64 = fs.readFileSync(path.join(SCREENSHOT_DIR, 'capture-desktop.png')).toString('base64');
const tabletBase64 = fs.readFileSync(path.join(SCREENSHOT_DIR, 'capture-tablet.png')).toString('base64');
const mobileBase64 = fs.readFileSync(path.join(SCREENSHOT_DIR, 'capture-mobile.png')).toString('base64');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 2560px;
    height: 1440px;
    overflow: hidden;
    background: #070510;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    position: relative;
  }

  /* Atmospheric Studio Illumination */
  .studio-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 1600px 900px at 50% 38%, rgba(124, 58, 237, 0.32) 0%, rgba(109, 40, 217, 0.14) 42%, rgba(7, 5, 16, 0) 78%),
      radial-gradient(circle 800px at 85% 60%, rgba(139, 92, 246, 0.22) 0%, rgba(7, 5, 16, 0) 65%),
      radial-gradient(circle 700px at 15% 50%, rgba(99, 102, 241, 0.18) 0%, rgba(7, 5, 16, 0) 65%),
      linear-gradient(180deg, #080614 0%, #04030A 100%);
  }

  /* Dark Obsidian Studio Floor with Vignette */
  .studio-floor {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 420px;
    background: linear-gradient(180deg, rgba(22, 17, 44, 0.75) 0%, rgba(7, 5, 16, 0.98) 100%);
    border-top: 1px solid rgba(167, 139, 250, 0.22);
    box-shadow: 0 -25px 90px rgba(109, 40, 217, 0.2);
  }

  /* Floor Glow Streak */
  .ground-glow {
    position: absolute;
    left: 5%;
    right: 5%;
    bottom: 400px;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.5) 20%, rgba(196, 181, 253, 0.85) 50%, rgba(124, 58, 237, 0.5) 80%, transparent 100%);
    filter: blur(2px);
    box-shadow: 0 0 25px rgba(139, 92, 246, 0.8);
  }

  .stage {
    position: absolute;
    inset: 0;
    width: 2560px;
    height: 1440px;
  }

  /* 1. CENTER: Studio Display */
  .studio-display {
    position: absolute;
    left: 390px;
    top: 45px;
    width: 1880px;
    height: 1222px;
    z-index: 1;
    filter: drop-shadow(0 40px 100px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 85px rgba(124, 58, 237, 0.22));
  }

  .display-stand-neck {
    position: absolute;
    left: 50%;
    bottom: -110px;
    transform: translateX(-50%);
    width: 260px;
    height: 130px;
    background: linear-gradient(180deg, #1E1B2E 0%, #0E0C17 100%);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-bottom: none;
    z-index: -1;
  }

  .display-stand-base {
    position: absolute;
    left: 50%;
    bottom: -125px;
    transform: translateX(-50%);
    width: 460px;
    height: 18px;
    border-radius: 9px;
    background: linear-gradient(180deg, #2B273E 0%, #131020 100%);
    border: 1px solid rgba(255, 255, 255, 0.14);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.85), 0 0 30px rgba(124, 58, 237, 0.25);
    z-index: -1;
  }

  .display-chassis {
    width: 100%;
    height: 100%;
    background: #110F1C;
    border-radius: 26px;
    padding: 16px;
    box-shadow:
      0 0 0 1.5px rgba(255, 255, 255, 0.14),
      0 0 0 3px rgba(0, 0, 0, 0.95),
      inset 0 1px 1.5px rgba(255, 255, 255, 0.4);
    position: relative;
  }

  .display-screen-wrap {
    width: 100%;
    height: 100%;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    background: #000;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .display-screen-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  /* 2. LEFT: iPad Pro 13-inch (M4) */
  .ipad-pro {
    position: absolute;
    left: 35px;
    top: 260px;
    width: 630px;
    height: 902px;
    z-index: 2;
    filter: drop-shadow(25px 35px 70px rgba(0, 0, 0, 0.88)) drop-shadow(0 0 50px rgba(99, 102, 241, 0.22));
  }

  .ipad-chassis {
    width: 100%;
    height: 100%;
    background: #141220;
    border-radius: 36px;
    padding: 12px;
    box-shadow:
      0 0 0 1.5px rgba(255, 255, 255, 0.18),
      0 0 0 3px rgba(0, 0, 0, 0.95),
      inset 0 1px 1.5px rgba(255, 255, 255, 0.45);
    position: relative;
  }

  .ipad-camera {
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: #000;
    border: 1px solid #2B283D;
    border-radius: 50%;
    z-index: 10;
  }

  .ipad-screen-wrap {
    width: 100%;
    height: 100%;
    border-radius: 26px;
    overflow: hidden;
    position: relative;
    background: #000;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  }

  .ipad-screen-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  /* 3. BOTTOM RIGHT: iPhone 16 Pro Max */
  .iphone-pro {
    position: absolute;
    right: 40px;
    top: 365px;
    width: 485px;
    height: 1050px;
    z-index: 3;
    filter: drop-shadow(-25px 35px 85px rgba(0, 0, 0, 0.92)) drop-shadow(0 0 55px rgba(124, 58, 237, 0.35));
  }

  .iphone-chassis {
    width: 100%;
    height: 100%;
    background: #171424;
    border-radius: 56px;
    padding: 10px;
    box-shadow:
      0 0 0 1.5px rgba(255, 255, 255, 0.25),
      0 0 0 3.5px rgba(0, 0, 0, 0.95),
      inset 0 1px 2px rgba(255, 255, 255, 0.55),
      inset 0 0 0 1px rgba(139, 92, 246, 0.3);
    position: relative;
  }

  .dynamic-island {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 125px;
    height: 35px;
    background: #000;
    border-radius: 20px;
    z-index: 15;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
  }

  .iphone-screen-wrap {
    width: 100%;
    height: 100%;
    border-radius: 48px;
    overflow: hidden;
    position: relative;
    background: #000;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .iphone-screen-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  /* Ultra-realistic Glass Screen Sheen */
  .screen-glare {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 32%, rgba(255, 255, 255, 0) 55%);
    pointer-events: none;
    z-index: 5;
  }

  /* Dark Desk Reflections */
  .reflection-layer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -220px;
    height: 300px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.16;
    filter: blur(3px);
    mask-image: linear-gradient(to top, transparent 15%, black 90%);
    -webkit-mask-image: linear-gradient(to top, transparent 15%, black 90%);
  }

  .reflection-display {
    position: absolute;
    left: 390px;
    width: 1880px;
    height: 250px;
    transform: scaleY(-1);
    border-radius: 26px;
    overflow: hidden;
  }

  .reflection-ipad {
    position: absolute;
    left: 35px;
    width: 630px;
    height: 220px;
    transform: scaleY(-1);
    border-radius: 36px;
    overflow: hidden;
  }

  .reflection-iphone {
    position: absolute;
    right: 40px;
    width: 485px;
    height: 220px;
    transform: scaleY(-1);
    border-radius: 56px;
    overflow: hidden;
  }
</style>
</head>
<body>
  <div class="studio-bg"></div>
  <div class="studio-floor"></div>
  <div class="ground-glow"></div>

  <!-- Reflections on obsidian surface -->
  <div class="reflection-layer">
    <div class="reflection-display">
      <img src="data:image/png;base64,${desktopBase64}" style="width:100%; height:1222px; margin-top:-972px; object-fit:cover;" />
    </div>
    <div class="reflection-ipad">
      <img src="data:image/png;base64,${tabletBase64}" style="width:100%; height:902px; margin-top:-682px; object-fit:cover;" />
    </div>
    <div class="reflection-iphone">
      <img src="data:image/png;base64,${mobileBase64}" style="width:100%; height:1050px; margin-top:-830px; object-fit:cover;" />
    </div>
  </div>

  <div class="stage">
    <!-- CENTER: Studio Display -->
    <div class="studio-display">
      <div class="display-stand-neck"></div>
      <div class="display-stand-base"></div>
      <div class="display-chassis">
        <div class="display-screen-wrap">
          <img src="data:image/png;base64,${desktopBase64}" alt="LaunchPad Desktop UI" />
          <div class="screen-glare"></div>
        </div>
      </div>
    </div>

    <!-- LEFT: iPad Pro 13-inch (M4) -->
    <div class="ipad-pro">
      <div class="ipad-chassis">
        <div class="ipad-camera"></div>
        <div class="ipad-screen-wrap">
          <img src="data:image/png;base64,${tabletBase64}" alt="LaunchPad Tablet UI" />
          <div class="screen-glare"></div>
        </div>
      </div>
    </div>

    <!-- BOTTOM RIGHT: iPhone 16 Pro Max -->
    <div class="iphone-pro">
      <div class="iphone-chassis">
        <div class="dynamic-island"></div>
        <div class="iphone-screen-wrap">
          <img src="data:image/png;base64,${mobileBase64}" alt="LaunchPad Mobile UI" />
          <div class="screen-glare"></div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

async function renderMockup() {
  console.log('Rendering refined 100% real responsive mockup...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=2560,1440'],
    defaultViewport: { width: 2560, height: 1440, deviceScaleFactor: 1 }
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: OUTPUT_PATH,
    type: 'png'
  });

  console.log('Successfully saved to:', OUTPUT_PATH);
  await browser.close();
}

renderMockup().catch(console.error);
