import Badge from './Badge';

const SOLUTIONS = [
  {
    name: 'Iodine Solution',
    strength: '0.1012 N',
    updated: '08:00',
    status: 'valid',
  },
  {
    name: 'Iodine Blank',
    strength: '0.42 mL',
    updated: 'Today',
    status: 'valid',
  },
  {
    name: 'Thiosulphate (Thio)',
    strength: '0.0998 N',
    updated: '08:00',
    status: 'valid',
  },
  { name: 'CTAB Solution', strength: '—', updated: 'Today', status: 'valid' },
  { name: 'DBP Absorbate', strength: '—', updated: '—', status: 'prepare' },
  {
    name: 'Blank Iodine Titr.',
    strength: '0.00 mL',
    updated: 'Done',
    status: 'valid',
  },
];

export default function SolutionPanel() {
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {SOLUTIONS.map((s, i) => (
        <div
          key={s.name}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            borderBottom:
              i < SOLUTIONS.length - 1 ? '1px solid var(--border)' : 'none',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: 'var(--txt)' }}>{s.name}</div>
            <div
              style={{
                fontSize: 9,
                color: 'var(--txt3)',
                marginTop: 1,
                fontFamily: 'monospace',
              }}
            >
              {s.strength} · {s.updated}
            </div>
          </div>
          <Badge variant={s.status === 'valid' ? 'green' : 'amber'}>
            {s.status === 'valid' ? 'Valid' : 'Prepare today'}
          </Badge>
        </div>
      ))}
    </div>
  );
}
