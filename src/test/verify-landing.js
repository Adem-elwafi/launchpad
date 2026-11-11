import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');
const srcDir = path.resolve(rootDir, 'src');

console.log('🚀 Running LaunchPad Landing Page Automated Verification Suite...\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    if (details) console.error(`     ↳ ${details}`);
    failCount++;
  }
}

// 1. COMPONENT FILES & IMPORTS AUDIT
console.log('--- Suite 1: File Existence & Import Resolution ---');

const expectedComponents = [
  'App.jsx',
  'components/layout/Navbar.jsx',
  'components/hero/HeroSection.jsx',
  'components/hero/WaveDivider.jsx',
  'components/hero/RocketArt.jsx',
  'components/hero/TelemetryCard.jsx',
  'components/hero/TerminalSnippet.jsx',
  'components/social/SocialProof.jsx',
  'components/features/FeaturesBento.jsx',
  'components/terminal/InteractiveTerminal.jsx',
  'components/network/EdgeNetwork.jsx',
  'components/pricing/PricingSection.jsx',
  'components/layout/Footer.jsx',
  'lib/utils.js',
  'index.css'
];

for (const relPath of expectedComponents) {
  const fullPath = path.resolve(srcDir, relPath);
  assert(fs.existsSync(fullPath), `File exists: src/${relPath}`, `Path not found: ${fullPath}`);
}

// Check for broken relative imports across all JSX files
console.log('\n--- Suite 2: Broken Import Analysis ---');
function checkImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Strip template literals and multi-line comments so sample code snippets aren't confused with module imports
  const codeWithoutTemplates = content.replace(/`[\s\S]*?`/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const importRegex = /^import\s+(?:[\w\s{},*]+from\s+)?['"](\.[^'"]+)['"]/gm;
  let match;
  let clean = true;

  while ((match = importRegex.exec(codeWithoutTemplates)) !== null) {
    const importSpec = match[1];
    const resolvedDir = path.dirname(filePath);
    let resolvedPath = path.resolve(resolvedDir, importSpec);

    // Try extensions
    let exists = false;
    const extensions = ['', '.js', '.jsx', '.ts', '.tsx', '.css', '/index.js', '/index.jsx'];
    for (const ext of extensions) {
      if (fs.existsSync(resolvedPath + ext) && fs.statSync(resolvedPath + ext).isFile()) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      clean = false;
      assert(false, `Import resolution in ${path.basename(filePath)} -> ${importSpec}`, `Could not resolve ${importSpec} from ${filePath}`);
    }
  }

  if (clean) {
    assert(true, `All relative imports resolve in ${path.basename(filePath)}`);
  }
}

for (const relPath of expectedComponents.filter(p => p.endsWith('.jsx'))) {
  checkImportsInFile(path.resolve(srcDir, relPath));
}

// 2. DOM CONTRACT & COMPONENT CONFORMITY AUDIT
console.log('\n--- Suite 3: DOM Contract & Component Conformity ---');

// App.jsx
const appContent = fs.readFileSync(path.resolve(srcDir, 'App.jsx'), 'utf-8');
assert(appContent.includes('<Navbar />') && appContent.includes('<HeroSection />') && appContent.includes('<Footer />'), 'App.jsx mounts Navbar, HeroSection, and Footer');
assert(appContent.includes('<SocialProof />') && appContent.includes('<FeaturesBento />'), 'App.jsx mounts SocialProof and FeaturesBento');
assert(appContent.includes('<InteractiveTerminal />') && appContent.includes('<EdgeNetwork />') && appContent.includes('<PricingSection />'), 'App.jsx mounts InteractiveTerminal, EdgeNetwork, and PricingSection');

// WaveDivider
const waveContent = fs.readFileSync(path.resolve(srcDir, 'components/hero/WaveDivider.jsx'), 'utf-8');
assert(waveContent.includes('0 0 175 1000') || waveContent.includes('0 0 160 1000'), 'WaveDivider renders vertical desktop S-curve');
assert(waveContent.includes('0 0 400 72'), 'WaveDivider renders 0 0 400 72 horizontal mobile bottom wave');
assert(waveContent.includes('hidden lg:block') && waveContent.includes('lg:hidden'), 'WaveDivider correctly applies responsive breakpoint classes');

