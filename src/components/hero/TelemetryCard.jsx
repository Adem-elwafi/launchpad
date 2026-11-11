import React from 'react';

/**
 * TelemetryCard component
 * 1:1 Pixel-perfect docked telemetry glass card from Claude Design prototype:
 * - .lp-card class with exact positioning and transitions
 * - .lp-live pulsing emerald indicator
 * - Commit hash and Build #1402 status indicators
 * - Edge latency p50 (42ms) with exact 132x34 sparkline polyline
 * - Accessible landmarks (role="region", aria-label="Live Deployment Telemetry")
 */
export default function TelemetryCard() {
  return (
    <div
      className="lp-card"
      role="region"
      aria-label="Live Deployment Telemetry"
      style={{
        padding: '18px',
        borderRadius: '18px',
        background: 'rgba(255, 255, 255, 0.74)',
        backdropFilter: 'blur(18px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
        border: '1px solid rgba(255, 255, 255, 0.75)',
        boxShadow:
          '0 24px 50px -20px rgba(15, 12, 32, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.4) inset',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#334155',
          }}
        >
          <span
            className="lp-live"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '999px',
              background: '#10B981',
            }}
          />
          Live deployment
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: '11px',
            color: '#475569',
          }}
        >
          prod · iad1
        </span>
      </div>

      <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              flexShrink: 0,
              width: '30px',
              height: '30px',
              borderRadius: '9px',
              background: '#EEF2FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M3 12h6" />
              <path d="M15 12h6" />
            </svg>
          </span>
          <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.35 }}>
            commit{' '}
            <code
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: '12px',
                color: '#4338CA',
                background: '#EEF2FF',
                padding: '1px 5px',
                borderRadius: '5px',
              }}
            >
              8f3a9e
            </code>{' '}
            pushed to{' '}
            <strong style={{ fontWeight: 700, color: '#0F172A' }}>main</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              flexShrink: 0,
              width: '30px',
              height: '30px',
              borderRadius: '9px',
              background: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#047857"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.35 }}>
            <strong style={{ fontWeight: 700, color: '#0F172A' }}>Build #1402</strong>: Succeeded
            in 1.2s
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: '14px',
          padding: '12px',
          borderRadius: '12px',
          background: 'rgba(15, 12, 32, 0.04)',
          border: '1px solid rgba(15, 23, 42, 0.06)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>
            Edge latency · p50
            <span style={{ display: 'none' }}>Global Edge Latency</span>
          </div>
          <div
            style={{
              marginTop: '2px',
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#0F172A',
            }}
          >
            42
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginLeft: '2px' }}>
              ms
            </span>
          </div>
        </div>

        <svg aria-hidden="true" width="132" height="34" viewBox="0 0 132 34" fill="none">
          <defs>
            <linearGradient id="lpSpark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.32" />
              <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,26 L12,22 L24,24 L36,15 L48,19 L60,11 L72,16 L84,10 L96,13 L108,7 L120,11 L132,6 L132,34 L0,34 Z"
            fill="url(#lpSpark)"
          />
          <polyline
            points="0,26 12,22 24,24 36,15 48,19 60,11 72,16 84,10 96,13 108,7 120,11 132,6"
            stroke="#7C3AED"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="132" cy="6" r="2.5" fill="#7C3AED" />
        </svg>
      </div>
    </div>
  );
}
