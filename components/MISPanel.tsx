const MIS = [
  {
    label: 'Total samples analysed',
    value: '842',
    sub: '▲ 6% vs Mar (794)',
    up: true,
  },
  { label: 'OOS rate', value: '2.8%', sub: '▼ 0.4% vs Mar (3.2%)', up: true },
  {
    label: 'Approval avg turnaround',
    value: '1.4 d',
    sub: '▲ 0.2d vs Mar',
    up: false,
  },
  {
    label: 'Customer complaints open',
    value: '2',
    sub: '▼ 1 vs Mar (3)',
    up: true,
  },
  {
    label: 'Counter samples dispatched',
    value: '18',
    sub: '▼ 3 vs Mar (21)',
    up: true,
  },
  {
    label: 'Reports generated',
    value: '274',
    sub: '▲ 14 vs Mar (260)',
    up: true,
  },
  {
    label: 'Lots produced (Month)',
    value: '38',
    sub: '5 lines · Apr 2026',
    up: true,
  },
  {
    label: 'Approval samples dispatched',
    value: '24',
    sub: 'Month to date',
    up: true,
  },
  {
    label: 'Special grade lots',
    value: '12',
    sub: 'KLAREX/JETEX/ELECTRA',
    up: false,
  },
];

export default function MISPanel() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
        gap: 8,
      }}
    >
      {MIS.map((m) => (
        <div
          key={m.label}
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '12px 14px',
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: 'var(--txt3)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: 6,
            }}
          >
            {m.label}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: 'var(--txt)',
              fontFamily: 'monospace',
            }}
          >
            {m.value}
          </div>
          <div
            style={{
              fontSize: 10,
              marginTop: 4,
              color: m.up ? 'var(--green)' : 'var(--red)',
            }}
          >
            {m.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
