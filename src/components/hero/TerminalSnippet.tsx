import React, { useState, useRef, useEffect } from 'react';

/**
 * TerminalSnippet component
 * 1:1 Pixel-perfect implementation from Claude Design prototype:
 * - .lp-term container with exact shadows & border
 * - Top tab with terminal icon + 'terminal' label & '~/my-app · zsh'
 * - '$ npx launchpad deploy' with #34D399 and #C4B5FD highlights
 * - .lp-copy button with copy feedback
 */
export default function TerminalSnippet({ variant = 'desktop', className = '', style = {} }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('npx launchpad deploy').catch(() => {});
      }
    } catch {
      // clipboard fallback
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1800);
  };

  if (variant === 'mobile') {
    return (
      <div
        className={`lp-term ${className}`}
        style={{
          borderRadius: '14px',
          background: '#0F172A',
          boxShadow: '0 20px 40px -24px rgba(15,23,42,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '8px 8px 8px 16px',
          ...style,
        }}
      >
        <code
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: '14px',
            color: '#E2E8F0',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: '#34D399' }}>$</span> npx{' '}
          <span style={{ color: '#C4B5FD' }}>launchpad</span> deploy
        </code>
        <button
          type="button"
          className="lp-copy"
          onClick={handleCopy}
          aria-label={copied ? 'Command copied' : 'Copy install command'}
          style={{
            flexShrink: 0,
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.05)',
            color: '#CBD5E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          {copied ? (
            <svg
              aria-hidden="true"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#34D399"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="8" y="8" width="14" height="14" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
      </div>
    );
  }

  if (variant === 'tablet') {
    return (
      <div
        className={`lp-term ${className}`}
        style={{
          borderRadius: '14px',
          background: '#0F172A',
          boxShadow: '0 20px 40px -24px rgba(15,23,42,0.6)',
          overflow: 'hidden',
          ...style,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            background: '#111A2E',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 14px',
              background: '#0F172A',
              borderRight: '1px solid rgba(255,255,255,0.07)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#CBD5E1',
            }}
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A78BFA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4 17 6-6-6-6" />
              <path d="M12 19h8" />
            </svg>
            <span>terminal</span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '11px',
              color: '#94A3B8',
            }}
          >
            zsh
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            padding: '12px 10px 12px 16px',
          }}
        >
          <code
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '14px',
              color: '#E2E8F0',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: '#34D399' }}>$</span> npx{' '}
            <span style={{ color: '#C4B5FD' }}>launchpad</span> deploy
          </code>
          <button
            type="button"
            className="lp-copy"
            onClick={handleCopy}
            aria-label={copied ? 'Command copied' : 'Copy install command'}
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '44px',
              minWidth: '44px',
              padding: '0 10px',
              borderRadius: '9px',
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.05)',
              color: '#CBD5E1',
              fontFamily: 'inherit',
              fontSize: '12.5px',
              fontWeight: 600,
            }}
          >
            {copied ? (
              <svg
                aria-hidden="true"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#34D399"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="8" y="8" width="14" height="14" rx="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="lp-term"
      style={{
        marginTop: '34px',
        maxWidth: '520px',
        borderRadius: '14px',
        background: '#0F172A',
        boxShadow: '0 20px 40px -24px rgba(15,23,42,0.6), 0 0 0 1px rgba(15,23,42,0.9)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px 0 0',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: '#111A2E',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 14px',
            borderRight: '1px solid rgba(255,255,255,0.07)',
            background: '#0F172A',
            fontSize: '12px',
            fontWeight: 600,
            color: '#CBD5E1',
          }}
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m4 17 6-6-6-6" />
            <path d="M12 19h8" />
          </svg>
          <span>terminal</span>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: '11px',
            color: '#94A3B8',
          }}
        >
          ~/my-app · zsh
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '14px 12px 14px 18px',
        }}
      >
        <code
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: '15px',
            color: '#E2E8F0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <span style={{ color: '#34D399' }}>$</span> npx{' '}
          <span style={{ color: '#C4B5FD' }}>launchpad</span> deploy
        </code>

        <button
          type="button"
          className="lp-copy"
          onClick={handleCopy}
          aria-label="Copy install command"
          style={{
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            height: '36px',
            padding: '0 12px',
            borderRadius: '9px',
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.05)',
            color: '#CBD5E1',
            fontFamily: 'inherit',
            fontSize: '12.5px',
            fontWeight: 600,
          }}
        >
          {copied ? (
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#34D399"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="8" y="8" width="14" height="14" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}
