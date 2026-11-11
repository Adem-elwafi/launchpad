import React from 'react';

/**
 * SocialProof component
 * 1:1 Pixel-perfect implementation from Claude Design reference prototype:
 * - Customer logo strip with exact border-top #EEF0F5, background #FAFAFC, padding 36px 24px 44px
 * - Heading: "TRUSTED BY HIGH-GROWTH ENGINEERING TEAMS" (font-size: 12px, font-weight: 700, letter-spacing: 0.12em, uppercase, #64748B)
 * - Wordmarks: Vercel, Supabase, Linear, Raycast, Resend (.lp-logo-word with hover color: #0F172A)
 */
export default function SocialProof() {
  const logos = ['Vercel', 'Supabase', 'Linear', 'Raycast', 'Resend'];

  return (
    <section
      aria-label="Customers"
      style={{
        borderTop: '1px solid #EEF0F5',
        background: '#FAFAFC',
        padding: '36px 24px 44px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '22px',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#64748B',
          }}
        >
          Trusted by high-growth engineering teams
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '18px 56px',
            fontSize: '22px',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#64748B',
          }}
        >
          {logos.map((logo) => (
            <span key={logo} className="lp-logo-word">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
