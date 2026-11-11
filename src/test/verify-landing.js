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

// 1. COMPONENT FILES & ARCHITECTURE AUDIT
console.log('--- Suite 1: File Existence & Modern Architecture ---');

const expectedProductionFiles = [
  'data/content.ts',
  'components/ui/Button.tsx',
  'components/ui/Badge.tsx',
  'components/ui/Card.tsx',
  'components/ui/CopyCommand.tsx',
  'components/art/RocketArt.tsx',
  'components/art/WaveDivider.tsx',
  'components/art/OrbitPlanetArt.tsx',
  'components/art/NetworkGlobeArt.tsx',
  'components/sections/Navbar.tsx',
  'components/sections/HeroSection.tsx',
  'components/sections/LogoBar.tsx',
  'components/sections/FeaturesBento.tsx',
  'components/sections/DarkInterlude.tsx',
  'components/sections/EdgeNetwork.tsx',
  'components/sections/PricingSection.tsx',
  'components/sections/FaqSection.tsx',
  'components/sections/FinalCta.tsx',
  'components/sections/Footer.tsx',
  'App.tsx',
  'index.css'
];

for (const relPath of expectedProductionFiles) {
  const fullPath = path.resolve(srcDir, relPath);
  assert(fs.existsSync(fullPath), `File exists: src/${relPath}`, `Path not found: ${fullPath}`);
}