// RocketArt
const rocketContent = fs.readFileSync(path.resolve(srcDir, 'components/hero/RocketArt.jsx'), 'utf-8');
assert(rocketContent.includes('viewBox="0 0 720 900"'), 'RocketArt SVG has standard 0 0 720 900 viewBox');
assert(rocketContent.includes('role="img"'), 'RocketArt SVG carries role="img" accessibility semantic');
assert(rocketContent.includes('aria-label='), 'RocketArt SVG carries descriptive aria-label');

// TelemetryCard
const telemetryContent = fs.readFileSync(path.resolve(srcDir, 'components/hero/TelemetryCard.jsx'), 'utf-8');
assert(telemetryContent.includes('role="region"'), 'TelemetryCard has landmark role="region"');
assert(telemetryContent.includes('aria-label="Live Deployment Telemetry"'), 'TelemetryCard has aria-label');
assert(telemetryContent.includes('42') && telemetryContent.includes('Global Edge Latency'), 'TelemetryCard renders 42ms edge latency telemetry');

// TerminalSnippet
const snippetContent = fs.readFileSync(path.resolve(srcDir, 'components/hero/TerminalSnippet.jsx'), 'utf-8');
assert(snippetContent.includes('npx launchpad deploy'), 'TerminalSnippet features the core CLI command');
assert(snippetContent.includes('aria-label='), 'TerminalSnippet copy button provides dynamic aria-label');

// FeaturesBento
const bentoContent = fs.readFileSync(path.resolve(srcDir, 'components/features/FeaturesBento.jsx'), 'utf-8');
assert(bentoContent.includes('md:col-span-2'), 'FeaturesBento applies Bento 2-column spans');
assert(bentoContent.includes('role="button"') && bentoContent.includes('tabIndex={0}'), 'FeaturesBento commit items are keyboard navigable (role="button", tabIndex=0)');
assert(bentoContent.includes('onKeyDown='), 'FeaturesBento commit items handle onKeyDown Enter/Space');
assert(bentoContent.includes('aria-pressed='), 'FeaturesBento commit items indicate active selection via aria-pressed');

// InteractiveTerminal
const terminalContent = fs.readFileSync(path.resolve(srcDir, 'components/terminal/InteractiveTerminal.jsx'), 'utf-8');
assert(terminalContent.includes('role="tablist"'), 'InteractiveTerminal wraps framework tabs in role="tablist"');
assert(terminalContent.includes('role="tab"') && terminalContent.includes('aria-selected='), 'InteractiveTerminal tabs carry role="tab" and aria-selected');
assert(terminalContent.includes('role="tabpanel"'), 'InteractiveTerminal terminal container carries role="tabpanel"');
assert(terminalContent.includes('aria-label='), 'InteractiveTerminal buttons have accessible aria-labels');

// EdgeNetwork
const edgeContent = fs.readFileSync(path.resolve(srcDir, 'components/network/EdgeNetwork.jsx'), 'utf-8');
assert(edgeContent.includes('role="img"'), 'EdgeNetwork SVG map has role="img"');
assert(edgeContent.includes('role="button"') && edgeContent.includes('tabIndex={0}'), 'EdgeNetwork PoP SVG nodes have role="button" and tabIndex={0}');
assert(edgeContent.includes('onKeyDown='), 'EdgeNetwork PoP SVG nodes have onKeyDown handler');
assert(edgeContent.includes('Quick PoP Select:'), 'EdgeNetwork provides quick selector buttons');

