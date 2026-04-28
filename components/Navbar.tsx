'use client';

const TABS = [
  { id: 'overview', label: 'Overview', icon: '⊞' },
  { id: 'online', label: 'Online Status', icon: '📡' },
  { id: 'special', label: 'Special Params', icon: '⚗' },
  { id: 'approval', label: 'Approval Sample', icon: '✅' },
  { id: 'complaint', label: 'Customer Complaint', icon: '📋' },
  { id: 'counter', label: 'Counter Sample', icon: '🧪' },
  { id: 'analysis', label: 'Analysis Area', icon: '🔬' },
  { id: 'solution', label: 'Solution Prep', icon: '🧴' },
  { id: 'report', label: 'Report Generator', icon: '📄' },
  { id: 'study', label: 'Study Zone', icon: '📚' },
  { id: 'mis', label: 'MIS', icon: '📊' },
  { id: 'team', label: 'Team', icon: '👥' },
];

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function Navbar({ active, onChange }: Props) {
  return (
    <nav
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        padding: '6px 12px',
        background: 'var(--bg1)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 11,
            padding: '5px 10px',
            borderRadius: 6,
            color: active === t.id ? 'var(--txt)' : 'var(--txt2)',
            background: active === t.id ? 'var(--bg3)' : 'none',
            border:
              active === t.id
                ? '1px solid var(--border2)'
                : '1px solid transparent',
            fontWeight: active === t.id ? 500 : 400,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: 12 }}>{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}
