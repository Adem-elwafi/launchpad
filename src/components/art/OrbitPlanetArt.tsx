import React from 'react'

export interface OrbitPlanetArtProps {
  className?: string
  style?: React.CSSProperties
}

/**
 * OrbitPlanetArt component
 * Handcrafted cosmic SVG illustration for the Final CTA section:
 * - Ringed planet with atmospheric gradients and multi-layered rings
 * - Returning miniature metallic white rocket traversing an elliptical orbital trajectory
 * - 4-point twinkling stars, dust particles, and cosmic glow
 */
export const OrbitPlanetArt: React.FC<OrbitPlanetArtProps> = ({
  className = '',
  style = {},
}) => {
  return (
    <svg
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="A glowing ringed planet with a returning metallic white rocket in an elliptical orbit among stars"
      viewBox="0 0 540 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        {/* Planet sphere surface gradient */}
        <radialGradient id="planetBody" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="45%" stopColor="#3B1E78" />
          <stop offset="85%" stopColor="#1E124A" />
          <stop offset="100%" stopColor="#0F0C20" />
        </radialGradient>

        {/* Planet atmospheric rim glow */}
        <radialGradient id="planetGlow" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#22D3EE" stopOpacity="0" />
          <stop offset="95%" stopColor="#22D3EE" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
        </radialGradient>

        {/* Rings gradient */}
        <linearGradient id="planetRings" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
          <stop offset="35%" stopColor="#C4B5FD" stopOpacity="0.65" />
          <stop offset="65%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.7" />
        </linearGradient>

        {/* Rocket metallic gradient */}
        <linearGradient id="miniRocketBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Star path */}
        <path
          id="ctaStar"
          d="M0,-6 C0.8,-1.6 1.6,-0.8 6,0 C1.6,0.8 0.8,1.6 0,6 C-0.8,1.6 -1.6,0.8 -6,0 C-1.6,-0.8 -0.8,-1.6 0,-6 Z"
        />
      </defs>

      {/* Background ambient stars */}
      <g fill="#FFFFFF" opacity="0.7">
        <circle cx="60" cy="50" r="1.5" />
        <circle cx="120" cy="90" r="1" />
        <circle cx="460" cy="60" r="1.5" />
        <circle cx="480" cy="180" r="1.2" />
        <circle cx="80" cy="310" r="1.2" />
        <circle cx="440" cy="320" r="1" />
        <circle cx="270" cy="40" r="1.5" />
      </g>

      {/* Twinkling 4-point stars */}
      <g fill="#C4B5FD" className="lp-tw">
        <use href="#ctaStar" x="90" y="70" />
        <use href="#ctaStar" x="450" y="80" transform="scale(0.8) translate(100 10)" />
        <use href="#ctaStar" x="110" y="270" transform="scale(0.7) translate(40 100)" />
        <use href="#ctaStar" x="420" y="290" transform="scale(0.85) translate(60 40)" />
      </g>

      {/* Back half of orbital ellipse trail */}
      <ellipse
        cx="270"
        cy="190"
        rx="220"
        ry="85"
        transform="rotate(-15 270 190)"
        fill="none"
        stroke="#A78BFA"
        strokeOpacity="0.25"
        strokeWidth="1.2"
        strokeDasharray="4 8"
      />

      {/* Back half of planet rings */}
      <g transform="rotate(-22 270 190)">
        <ellipse
          cx="270"
          cy="190"
          rx="170"
          ry="38"
          fill="none"
          stroke="url(#planetRings)"
          strokeWidth="12"
          opacity="0.35"
        />
        <ellipse
          cx="270"
          cy="190"
          rx="185"
          ry="44"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
      </g>

      {/* Planet sphere */}
      <circle cx="270" cy="190" r="85" fill="url(#planetBody)" />
      <circle cx="270" cy="190" r="86" fill="url(#planetGlow)" />

      {/* Surface atmospheric bands */}
      <g opacity="0.35" stroke="#A78BFA" strokeWidth="2" fill="none">
        <path d="M190 170 Q270 200 350 170" />
        <path d="M187 195 Q270 225 353 195" strokeWidth="3" stroke="#67E8F9" />
        <path d="M195 215 Q270 242 345 215" strokeWidth="1.5" />
      </g>

      {/* Front half of planet rings (casts shadow and crosses over sphere) */}
      <g transform="rotate(-22 270 190)" clipPath="url(#ringFrontClip)">
        <ellipse
          cx="270"
          cy="190"
          rx="170"
          ry="38"
          fill="none"
          stroke="url(#planetRings)"
          strokeWidth="14"
          opacity="0.85"
        />
        <ellipse
          cx="270"
          cy="190"
          rx="185"
          ry="44"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
        <ellipse
          cx="270"
          cy="190"
          rx="150"
          ry="32"
          fill="none"
          stroke="#C4B5FD"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
      </g>

      {/* RETURNING ROCKET IN ORBIT (Tilted along orbital arc) */}
      <g transform="translate(390 130) rotate(-48) scale(0.65)">
        {/* Engine glow & flame */}
        <path
          d="M-8 32 C-10 44 -4 54 0 62 C4 54 10 44 8 32 Z"
          fill="#FB7185"
          className="lp-flame"
        />
        <path
          d="M-4 32 C-5 40 -2 46 0 50 C2 46 5 40 4 32 Z"
          fill="#FDE68A"
          className="lp-flame-slow"
        />

        {/* Fins */}
        <path d="M-12 12 C-20 18 -24 28 -24 38 C-20 34 -15 32 -10 30 Z" fill="#4338CA" />
        <path d="M12 12 C20 18 24 28 24 38 C20 34 15 32 10 30 Z" fill="#4338CA" />

        {/* Fuselage */}
        <path
          d="M0 -34 C12 -26 14 -12 14 4 L14 26 C14 29 11 31 8 31 L-8 31 C-11 31 -14 29 -14 26 L-14 4 C-14 -12 -12 -26 0 -34 Z"
          fill="url(#miniRocketBody)"
        />

        {/* Nose cone */}
        <path d="M0 -34 C6 -30 10 -24 12 -18 L-12 -18 C-10 -24 -6 -30 0 -34 Z" fill="#6366F1" />

        {/* Cyan accent band */}
        <rect x="-14" y="6" width="28" height="3" fill="#22D3EE" />

        {/* Cockpit */}
        <circle cx="0" cy="-8" r="6" fill="#0F172A" />
        <circle cx="0" cy="-8" r="4.5" fill="#22D3EE" />
      </g>
    </svg>
  )
}

export default OrbitPlanetArt
