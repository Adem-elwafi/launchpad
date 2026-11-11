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
    <>
      {/* Desktop Social Proof (>= 1025px) */}
      <section
        aria-label="Customers"
        className="lp-desktop-only"
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
            gap: '20px',
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

      {/* Tablet Social Proof (768px - 1024px) */}
      <section
        aria-label="Customers"
        className="lp-tablet-only"
        style={{
          borderTop: '1px solid #EEF0F5',
          background: '#FAFAFC',
          padding: '36px 32px 44px',
        }}
      >
        <p
          style={{
            margin: 0,
            textAlign: 'center',
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
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px 44px',
            fontSize: '21px',
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
      </section>

      {/* Mobile Social Proof (< 768px) */}
      <section
        aria-label="Customers"
        className="lp-mobile-only"
        style={{
          borderTop: '1px solid #EEF0F5',
          background: '#FAFAFC',
          padding: '32px 20px 44px',
        }}
      >
        <p
          style={{
            margin: 0,
            textAlign: 'center',
            fontSize: '11.5px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#64748B',
          }}
        >
          Trusted by high-growth teams
        </p>
        <div
          style={{
            marginTop: '18px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '16px 12px',
            textAlign: 'center',
            fontSize: '19px',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#64748B',
          }}
        >
          <span>Vercel</span>
          <span>Supabase</span>
          <span>Linear</span>
          <span>Raycast</span>
          <span style={{ gridColumn: '1 / -1' }}>Resend</span>
        </div>
      </section>
    </>
  );
}