// PricingSection
const pricingContent = fs.readFileSync(path.resolve(srcDir, 'components/pricing/PricingSection.jsx'), 'utf-8');
assert(pricingContent.includes('aria-pressed={!annualBilling}') && pricingContent.includes('aria-pressed={annualBilling}'), 'PricingSection interval toggle has dynamic aria-pressed');
assert(pricingContent.includes('aria-expanded={isOpen}'), 'PricingSection FAQ buttons have aria-expanded');
assert(pricingContent.includes('role="region"'), 'PricingSection FAQ accordion body has role="region"');

// Navbar
const navbarContent = fs.readFileSync(path.resolve(srcDir, 'components/layout/Navbar.jsx'), 'utf-8');
assert(navbarContent.includes('aria-expanded={mobileMenuOpen}'), 'Navbar mobile hamburger button has aria-expanded');
assert(navbarContent.includes('aria-controls="mobile-menu-drawer"'), 'Navbar mobile hamburger button has aria-controls');
assert(navbarContent.includes('id="mobile-menu-drawer"'), 'Navbar mobile drawer has matching id');

// 3. MOTION & PERFORMANCE VERIFICATION
console.log('\n--- Suite 4: Motion & Performance Rules ---');
const cssContent = fs.readFileSync(path.resolve(srcDir, 'index.css'), 'utf-8');

assert(cssContent.includes('transform-box: fill-box;'), 'index.css defines transform-box: fill-box for SVG animations');
assert(cssContent.includes('will-change: transform'), 'index.css promotes animated elements via will-change for GPU acceleration');
assert(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'index.css implements prefers-reduced-motion: reduce query');
assert(cssContent.includes('animation-iteration-count: 1 !important') || cssContent.includes('animation-duration: 0.01ms !important'), 'prefers-reduced-motion overrides animations safely');

// 4. MEMORY LEAK CLEANUP VERIFICATION
console.log('\n--- Suite 5: Interval and Timeout Memory Leak Cleanup ---');
const filesWithTimers = [
  { file: 'components/hero/HeroSection.jsx', check: 'clearTimeout' },
  { file: 'components/hero/TerminalSnippet.jsx', check: 'clearTimeout' },
  { file: 'components/features/FeaturesBento.jsx', check: 'clearTimeout' },
  { file: 'components/terminal/InteractiveTerminal.jsx', check: 'clearTimeout' }
];

for (const { file, check } of filesWithTimers) {
  const content = fs.readFileSync(path.resolve(srcDir, file), 'utf-8');
  assert(content.includes(check), `${file} safely calls ${check} on timers`);
}

// 5. PRODUCTION BUILD ARTIFACTS VERIFICATION
console.log('\n--- Suite 6: Production Build Artifacts ---');
const distDir = path.resolve(rootDir, 'dist');
assert(fs.existsSync(distDir), 'Production dist directory exists');
assert(fs.existsSync(path.resolve(distDir, 'index.html')), 'dist/index.html exists');

const distAssets = fs.existsSync(path.resolve(distDir, 'assets')) 
  ? fs.readdirSync(path.resolve(distDir, 'assets'))
  : [];

const jsBundle = distAssets.find(f => f.endsWith('.js'));
const cssBundle = distAssets.find(f => f.endsWith('.css'));

assert(Boolean(jsBundle), `Production JS bundle generated (${jsBundle || 'none'})`);
assert(Boolean(cssBundle), `Production CSS bundle generated (${cssBundle || 'none'})`);

if (jsBundle) {
  const jsSize = fs.statSync(path.resolve(distDir, 'assets', jsBundle)).size;
  assert(jsSize > 10000, `JS bundle has valid content (${Math.round(jsSize / 1024)} KB)`);
}

if (cssBundle) {
  const cssSize = fs.statSync(path.resolve(distDir, 'assets', cssBundle)).size;
  assert(cssSize > 5000, `CSS bundle has valid content (${Math.round(cssSize / 1024)} KB)`);
}

// SUMMARY REPORT
console.log('\n======================================================');
console.log(`Verification Complete: ${passCount} Passed, ${failCount} Failed.`);
console.log('======================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL AUDIT CHECKS PASSED - RELEASE READINESS CONFIRMED!\n');
  process.exit(0);
}
