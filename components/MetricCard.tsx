interface Props {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  subVariant?: 'up' | 'down' | 'neutral';
}

export default function MetricCard({
  icon,
  label,
  value,
  sub,
  subVariant = 'neutral',
}: Props) {
  const subColor =
    subVariant === 'up'
      ? 'var(--green)'
      : subVariant === 'down'
      ? 'var(--red)'
      : 'var(--txt3)';
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '12px 14px',
      }}
    >
      <div style={{ fontSize: 16, marginBottom: 6 }}>{icon}</div>
      <div
        style={{
          fontSize: 10,
          color: 'var(--txt3)',
          marginBottom: 4,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: 'var(--txt)',
          fontFamily: 'monospace',
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 10, marginTop: 4, color: subColor }}>{sub}</div>
      )}
    </div>
  );
}
