type Variant = 'green' | 'amber' | 'red' | 'blue' | 'gray';

const colors = {
  green: { bg: 'var(--green-bg)', color: 'var(--green)' },
  amber: { bg: 'var(--amber-bg)', color: 'var(--amber)' },
  red: { bg: 'var(--red-bg)', color: 'var(--red)' },
  blue: { bg: 'var(--blue-bg)', color: 'var(--blue)' },
  gray: { bg: 'var(--bg3)', color: 'var(--txt2)' },
};

export default function Badge({
  children,
  variant = 'gray',
}: {
  children: React.ReactNode;
  variant?: Variant;
}) {
  const c = colors[variant];
  return (
    <span
      style={{
        fontSize: 10,
        padding: '2px 8px',
        borderRadius: 20,
        fontWeight: 500,
        display: 'inline-block',
        background: c.bg,
        color: c.color,
      }}
    >
      {children}
    </span>
  );
}
