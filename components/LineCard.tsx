import Badge from './Badge';
import { getGrade, checkSpec, formatSpec, SpecLimit } from '../lib/specs';

interface ParamChip {
  key: string;
  label: string;
  value: number;
  specKey:
    | 'ian'
    | 'nsa'
    | 'stsa'
    | 'oan'
    | 'coan'
    | 'pd'
    | 'tint'
    | 'hl'
    | 'grit325'
    | 'phAvg'
    | 'phMax'
    | 'fines'
    | 'ash'
    | 'pH';
}
interface Props {
  lineNo: number;
  grade: string;
  lot: string;
  startDay: string;
  dayNo: number;
  params: ParamChip[];
  status?: 'running' | 'check' | 'idle';
}

export default function LineCard({
  lineNo,
  grade,
  lot,
  startDay,
  dayNo,
  params,
  status = 'running',
}: Props) {
  const spec = getGrade(grade);
  const borderColor =
    status === 'running'
      ? 'var(--green)'
      : status === 'check'
      ? 'var(--amber)'
      : 'var(--txt3)';
  const badgeVariant =
    status === 'running' ? 'green' : status === 'check' ? 'amber' : 'gray';

  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: 8,
        padding: '10px 11px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt)' }}>
          Line {lineNo}
        </span>
        <Badge variant={badgeVariant}>
          {status === 'running'
            ? 'Running'
            : status === 'check'
            ? 'Check'
            : 'Idle'}
        </Badge>
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--accent)',
          marginBottom: 2,
        }}
      >
        {grade}
      </div>
      <div
        style={{
          fontSize: 9,
          color: 'var(--txt3)',
          marginBottom: 6,
          fontFamily: 'monospace',
        }}
      >
        {lot} · Day {dayNo} · Since {startDay}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {params.map((p) => {
          const limit = spec?.mfg[p.specKey] as SpecLimit | undefined;
          const st = limit ? checkSpec(p.value, limit) : 'na';
          return (
            <span
              key={p.key}
              title={limit ? `Spec: ${formatSpec(limit)}` : 'No spec'}
              style={{
                fontSize: 9,
                padding: '2px 6px',
                borderRadius: 3,
                background:
                  st === 'oos'
                    ? 'var(--red-bg)'
                    : st === 'ok'
                    ? 'var(--green-bg)'
                    : 'var(--bg3)',
                border: `1px solid ${
                  st === 'oos'
                    ? 'var(--red)'
                    : st === 'ok'
                    ? 'var(--green)'
                    : 'var(--border2)'
                }`,
                color:
                  st === 'oos'
                    ? 'var(--red)'
                    : st === 'ok'
                    ? 'var(--green)'
                    : 'var(--txt2)',
                fontWeight: st === 'oos' ? 700 : 400,
              }}
            >
              {p.label} {p.value}
            </span>
          );
        })}
      </div>
    </div>
  );
}
