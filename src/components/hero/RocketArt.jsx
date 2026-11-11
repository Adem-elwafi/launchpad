import React, { useSyncExternalStore } from 'react';
import { motion, useTransform, useReducedMotion, useMotionValue } from 'framer-motion';

function subscribeDesktop(callback) {
  const media = window.matchMedia('(min-width: 1024px)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 1024px)').matches;
}

function getDesktopServerSnapshot() {
  return false;
}

/**
 * RocketArt component
 * 1:1 Pixel-perfect SVG artwork from Claude Design reference prototype with
 * Signature Move 1 Rocket Launch Scrub:
 * - Handcrafted responsive cosmic SVG (viewBox 0 0 720 900)
 * - Sky glow & satellite orbit with animateMotion + subtle parallax drift
 * - Constellations & dust dots with multi-depth parallax
 * - 4-point twinkling stars (.lp-tw) & cross sparkles
 * - Trajectory dash line (.lp-traj) & dynamically expanding exhaust plume
 * - Ascending rocket scrubbed along diagonal trajectory (translate x,y and pitch rotate)
 * - Dynamic flame layers scale & glow brightening driven by weighted spring physics
 * - Ground hill, launch clouds (.lp-drift, .lp-drift-b)
 * - Astronaut developer on ridge looking through telescope
 * - Full reduced-motion and mobile (< 1024px) fallback to static/idle hover state
 */
