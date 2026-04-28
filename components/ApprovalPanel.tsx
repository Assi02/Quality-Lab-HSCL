import Badge from './Badge';

type Status = 'approved' | 'pending' | 'rejected' | 'analysis' | 'dispatched';

const APPROVALS: {
  id: string;
  grade: string;
  customer?: string;
  status: Status;
}[] = [
  { id: 'S-APR-2406-031', grade: 'N330', status: 'approved' },
  { id: 'S-APR-2406-032', grade: 'N550', customer: 'NEI', status: 'pending' },
  { id: 'S-APR-2406-033', grade: 'KLAREX RG 522', status: 'pending' },
  { id: 'S-APR-2406-034', grade: 'N660', status: 'rejected' },
  {
    id: 'S-APR-2406-035',
    grade: 'N774',
    customer: 'Toyoda',
    status: 'analysis',
  },
  { id: 'S-APR-2406-036', grade: 'JETEX 105', status: 'dispatched' },
];

const variantMap: Record<Status, 'green' | 'amber' | 'red' | 'blue' | 'gray'> =
  {
    approved: 'green',
    pending: 'amber',
    rejected: 'red',
    analysis: 'blue',
    dispatched: 'gray',
  };
const labelMap: Record<Status, string> = {
  approved: 'Approved',
  pending: 'Pending',
  rejected: 'Rejected',
  analysis: 'In analysis',
  dispatched: 'Dispatched',
};

export default function ApprovalPanel() {
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {APPROVALS.map((a, i) => (
        <div
          key={a.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            borderBottom:
              i < APPROVALS.length - 1 ? '1px solid var(--border)' : 'none',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: 'var(--txt)', fontWeight: 500 }}>
              {a.grade}
              {a.customer ? ` · ${a.customer}` : ''}
            </div>
            <div
              style={{
                fontSize: 9,
                color: 'var(--txt3)',
                marginTop: 1,
                fontFamily: 'monospace',
              }}
            >
              {a.id}
            </div>
          </div>
          <Badge variant={variantMap[a.status]}>{labelMap[a.status]}</Badge>
        </div>
      ))}
    </div>
  );
}
