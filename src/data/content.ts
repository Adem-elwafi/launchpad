// Content data repository for LaunchPad Marketing Landing Page
// All copy, pricing tiers, FAQs, feature definitions, and stats placeholders

export interface NavLink {
  name: string
  href: string
}

export interface FeatureCommit {
  hash: string
  msg: string
  author: string
  time: string
  status: 'healthy' | 'standby'
  traffic: string
  deployTime: string
}

export interface EdgeTelemetryLog {
  id: number
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  status: number
  region: string
  latency: number
  time: string
  cache: 'HIT' | 'BYPASS' | 'MISS'
}

export interface PricingPlan {
  name: string
  tagline: string
  monthlyPrice: string
  annualPrice: string
  priceUnit: string
  badge: string | null
  popular: boolean
  ctaText: string
  footnote: string
  features: string[]
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface EdgeLocation {
  id: string
  city: string
  country: string
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Middle East & Africa'
  x: number
  y: number
  ping: number
  throughput: number
  requests: string
  tier: string
  status: string
  ip: string
}

export const SITE_CONFIG = {
  name: 'LaunchPad',
  version: 'v2.0',
  tagline: 'Ship your code to production at the speed of thought.',
  accentColor: '#6D28D9',
  edgeLocationsCount: 184, // [YOUR NUMBER]+ edge locations
  proPriceMonthly: '$29',  // $[PRICE]/mo placeholder
  proPriceAnnual: '$24',   // 20% discount on annual
  defaultCommand: 'npx launchpad deploy',
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Product', href: '#features' },
  { name: 'Edge Network', href: '#network' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Docs', href: '#docs' },
  { name: 'Changelog', href: '#changelog' },
]

export const LOGO_BRANDS = [
  'Vercel',
  'Supabase',
  'Linear',
  'Raycast',
  'Resend',
]

export const HERO_CONTENT = {
  pillBadge: 'LaunchPad v2.0 is Live • Zero-Config Deployments',
  headlineLead: 'Ship your code to production at the ',
  headlineAccent: 'speed of thought.',
  subhead: 'Instant preview environments, serverless edge compute, and automated CI/CD pipelines. Connect your Git repository and launch in 42 seconds.',
  command: 'npx launchpad deploy',
  placeholderEmail: 'you@company.dev',
  ctaButtonText: 'Deploy Free',
  microcopy: 'Free tier forever • No credit card required',
  checklist: [
    'Instant Rollbacks',
    'Edge Caching',
    '99.99% SLA',
  ],
  telemetry: {
    commit: '8f3a9e',
    branch: 'main',
    buildNumber: 1402,
    latency: '42ms',
    metricLabel: 'Global Edge Latency',
  },
}

export const FEATURES_BENTO_CONTENT = {
  badge: 'Architecture & Capabilities',
  titleLead: 'Engineered for developers who ',
  titleAccent: 'refuse to wait',
  subhead: 'Sub-second edge routing, deterministic atomic pointer switches, and instant preview builds running directly on bare-metal V8 isolates.',
  
  // 3 Bento Features Max as specified
  features: [
    {
      id: 'atomic-rollbacks',
      title: 'Instant Atomic Rollbacks',
      subtitle: 'Zero-downtime routing pointer swaps at L4 Anycast edge',
      description: 'Never wait for container spins or database teardowns to revert a faulty release. Re-target Anycast edge routing pointers in under 800 microseconds with zero dropped TCP connections.',
      badge: 'Zero Downtime Cutover',
    },
    {
      id: 'ephemeral-previews',
      title: 'Ephemeral Preview Environments',
      subtitle: 'Instant isolated staging for every pull request',
      description: 'Push code to GitHub, GitLab, or Bitbucket. LaunchPad instantly provisions an isolated WebAssembly microVM runtime with deterministic preview URLs and isolated state.',
      badge: 'Auto-destructs on merge',
    },
    {
      id: 'edge-telemetry',
      title: 'Real-Time Edge Telemetry',
      subtitle: 'Live distributed HTTP request log waterfall',
      description: 'Trace packets across 180+ global edge nodes in real time. Inspect TTFB, cache hit ratios, and route latencies with zero configuration tracing agents.',
      badge: '142,840 req/s live stream',
    },
  ],
}

export const COMMITS_DATA: FeatureCommit[] = [
  {
    hash: '8f3a9e',
    msg: 'feat(auth): migrate session storage to edgeworkers',
    author: 'sara-dev',
    time: '2 mins ago',
    status: 'healthy',
    traffic: '100% active',
    deployTime: '0.8s',
  },
  {
    hash: 'e410b2a',
    msg: 'fix(db): resolve connection pool spike on cold boot',
    author: 'alex-k',
    time: '18 mins ago',
    status: 'healthy',
    traffic: 'standby',
    deployTime: '1.1s',
  },
  {
    hash: '9b7a13f',
    msg: 'chore: bump dependencies to engine v4.2-wasm',
    author: 'ci-bot',
    time: '1 hour ago',
    status: 'healthy',
    traffic: 'standby',
    deployTime: '0.9s',
  },
]

export const TELEMETRY_LOGS: EdgeTelemetryLog[] = [
  { id: 1, method: 'GET', path: '/api/v1/auth/session', status: 200, region: 'IAD1', latency: 8, time: '12:44:02.102', cache: 'HIT' },
  { id: 2, method: 'POST', path: '/api/checkout/verify', status: 201, region: 'LHR1', latency: 14, time: '12:44:02.245', cache: 'BYPASS' },
  { id: 3, method: 'GET', path: '/assets/app.wasm', status: 304, region: 'FRA1', latency: 4, time: '12:44:02.390', cache: 'HIT' },
  { id: 4, method: 'GET', path: '/api/telemetry/nodes', status: 200, region: 'NRT1', latency: 11, time: '12:44:02.518', cache: 'HIT' },
  { id: 5, method: 'GET', path: '/api/products/query', status: 200, region: 'SFO1', latency: 9, time: '12:44:02.684', cache: 'HIT' },
]

export const DARK_INTERLUDE_CONTENT = {
  badge: 'Zero-Config Execution',
  title: 'Deploy in seconds. Zero configuration.',
  subhead: 'Run a single terminal command or push to Git. LaunchPad automatically detects your framework, bundles WebAssembly isolates, and propagates to 184+ edge nodes in under 1.5 seconds.',
  packageManagers: [
    { name: 'npm', command: 'npm install -g launchpad && launchpad deploy' },
    { name: 'pnpm', command: 'pnpm add -g launchpad && launchpad deploy' },
    { name: 'yarn', command: 'yarn global add launchpad && launchpad deploy' },
    { name: 'bun', command: 'bun add -g launchpad && launchpad deploy' },
  ],
}

export const EDGE_NETWORK_CONTENT = {
  badge: 'Global Infrastructure',
  titleLead: `Anycast routing across `,
  titleAccent: `${SITE_CONFIG.edgeLocationsCount}+ edge locations`,
  subhead: 'Sub-20ms edge compute within 50 miles of 95% of internet users worldwide. Zero-downtime BGP failover and automatic volumetric DDoS scrubbing.',
  stats: [
    { label: 'Edge PoPs', value: `${SITE_CONFIG.edgeLocationsCount}+` },
    { label: 'Median Edge Latency', value: '18ms' },
    { label: 'Global Throughput', value: '120 Tbps' },
    { label: 'Uptime SLA', value: '99.999%' },
  ],
}

export const EDGE_POPS: EdgeLocation[] = [
  {
    id: 'IAD1',
    city: 'North Virginia',
    country: 'United States',
    region: 'Americas',
    x: 256,
    y: 128,
    ping: 4,
    throughput: 48.4,
    requests: '84,200 req/s',
    tier: 'Tier 1 Backbone',
    status: 'Optimal',
    ip: '104.28.16.1',
  },
  {
    id: 'SFO1',
    city: 'San Francisco',
    country: 'United States',
    region: 'Americas',
    x: 144,
    y: 131,
    ping: 6,
    throughput: 39.8,
    requests: '62,100 req/s',
    tier: 'Tier 1 Backbone',
    status: 'Optimal',
    ip: '104.28.22.4',
  },
  {
    id: 'LHR1',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    x: 450,
    y: 96,
    ping: 8,
    throughput: 44.2,
    requests: '71,400 req/s',
    tier: 'Tier 1 Transatlantic',
    status: 'Optimal',
    ip: '141.101.90.2',
  },
  {
    id: 'FRA1',
    city: 'Frankfurt',
    country: 'Germany',
    region: 'Europe',
    x: 476,
    y: 104,
    ping: 9,
    throughput: 41.5,
    requests: '68,900 req/s',
    tier: 'Tier 1 DE-CIX Core',
    status: 'Optimal',
    ip: '141.101.92.8',
  },
  {
    id: 'CAI1',
    city: 'Cairo',
    country: 'Egypt',
    region: 'Middle East & Africa',
    x: 498,
    y: 175,
    ping: 11,
    throughput: 35.1,
    requests: '41,800 req/s',
    tier: 'Tier 1 North Africa Gateway',
    status: 'Optimal',
    ip: '102.132.8.2',
  },
  {
    id: 'JNB1',
    city: 'Johannesburg',
    country: 'South Africa',
    region: 'Middle East & Africa',
    x: 485,
    y: 320,
    ping: 14,
    throughput: 38.6,
    requests: '48,200 req/s',
    tier: 'Tier 1 Pan-Africa Core',
    status: 'Optimal',
    ip: '102.130.16.1',
  },
  {
    id: 'NRT1',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia-Pacific',
    x: 785,
    y: 138,
    ping: 12,
    throughput: 36.7,
    requests: '54,300 req/s',
    tier: 'Tier 1 Asia-Pac Core',
    status: 'Optimal',
    ip: '172.68.10.9',
  },
  {
    id: 'SIN1',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia-Pacific',
    x: 705,
    y: 224,
    ping: 14,
    throughput: 32.1,
    requests: '49,800 req/s',
    tier: 'Tier 1 ASEAN Hub',
    status: 'Optimal',
    ip: '172.68.14.3',
  },
  {
    id: 'SYD1',
    city: 'Sydney',
    country: 'Australia',
    region: 'Asia-Pacific',
    x: 820,
    y: 310,
    ping: 18,
    throughput: 26.4,
    requests: '38,100 req/s',
    tier: 'Tier 1 Oceania',
    status: 'Optimal',
    ip: '162.158.40.1',
  },
  {
    id: 'GRU1',
    city: 'São Paulo',
    country: 'Brazil',
    region: 'Americas',
    x: 334,
    y: 284,
    ping: 16,
    throughput: 28.9,
    requests: '41,200 req/s',
    tier: 'Tier 1 South America',
    status: 'Optimal',
    ip: '172.69.22.7',
  },
]

export const PRICING_CONTENT = {
  badge: 'Predictable Infrastructure',
  title: 'Simple, Transparent Pricing',
  subhead: 'Predictable plans for teams of every scale. Zero egress surprises, transparent limits, and instant scaling.',
  discountPill: '-20% on Annual',
  plans: [
    {
      name: 'Hobby',
      tagline: 'Ideal for side projects, prototypes, and open source developers.',
      monthlyPrice: '$0',
      annualPrice: '$0',
      priceUnit: 'forever',
      badge: null,
      popular: false,
      ctaText: 'Deploy Free Now',
      footnote: 'Zero credit card required at sign up.',
      features: [
        'Unlimited instantaneous deploys',
        'Automatic wildcard HTTPS & SSL',
        '100 GB global edge bandwidth',
        '3 preview environments per branch',
        'Community Discord & Forum support',
        'Automated GitHub & GitLab CI webhooks',
      ],
    },
    {
      name: 'Pro',
      tagline: 'For fast-shipping product teams demanding real-time velocity and reliability.',
      monthlyPrice: SITE_CONFIG.proPriceMonthly,
      annualPrice: SITE_CONFIG.proPriceAnnual,
      priceUnit: 'per seat / month',
      badge: 'MOST POPULAR',
      popular: true,
      ctaText: 'Start 14-Day Pro Trial',
      footnote: 'Billed annually or monthly. Cancel anytime.',
      features: [
        'Everything in Hobby, plus:',
        '1 TB global edge bandwidth included',
        '150ms atomic instant rollbacks',
        'Unlimited custom domains & apex routing',
        '99.99% uptime SLA guaranteed',
        'Granular team RBAC (up to 20 seats)',
        '30-day real-time telemetry & log retention',
      ],
    },
    {
      name: 'Enterprise',
      tagline: 'Dedicated cloud runtime with bespoke compliance and mission-critical SLAs.',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      priceUnit: 'tailored cluster pricing',
      badge: 'MISSION CRITICAL',
      popular: false,
      ctaText: 'Talk to Flight Control',
      footnote: 'Custom contracts, invoicing, and wire transfers.',
      features: [
        'Everything in Pro, plus:',
        'Dedicated isolated compute clusters',
        '99.999% SLA uptime guarantee',
        'SOC2 Type II, ISO 27001 & HIPAA compliance',
        '24/7 dedicated Slack bridge & solutions engineer',
        'Custom edge caching rules & programmable WAF',
        'Single Sign-On (SAML/Okta/Azure AD)',
      ],
    },
  ] as PricingPlan[],
}

export const FAQ_CONTENT: { badge: string; title: string; subhead: string; items: FaqItem[] } = {
  badge: 'Clear Answers',
  title: 'Frequently Asked Questions',
  subhead: 'Everything you need to know about LaunchPad\'s edge infrastructure, migration, and billing logic.',
  items: [
    {
      id: 'domains-ssl',
      question: 'How do custom domains and automated SSL certificates work?',
      answer: 'Every deployment automatically provisions a Let’s Encrypt wildcard SSL certificate with automated zero-touch renewal. Connecting your apex domain or subdomain takes under 60 seconds with our Anycast ALIAS/CNAME routing mesh.',
    },
    {
      id: 'free-tier-limits',
      question: 'What are the limits on the free Hobby tier?',
      answer: 'The Hobby tier is free forever with no credit card required. It includes 100 GB of global edge egress per month, unlimited deployments, automated HTTPS, and 3 active preview environments per Git branch.',
    },
    {
      id: 'billing-traffic-spikes',
      question: 'How does LaunchPad protect against billing spikes during traffic surges?',
      answer: 'We provide strict spending caps and automated circuit breakers configured right from your console. You set thresholds (e.g. 80%, 100%), and our system ensures zero unexpected overage charges without unannounced throttling.',
    },
    {
      id: 'atomic-rollbacks',
      question: 'How do atomic rollbacks complete in under 150ms?',
      answer: 'Deployments are compiled into immutable WebAssembly snapshots pre-distributed across all edge PoPs. Rolling back simply re-targets the L4 Anycast BGP routing table pointer globally, bypassing rebuilds and container boot sequences.',
    },
    {
      id: 'migration',
      question: 'How easy is it to migrate from Vercel, AWS, or Cloudflare?',
      answer: 'Migration takes under 5 minutes. LaunchPad supports native Next.js, Vite, Astro, Remix, and static frameworks with zero code changes. Simply import your Git repository or run `npx launchpad deploy` in your project folder.',
    },
  ],
}

export const FINAL_CTA_CONTENT = {
  badge: 'Ready for Orbit',
  headline: 'Ready to ship your next idea into orbit?',
  subhead: 'Join over 40,000 developers deploying lightning-fast applications across our global Anycast edge network.',
  primaryBtn: 'Start Deploying Free',
  secondaryBtn: 'Explore Documentation',
  copyCommand: 'npx launchpad deploy',
}

export const FOOTER_CONTENT = {
  brandDescription: 'The next-generation cloud deployment platform for developers who refuse to wait. Zero-config builds, sub-second atomic rollbacks, and Anycast edge acceleration.',
  statusText: 'All systems operational — 184 PoPs',
  copyright: '© 2026 LaunchPad Technologies Inc. All rights reserved.',
  columns: [
    {
      title: 'Product',
      links: [
        { name: 'Edge Network', href: '#network' },
        { name: 'Atomic Rollbacks', href: '#features' },
        { name: 'Zero-Config CLI', href: '#terminal' },
        { name: 'Preview Environments', href: '#features' },
        { name: 'Pricing Tiers', href: '#pricing' },
      ],
    },
    {
      title: 'Developers',
      links: [
        { name: 'Documentation', href: '#docs' },
        { name: 'CLI Reference', href: '#terminal' },
        { name: 'SDKs & APIs', href: '#sdks' },
        { name: 'GitHub Integration', href: '#github' },
        { name: 'System Status', href: '#status' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Blog', href: '#blog' },
        { name: 'Careers', href: '#careers' },
        { name: 'Changelog', href: '#changelog' },
        { name: 'Press & Brand', href: '#brand' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Security (SOC2)', href: '#security' },
        { name: 'DPA & GDPR', href: '#gdpr' },
      ],
    },
  ],
}