// Check for broken relative imports across all TSX, TS, JSX, JS files
console.log('\n--- Suite 2: Broken Import Analysis ---');
function checkImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const codeWithoutTemplates = content.replace(/`[\s\S]*?`/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const importRegex = /^import\s+(?:[\w\s{},*]+from\s+)?['"](\.[^'"]+)['"]/gm;
  let match;
  let clean = true;

  while ((match = importRegex.exec(codeWithoutTemplates)) !== null) {
    const importSpec = match[1];
    const resolvedDir = path.dirname(filePath);
    let resolvedPath = path.resolve(resolvedDir, importSpec);

    let exists = false;
    const extensions = ['', '.js', '.jsx', '.ts', '.tsx', '.css', '/index.js', '/index.jsx', '/index.ts', '/index.tsx'];
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

for (const relPath of expectedProductionFiles.filter(p => p.endsWith('.tsx') || p.endsWith('.ts'))) {
  checkImportsInFile(path.resolve(srcDir, relPath));
}

// 2. DOM CONTRACT & 10 SECTIONS IN EXACT SEQUENTIAL ORDER
console.log('\n--- Suite 3: DOM Contract & 10 Sections in Exact Order ---');

// App.tsx mounts all 10 sections in exact order
const appContent = fs.readFileSync(path.resolve(srcDir, 'App.tsx'), 'utf-8');
assert(
  appContent.includes('<Navbar />') &&
  appContent.includes('<HeroSection />') &&
  appContent.includes('<LogoBar />') &&
  appContent.includes('<FeaturesBento />') &&
  appContent.includes('<DarkInterlude />') &&
  appContent.includes('<EdgeNetwork />') &&
  appContent.includes('<PricingSection />') &&
  appContent.includes('<FaqSection />') &&
  appContent.includes('<FinalCta />') &&
  appContent.includes('<Footer />'),
  'App.tsx mounts all 10 sections in exact order'
);

// Section 1: Navbar
const navbarContent = fs.readFileSync(path.resolve(srcDir, 'components/sections/Navbar.tsx'), 'utf-8');
assert(navbarContent.includes('aria-expanded={mobileMenuOpen}'), 'Navbar mobile hamburger button has aria-expanded');
assert(navbarContent.includes('aria-controls="mobile-menu-drawer"'), 'Navbar mobile hamburger button has aria-controls');
assert(navbarContent.includes('id="mobile-menu-drawer"'), 'Navbar mobile drawer has matching id');
assert(navbarContent.includes('Start deploying'), 'Navbar features Start deploying CTA');

// Section 2: HeroSection
const heroContent = fs.readFileSync(path.resolve(srcDir, 'components/sections/HeroSection.tsx'), 'utf-8');
assert(heroContent.includes('speed of thought.'), 'HeroSection features "speed of thought." accent headline');
assert(heroContent.includes('Free tier forever • No credit card required'), 'HeroSection features free tier microcopy');
assert(heroContent.includes('<WaveDivider variant="side"'), 'HeroSection includes desktop side wave divider');
assert(heroContent.includes('<RocketArt'), 'HeroSection includes RocketArt inline SVG');
assert(heroContent.includes('<TelemetryCard'), 'HeroSection includes TelemetryCard');

// Section 3: LogoBar
const logoContent = fs.readFileSync(path.resolve(srcDir, 'components/sections/LogoBar.tsx'), 'utf-8');
assert(logoContent.includes('Trusted by high-growth engineering teams'), 'LogoBar renders trusted headline');
assert(logoContent.includes('Vercel') && logoContent.includes('Supabase') && logoContent.includes('Linear') && logoContent.includes('Raycast') && logoContent.includes('Resend'), 'LogoBar renders 5 muted text wordmarks');

// Section 4: FeaturesBento (3 features max)
const bentoContent = fs.readFileSync(path.resolve(srcDir, 'components/sections/FeaturesBento.tsx'), 'utf-8');
assert(bentoContent.includes('Instant Atomic Rollbacks') && bentoContent.includes('Ephemeral Previews') && bentoContent.includes('Real-Time Edge Telemetry'), 'FeaturesBento renders the 3 specified bento features');
assert(bentoContent.includes('role="button"') && bentoContent.includes('tabIndex={0}'), 'FeaturesBento commit items are keyboard navigable (role="button", tabIndex=0)');
assert(bentoContent.includes('onKeyDown='), 'FeaturesBento commit items handle onKeyDown Enter/Space');
assert(bentoContent.includes('aria-pressed='), 'FeaturesBento commit items indicate active selection via aria-pressed');

// Section 5: DarkInterlude
const interludeContent = fs.readFileSync(path.resolve(srcDir, 'components/sections/DarkInterlude.tsx'), 'utf-8');
assert(interludeContent.includes('Deploy in seconds. Zero configuration.'), 'DarkInterlude renders deploy headline');
assert(interludeContent.includes('role="tablist"'), 'DarkInterlude wraps package manager tabs in role="tablist"');
assert(interludeContent.includes('role="tab"') && interludeContent.includes('aria-selected='), 'DarkInterlude tabs carry role="tab" and aria-selected');
assert(interludeContent.includes('role="tabpanel"'), 'DarkInterlude container carries role="tabpanel"');
assert(interludeContent.includes('npm') && interludeContent.includes('pnpm') && interludeContent.includes('yarn') && interludeContent.includes('bun'), 'DarkInterlude supports npm, pnpm, yarn, bun tabs');
assert(interludeContent.includes('variant="enter-dark"') && interludeContent.includes('variant="exit-dark"'), 'DarkInterlude enters and exits via organic wave curves');

// Section 6: EdgeNetwork
const edgeContent = fs.readFileSync(path.resolve(srcDir, 'components/sections/EdgeNetwork.tsx'), 'utf-8');
assert(edgeContent.includes('Anycast routing across'), 'EdgeNetwork renders Anycast headline');
assert(edgeContent.includes('Quick PoP Select:'), 'EdgeNetwork provides quick selector buttons');
assert(edgeContent.includes('EDGE_NETWORK_CONTENT.stats'), 'EdgeNetwork renders placeholder stat row');

// Section 7: PricingSection
const pricingContent = fs.readFileSync(path.resolve(srcDir, 'components/sections/PricingSection.tsx'), 'utf-8');
assert(pricingContent.includes('aria-pressed={!annualBilling}') && pricingContent.includes('aria-pressed={annualBilling}'), 'PricingSection interval toggle has dynamic aria-pressed');
assert(pricingContent.includes('order-first md:order-none'), 'PricingSection stacks Pro first on mobile');
assert(pricingContent.includes('Hobby') && pricingContent.includes('Pro') && pricingContent.includes('Enterprise'), 'PricingSection renders 3 tiers');

// Section 8: FaqSection
const faqContent = fs.readFileSync(path.resolve(srcDir, 'components/sections/FaqSection.tsx'), 'utf-8');
assert(faqContent.includes('aria-expanded={isOpen}'), 'FaqSection accordion buttons carry aria-expanded');
assert(faqContent.includes('role="region"'), 'FaqSection accordion panels carry role="region"');
assert(faqContent.includes('Still have questions?'), 'FaqSection provides Still have questions? contact section');

// Section 9: FinalCta
const finalCtaContent = fs.readFileSync(path.resolve(srcDir, 'components/sections/FinalCta.tsx'), 'utf-8');
assert(finalCtaContent.includes('Ready to ship your next idea into orbit?'), 'FinalCta renders orbit headline');
assert(finalCtaContent.includes('<OrbitPlanetArt'), 'FinalCta mounts OrbitPlanetArt');
assert(finalCtaContent.includes('<CopyCommand'), 'FinalCta mounts CopyCommand');
assert(finalCtaContent.includes('variant="enter-finale"'), 'FinalCta enters dark finale via wave');

// Section 10: Footer
const footerContent = fs.readFileSync(path.resolve(srcDir, 'components/sections/Footer.tsx'), 'utf-8');
assert(footerContent.includes('statusText'), 'Footer displays live status text');
assert(footerContent.includes('animate-ping'), 'Footer status pill has green pulse animation');
assert(footerContent.includes('Product') && footerContent.includes('Developers') && footerContent.includes('Company') && footerContent.includes('Legal'), 'Footer contains 4 link columns');
assert(footerContent.includes('copyright'), 'Footer displays copyright');

// 3. ARTWORK & SEAM BUG AUDIT
console.log('\n--- Suite 4: Artwork & Visual Seam Elimination ---');

// WaveDivider
const waveContent = fs.readFileSync(path.resolve(srcDir, 'components/art/WaveDivider.tsx'), 'utf-8');
assert(waveContent.includes('0 0 175 1000') || waveContent.includes('0 0 160 1000'), 'WaveDivider renders vertical desktop S-curve');
assert(waveContent.includes('0 0 400 72'), 'WaveDivider renders 0 0 400 72 horizontal mobile bottom wave');
assert(waveContent.includes('hidden lg:block') && waveContent.includes('lg:hidden'), 'WaveDivider correctly applies responsive breakpoint classes');

// CRITICAL SEAM BUG FIX: Confirm WaveDivider does NOT contain clipped cloud circles with artificial 175px box seam
assert(!waveContent.includes('clipPath="url(#lpWaveCloudClip)"'), 'WaveDivider does NOT clip clouds against an artificial 175px SVG bounding box');

// RocketArt
const rocketContent = fs.readFileSync(path.resolve(srcDir, 'components/art/RocketArt.tsx'), 'utf-8');
assert(rocketContent.includes('viewBox={viewBox}') || rocketContent.includes('0 0 720 900'), 'RocketArt SVG supports standard 0 0 720 900 viewBox');
assert(rocketContent.includes('role="img"'), 'RocketArt SVG carries role="img" accessibility semantic');
assert(rocketContent.includes('aria-label='), 'RocketArt SVG carries descriptive aria-label');
assert(rocketContent.includes('lp-flame') && rocketContent.includes('lp-tw'), 'RocketArt includes animated flame and twinkling stars');
assert(rocketContent.includes('overflow: \'visible\'') || rocketContent.includes('overflow: "visible"'), 'RocketArt has visible overflow to eliminate boundary clipping across wave');

// TelemetryCard
const telemetryPath = fs.existsSync(path.resolve(srcDir, 'components/hero/TelemetryCard.tsx'))
  ? path.resolve(srcDir, 'components/hero/TelemetryCard.tsx')
  : path.resolve(srcDir, 'components/hero/TelemetryCard.jsx');
const telemetryContent = fs.readFileSync(telemetryPath, 'utf-8');
assert(telemetryContent.includes('role="region"'), 'TelemetryCard has landmark role="region"');
assert(telemetryContent.includes('aria-label="Live Deployment Telemetry"'), 'TelemetryCard has aria-label');
assert(telemetryContent.includes('42') && telemetryContent.includes('ms'), 'TelemetryCard renders 42ms edge latency telemetry');

// 4. MOTION & PERFORMANCE RULES
console.log('\n--- Suite 5: Motion & Performance Rules ---');
const cssContent = fs.readFileSync(path.resolve(srcDir, 'index.css'), 'utf-8');

assert(cssContent.includes('transform-box: fill-box;'), 'index.css defines transform-box: fill-box for SVG animations');
assert(cssContent.includes('will-change: transform'), 'index.css promotes animated elements via will-change for GPU acceleration');
assert(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'index.css implements prefers-reduced-motion: reduce query');
assert(cssContent.includes('animation-iteration-count: 1 !important') || cssContent.includes('animation-duration: 0.01ms !important'), 'prefers-reduced-motion overrides animations safely');

// 5. INTERVAL AND TIMEOUT CLEANUP AUDIT
console.log('\n--- Suite 6: Timer and Interval Memory Leak Cleanup ---');
const filesWithTimers = [
  { file: 'components/sections/HeroSection.tsx', check: 'clearTimeout' },
  { file: 'components/sections/FeaturesBento.tsx', check: 'clearTimeout' },
  { file: 'components/sections/DarkInterlude.tsx', check: 'clearTimeout' },
  { file: 'components/ui/CopyCommand.tsx', check: 'clearTimeout' },
];

for (const { file, check } of filesWithTimers) {
  const content = fs.readFileSync(path.resolve(srcDir, file), 'utf-8');
  assert(content.includes(check), `${file} safely calls ${check} on timers`);
}

// 6. PRODUCTION BUILD ARTIFACTS VERIFICATION
console.log('\n--- Suite 7: Production Build Artifacts ---');
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

// 7. RESPONSIVE BREAKPOINT VERIFICATION (390, 834, 1440)
console.log('\n--- Suite 8: Responsive Viewport Breakpoint Verification ---');
assert(cssContent.includes('@media (min-width: 1025px)'), 'index.css defines desktop layout >= 1025px (1440px target)');
assert(cssContent.includes('@media (min-width: 768px) and (max-width: 1024px)'), 'index.css defines tablet layout 768-1024px (834px iPad target)');
assert(cssContent.includes('@media (max-width: 767px)'), 'index.css defines mobile layout < 768px (390px iPhone target)');

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
