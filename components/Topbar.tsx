'use client';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      const d = now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      const t = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(`${d}  ·  ${t}`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Topbar() {
  const { theme, toggle } = useTheme();
  const time = useClock();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: 'var(--bg1)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 6,
            overflow: 'hidden',
            background: '#000',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="38"
            height="40"
            viewBox="0 0 76 82"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="18"
              cy="22"
              rx="20"
              ry="9"
              fill="#f5c518"
              transform="rotate(-40,18,22)"
            />
            <ellipse
              cx="13"
              cy="38"
              rx="19"
              ry="8"
              fill="#F2A623"
              transform="rotate(-8,13,38)"
            />
            <ellipse
              cx="17"
              cy="53"
              rx="20"
              ry="8"
              fill="#E85D24"
              transform="rotate(22,17,53)"
            />
            <ellipse
              cx="21"
              cy="39"
              rx="15"
              ry="6"
              fill="#9B4F96"
              transform="rotate(-3,21,39)"
            />
            <ellipse
              cx="58"
              cy="22"
              rx="20"
              ry="9"
              fill="#E85D24"
              transform="rotate(40,58,22)"
            />
            <ellipse
              cx="63"
              cy="38"
              rx="19"
              ry="8"
              fill="#F2A623"
              transform="rotate(8,63,38)"
            />
            <ellipse
              cx="59"
              cy="53"
              rx="20"
              ry="8"
              fill="#f5c518"
              transform="rotate(-22,59,53)"
            />
            <ellipse
              cx="55"
              cy="39"
              rx="15"
              ry="6"
              fill="#9B4F96"
              transform="rotate(3,55,39)"
            />
            <circle cx="38" cy="38" r="2.5" fill="#fff" opacity=".7" />
            <text
              x="38"
              y="76"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#3949AB"
              fontFamily="sans-serif"
              letterSpacing="1"
            >
              Himadri
            </text>
          </svg>
        </div>
        <div>
          <div
            style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent2)' }}
          >
            Himadri Speciality Chemicals Ltd.
          </div>
          <div style={{ fontSize: 10, color: 'var(--txt3)', marginTop: 1 }}>
            Carbon Black Division &nbsp;·&nbsp; Quality Control Laboratory
            &nbsp;·&nbsp; Mahistikry
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--green)',
            display: 'inline-block',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontSize: 11,
            color: 'var(--txt3)',
            fontFamily: 'monospace',
          }}
        >
          {time}
        </span>
        <span
          style={{
            fontSize: 10,
            padding: '3px 9px',
            borderRadius: 20,
            fontWeight: 500,
            background: 'var(--green-bg)',
            color: 'var(--green)',
          }}
        >
          5 Lines Running
        </span>
        <button
          onClick={toggle}
          style={{
            fontSize: 11,
            padding: '4px 10px',
            borderRadius: 6,
            border: '1px solid var(--border2)',
            background: 'var(--bg2)',
            color: 'var(--txt2)',
            cursor: 'pointer',
          }}
        >
          {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
}