export default function RocketArt({ scrollProgress }) {
  const fallbackProgress = useMotionValue(0);
  const progress = scrollProgress || fallbackProgress;
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  );

  const isScrollyActive = Boolean(scrollProgress) && isDesktop && !shouldReduceMotion;

  // Move 1 Scrollytelling physics (0 to 0.6 scroll progress)
  // Rocket trajectory scrub
  const rocketY = useTransform(progress, [0, 0.6], [0, -280]);
  const rocketX = useTransform(progress, [0, 0.6], [0, 24]);
  const rocketRotate = useTransform(progress, [0, 0.6], [0, 4.5]);

  // Flame dynamics
  const flameScaleY = useTransform(progress, [0, 0.6], [1, 1.9]);
  const flameGlowScale = useTransform(progress, [0, 0.6], [1, 2.2]);
  const flameGlowOpacity = useTransform(progress, [0, 0.6], [0.65, 1]);

  // Exhaust plume expansion
  const exhaustScale = useTransform(progress, [0, 0.6], [1, 1.45]);
  const exhaustOpacity = useTransform(progress, [0, 0.6], [0.75, 1]);
  const exhaustY = useTransform(progress, [0, 0.6], [0, 30]);

  // Parallax depth drift layers
  const constellationY = useTransform(progress, [0, 0.6], [0, 48]);
  const constellationX = useTransform(progress, [0, 0.6], [0, -16]);
  const dustY = useTransform(progress, [0, 0.6], [0, 80]);
  const dustX = useTransform(progress, [0, 0.6], [0, -28]);
  const starsY = useTransform(progress, [0, 0.6], [0, 32]);
  const orbitY = useTransform(progress, [0, 0.6], [0, 18]);

  return (
    <svg
      className="lp-art"
      role="img"
      aria-label="A white rocket launching diagonally through a starry violet sky above launch clouds, watched by an astronaut developer with a telescope"
      viewBox="0 0 720 900"
      preserveAspectRatio="xMinYMax slice"
    >
      <defs>
        <linearGradient id="lpBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#F1F5F9" />
          <stop offset="1" stopColor="#B8C2D3" />
        </linearGradient>
        <linearGradient id="lpNose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A5B4FC" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="lpFin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6366F1" />
          <stop offset="1" stopColor="#312E81" />
        </linearGradient>
        <radialGradient id="lpGlass" cx="0.35" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#A5F3FC" />
          <stop offset="0.45" stopColor="#22D3EE" />
          <stop offset="0.8" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#1E1B4B" />
        </radialGradient>
        <radialGradient id="lpSkyGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7C3AED" stopOpacity="0.38" />
          <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lpTrail" gradientUnits="userSpaceOnUse" x1="239" y1="552" x2="80" y2="760">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="0.4" stopColor="#DDD6FE" stopOpacity="0.45" />
          <stop offset="1" stopColor="#C4B5FD" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lpVisor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67E8F9" />
          <stop offset="0.5" stopColor="#6366F1" />
          <stop offset="1" stopColor="#1E1B4B" />
        </linearGradient>
        <linearGradient id="lpHill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2E1C6B" />
          <stop offset="1" stopColor="#1A1045" />
        </linearGradient>
        <filter id="lpBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="lpSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        <path
          id="lpStar"
          d="M0,-9 C1.2,-2.4 2.4,-1.2 9,0 C2.4,1.2 1.2,2.4 0,9 C-1.2,2.4 -2.4,1.2 -9,0 C-2.4,-1.2 -1.2,-2.4 0,-9 Z"
        />
      </defs>

      {/* sky glow + orbit with subtle parallax drift */}
      <motion.g style={isScrollyActive ? { y: orbitY } : undefined}>
        <circle cx="470" cy="330" r="300" fill="url(#lpSkyGlow)" />
        <g transform="rotate(-18 470 330)">
          <ellipse
            cx="470"
            cy="330"
            rx="310"
            ry="112"
            fill="none"
            stroke="#C4B5FD"
            strokeOpacity="0.16"
            strokeWidth="1"
            strokeDasharray="2 7"
          />
          <circle r="3.5" fill="#A5B4FC">
            <animateMotion
              dur="16s"
              repeatCount="indefinite"
              path="M160,330 a310,112 0 1,0 620,0 a310,112 0 1,0 -620,0"
            />
          </circle>
          <circle r="9" fill="#A5B4FC" opacity="0.25" filter="url(#lpSoft)">
            <animateMotion
              dur="16s"
              repeatCount="indefinite"
              path="M160,330 a310,112 0 1,0 620,0 a310,112 0 1,0 -620,0"
            />
          </circle>
        </g>
        <ellipse
          cx="470"
          cy="330"
          rx="210"
          ry="70"
          transform="rotate(28 470 330)"
          fill="none"
          stroke="#67E8F9"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
      </motion.g>

      {/* constellation with depth parallax */}
      <motion.g style={isScrollyActive ? { x: constellationX, y: constellationY } : undefined}>
        <g stroke="#C4B5FD" strokeOpacity="0.32" strokeWidth="1" fill="none">
          <path d="M548,74 L604,118 L676,132 L652,196 L604,118" />
          <path d="M86,180 L140,150 L196,196" />
        </g>
        <g fill="#E0E7FF">
          <circle cx="548" cy="74" r="2.2" />
          <circle cx="604" cy="118" r="2.6" />
          <circle cx="676" cy="132" r="2" />
          <circle cx="652" cy="196" r="2.2" />
          <circle cx="86" cy="180" r="2" />
          <circle cx="140" cy="150" r="2.4" />
          <circle cx="196" cy="196" r="1.8" />
        </g>
      </motion.g>

      {/* dust dots with foreground parallax */}
      <motion.g style={isScrollyActive ? { x: dustX, y: dustY } : undefined} fill="#FFFFFF">
        <circle cx="40" cy="60" r="1.2" opacity="0.6" />
        <circle cx="260" cy="40" r="1" opacity="0.5" />
        <circle cx="420" cy="30" r="1.3" opacity="0.7" />
        <circle cx="700" cy="60" r="1" opacity="0.5" />
        <circle cx="30" cy="420" r="1.1" opacity="0.5" />
        <circle cx="190" cy="300" r="1" opacity="0.6" />
        <circle cx="700" cy="330" r="1.3" opacity="0.6" />
        <circle cx="660" cy="520" r="1" opacity="0.5" />
        <circle cx="350" cy="140" r="1" opacity="0.5" />
        <circle cx="520" cy="560" r="1.2" opacity="0.4" />
        <circle cx="300" cy="470" r="1" opacity="0.5" />
        <circle cx="100" cy="600" r="1.1" opacity="0.4" />
      </motion.g>

      {/* twinkling 4-point stars with subtle parallax */}
      <motion.g style={isScrollyActive ? { y: starsY } : undefined}>
        <g fill="#FFFFFF">
          <g transform="translate(96 96) scale(1.1)">
            <g className="lp-tw" style={{ animationDelay: '0s' }}>
              <use href="#lpStar" />
            </g>
          </g>
          <g transform="translate(330 64) scale(0.7)">
            <g className="lp-tw" style={{ animationDelay: '1.1s' }}>
              <use href="#lpStar" />
            </g>
          </g>
          <g transform="translate(626 250) scale(1.3)">
            <g className="lp-tw" style={{ animationDelay: '0.5s' }}>
              <use href="#lpStar" />
            </g>
          </g>
          <g transform="translate(118 330) scale(0.8)">
            <g className="lp-tw" style={{ animationDelay: '2s' }}>
              <use href="#lpStar" />
            </g>
          </g>
          <g transform="translate(690 440) scale(0.9)">
            <g className="lp-tw" style={{ animationDelay: '1.6s' }}>
              <use href="#lpStar" />
            </g>
          </g>
          <g transform="translate(560 478) scale(0.6)">
            <g className="lp-tw" style={{ animationDelay: '2.6s' }}>
              <use href="#lpStar" />
            </g>
          </g>
          <g transform="translate(250 420) scale(0.75)">
            <g className="lp-tw" style={{ animationDelay: '0.8s' }}>
              <use href="#lpStar" />
            </g>
          </g>
          <g transform="translate(470 120) scale(0.55)">
            <g className="lp-tw" style={{ animationDelay: '3s' }}>
              <use href="#lpStar" />
            </g>
          </g>
        </g>
        <g fill="#C4B5FD">
          <g transform="translate(215 225) scale(0.6)">
            <g className="lp-tw" style={{ animationDelay: '1.4s' }}>
              <use href="#lpStar" />
            </g>
          </g>
          <g transform="translate(640 620) scale(0.7)">
            <g className="lp-tw" style={{ animationDelay: '0.3s' }}>
              <use href="#lpStar" />
            </g>
          </g>
          <g transform="translate(60 520) scale(0.65)">
            <g className="lp-tw" style={{ animationDelay: '2.3s' }}>
              <use href="#lpStar" />
            </g>
          </g>
        </g>

        {/* cross sparkles */}
        <g stroke="#A5F3FC" strokeWidth="1.5" strokeLinecap="round">
          <g transform="translate(166 260)">
            <g className="lp-tw" style={{ animationDelay: '0.6s' }}>
              <path d="M0,-6 L0,6 M-6,0 L6,0" />
            </g>
          </g>
          <g transform="translate(560 168)">
            <g className="lp-tw" style={{ animationDelay: '1.9s' }}>
              <path d="M0,-5 L0,5 M-5,0 L5,0" />
            </g>
          </g>
          <g transform="translate(658 360)">
            <g className="lp-tw" style={{ animationDelay: '2.8s' }}>
              <path d="M0,-6 L0,6 M-6,0 L6,0" />
            </g>
          </g>
          <g transform="translate(380 530)">
            <g className="lp-tw" style={{ animationDelay: '1.2s' }}>
              <path d="M0,-4 L0,4 M-4,0 L4,0" />
            </g>
          </g>
        </g>
      </motion.g>

      {/* trajectory */}
      <path
        className="lp-traj"
        d="M70,820 C150,700 220,600 300,500 S500,230 640,70"
        fill="none"
        stroke="#C4B5FD"
        strokeOpacity="0.28"
        strokeWidth="1.2"
        strokeDasharray="3 9"
      />

      {/* dynamically expanding exhaust plume with Gaussian blur filter */}
      <motion.g
        style={
          isScrollyActive
            ? {
                scale: exhaustScale,
                opacity: exhaustOpacity,
                y: exhaustY,
                transformOrigin: '230px 550px',
              }
            : undefined
        }
      >
        <path
          d="M226,540 L252,564 Q176,690 150,800 L20,690 Q140,640 226,540 Z"
          fill="url(#lpTrail)"
          filter="url(#lpBlur)"
        />
        <path
          d="M232,548 L246,560 Q190,660 160,740 L90,690 Q170,630 232,548 Z"
          fill="url(#lpTrail)"
          opacity="0.8"
        />
      </motion.g>

      {/* ROCKET (Ascends dynamically along diagonal flight vector) */}
      <g transform="translate(452 318) rotate(42) scale(0.94)">
        <motion.g
          style={
            isScrollyActive
              ? {
                  x: rocketX,
                  y: rocketY,
                  rotate: rocketRotate,
                  transformOrigin: '0px 0px',
                }
              : undefined
          }
        >
          <g className="lp-float">
            {/* flame glow expands dynamically */}
            <motion.g
              className="lp-glow"
              style={
                isScrollyActive
                  ? {
                      scale: flameGlowScale,
                      opacity: flameGlowOpacity,
                      transformOrigin: '0px 146px',
                    }
                  : undefined
              }
            >
              <path
                className="lp-flame-slow"
                d="M-36,146 C-44,214 -16,270 0,330 C16,270 44,214 36,146 Z"
                fill="#8B5CF6"
                filter="url(#lpBlur)"
              />
            </motion.g>

            {/* flame layers expand and brighten dynamically */}
            <motion.g
              style={
                isScrollyActive
                  ? {
                      scaleY: flameScaleY,
                      transformOrigin: '0px 146px',
                    }
                  : undefined
              }
            >
              <path
                className="lp-flame-slow"
                d="M-30,146 C-36,202 -14,252 0,306 C14,252 36,202 30,146 Z"
                fill="#8B5CF6"
                opacity="0.92"
              />
              <path
                className="lp-flame"
                d="M-23,146 C-26,192 -10,230 0,268 C10,230 26,192 23,146 Z"
                fill="#FB7185"
              />
              <path
                className="lp-flame"
                d="M-14,146 C-15,176 -6,202 0,226 C6,202 15,176 14,146 Z"
                fill="#FDE68A"
                style={{ animationDelay: '.08s' }}
              />
              <path
                d="M-6,146 C-6,162 -2,174 0,186 C2,174 6,162 6,146 Z"
                fill="#FFFFFF"
                opacity="0.9"
              />
            </motion.g>

            {/* fins */}
            <path
              d="M-50,34 C-80,56 -98,98 -100,146 C-88,130 -70,120 -50,116 Z"
              fill="url(#lpFin)"
            />
            <path
              d="M50,34 C80,56 98,98 100,146 C88,130 70,120 50,116 Z"
              fill="url(#lpFin)"
            />
            <path
              d="M-50,34 C-80,56 -98,98 -100,146"
              fill="none"
              stroke="#A5B4FC"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />

            {/* nozzle */}
            <path d="M-30,124 L30,124 L24,148 L-24,148 Z" fill="#475569" />
            <path d="M-24,148 L24,148" stroke="#1E293B" strokeWidth="3" />

            {/* fuselage */}
            <path
              d="M0,-172 C42,-132 54,-60 54,18 L54,108 C54,120 46,126 36,126 L-36,126 C-46,126 -54,120 -54,108 L-54,18 C-54,-60 -42,-132 0,-172 Z"
              fill="url(#lpBody)"
            />
            <path
              d="M22,-150 C42,-112 50,-50 50,18 L50,108 C50,118 44,124 36,124 L24,124 C34,90 36,-40 22,-150 Z"
              fill="#94A3B8"
              opacity="0.28"
            />
            {/* nose cone */}
            <path
              d="M0,-172 C22,-152 35,-124 42,-94 L-42,-94 C-35,-124 -22,-152 0,-172 Z"
              fill="url(#lpNose)"
            />
            <path d="M-42,-94 L42,-94" stroke="#E0E7FF" strokeWidth="2" />
            {/* cockpit */}
            <circle cx="0" cy="-38" r="27" fill="#E0E7FF" />
            <circle cx="0" cy="-38" r="21" fill="url(#lpGlass)" />
            <path
              d="M-12,-48 A15,15 0 0 1 4,-55"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx="0" cy="-38" r="27" fill="none" stroke="#6366F1" strokeWidth="1.5" />
            {/* accent bands */}
            <rect x="-54" y="36" width="108" height="9" fill="#22D3EE" />
            <rect x="-54" y="48" width="108" height="3" fill="#6366F1" />
            <path d="M-54,96 L54,96" stroke="#CBD5E1" strokeWidth="1.5" />
            <g fill="#94A3B8">
              <circle cx="-38" cy="72" r="1.6" />
              <circle cx="-24" cy="72" r="1.6" />
              <circle cx="24" cy="72" r="1.6" />
              <circle cx="38" cy="72" r="1.6" />
            </g>
            {/* centre fin */}
            <path d="M-5,64 L5,64 L5,150 C5,154 -5,154 -5,150 Z" fill="#4338CA" />
            {/* rim light */}
            <path
              d="M-6,-164 C-34,-126 -48,-60 -48,18"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
            />
          </g>
        </motion.g>
      </g>

      {/* ground hill (right) */}
      <path d="M360,900 C400,812 520,770 720,782 L720,900 Z" fill="url(#lpHill)" />
      <path
        d="M392,846 C440,800 540,774 720,782"
        fill="none"
        stroke="#A78BFA"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      {/* ASTRONAUT DEVELOPER + TELESCOPE */}
      <g transform="translate(596 784) scale(1.12)">
        {/* telescope */}
        <g stroke="#64748B" strokeWidth="3" strokeLinecap="round">
          <path d="M-62,-62 L-82,0" />
          <path d="M-62,-62 L-44,0" />
          <path d="M-62,-62 L-64,0" />
        </g>
        <g transform="translate(-62 -68) rotate(36)">
          <rect x="-84" y="-8" width="92" height="16" rx="5" fill="#E2E8F0" />
          <rect x="-84" y="-8" width="92" height="5" rx="2.5" fill="#FFFFFF" opacity="0.8" />
          <rect x="-98" y="-11" width="18" height="22" rx="4" fill="#6366F1" />
          <rect x="-30" y="-9" width="6" height="18" fill="#22D3EE" />
          <rect x="8" y="-4" width="12" height="8" rx="2" fill="#475569" />
        </g>
        <circle cx="-62" cy="-66" r="5" fill="#475569" />
        {/* backpack */}
        <rect x="4" y="-108" width="18" height="52" rx="7" fill="#CBD5E1" />
        <rect x="8" y="-100" width="10" height="4" rx="2" fill="#22D3EE" />
        {/* legs */}
        <rect x="-18" y="-52" width="14" height="46" rx="6" fill="#E2E8F0" />
        <rect x="2" y="-52" width="14" height="46" rx="6" fill="#F8FAFC" />
        <rect x="-21" y="-10" width="19" height="11" rx="4" fill="#4338CA" />
        <rect x="0" y="-10" width="19" height="11" rx="4" fill="#4338CA" />
        {/* torso */}
        <rect x="-24" y="-112" width="44" height="66" rx="16" fill="#F8FAFC" />
        <path d="M-24,-70 L20,-70" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="-14" y="-96" width="22" height="16" rx="4" fill="#312E81" />
        <circle cx="-8" cy="-88" r="2.2" fill="#22D3EE" />
        <circle cx="0" cy="-88" r="2.2" fill="#FB7185" />
        {/* arm to telescope */}
        <path
          d="M-18,-98 C-32,-90 -40,-80 -46,-72"
          fill="none"
          stroke="#F8FAFC"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <circle cx="-47" cy="-71" r="6.5" fill="#4338CA" />
        {/* helmet */}
        <circle cx="-2" cy="-136" r="27" fill="#F8FAFC" />
        <circle cx="-2" cy="-136" r="27" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
        <ellipse
          cx="-11"
          cy="-142"
          rx="17"
          ry="13"
          transform="rotate(-32 -11 -142)"
          fill="url(#lpVisor)"
        />
        <path
          d="M-22,-148 C-19,-154 -13,-157 -7,-156"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path d="M14,-160 L20,-172" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20.5" cy="-174" r="3" fill="#FB7185" />
      </g>

      {/* launch clouds */}
      <g className="lp-drift-b">
        <g fill="#C4B5FD" opacity="0.5">
          <circle cx="40" cy="760" r="86" />
          <circle cx="150" cy="742" r="72" />
          <circle cx="250" cy="790" r="74" />
          <circle cx="350" cy="836" r="66" />
        </g>
      </g>
      <g className="lp-drift">
        <g fill="#DDD6FE">
          <circle cx="-10" cy="830" r="96" />
          <circle cx="104" cy="806" r="78" />
          <circle cx="196" cy="842" r="72" />
          <circle cx="300" cy="872" r="66" />
          <circle cx="402" cy="900" r="56" />
        </g>
      </g>
      <g fill="#EDE9FE">
        <rect x="0" y="880" width="400" height="20" fill="#EDE9FE" />
        <circle cx="40" cy="890" r="84" />
        <circle cx="160" cy="900" r="74" />
        <circle cx="266" cy="920" r="64" />
        <circle cx="350" cy="934" r="50" />
        <circle cx="120" cy="860" r="40" fill="#F5F3FF" />
      </g>
    </svg>
  );
}