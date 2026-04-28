'use client';
import { useState } from 'react';
import {
  PRODUCTION_LINES,
  getGrade,
  checkSpec,
  formatSpec,
  ONLINE_COLUMNS,
} from '../lib/specs';

const ONLINE_DATA: Record<number, Record<string, number>[]> = {
  1: [
    {
      time: 1400,
      ian: 83,
      oan: 101,
      coan: 88,
      pd: 382,
      hl: 0.6,
      grit325: 18,
      phAvg: 29,
      phMax: 36,
      phMin: 22,
      ph25: 34,
      fines: 1.8,
    },
    {
      time: 1200,
      ian: 82,
      oan: 103,
      coan: 87,
      pd: 378,
      hl: 0.7,
      grit325: 22,
      phAvg: 28,
      phMax: 35,
      phMin: 21,
      ph25: 33,
      fines: 2.0,
    },
    {
      time: 1000,
      ian: 84,
      oan: 100,
      coan: 89,
      pd: 385,
      hl: 0.9,
      grit325: 19,
      phAvg: 30,
      phMax: 37,
      phMin: 23,
      ph25: 35,
      fines: 1.9,
    },
    {
      time: 800,
      ian: 77,
      oan: 102,
      coan: 88,
      pd: 376,
      hl: 0.5,
      grit325: 16,
      phAvg: 27,
      phMax: 34,
      phMin: 20,
      ph25: 32,
      fines: 2.1,
    },
    {
      time: 600,
      ian: 81,
      oan: 107,
      coan: 86,
      pd: 383,
      hl: 0.6,
      grit325: 20,
      phAvg: 29,
      phMax: 36,
      phMin: 22,
      ph25: 35,
      fines: 1.7,
    },
  ],
  2: [
    {
      time: 1400,
      ian: 43,
      oan: 121,
      coan: 85,
      pd: 362,
      hl: 0.5,
      grit325: 12,
      phAvg: 28,
      phMax: 65,
      phMin: 18,
      ph25: 50,
      fines: 1.5,
    },
    {
      time: 1200,
      ian: 44,
      oan: 123,
      coan: 83,
      pd: 358,
      hl: 0.4,
      grit325: 10,
      phAvg: 27,
      phMax: 63,
      phMin: 17,
      ph25: 48,
      fines: 1.6,
    },
    {
      time: 1000,
      ian: 42,
      oan: 128,
      coan: 84,
      pd: 365,
      hl: 0.5,
      grit325: 14,
      phAvg: 29,
      phMax: 66,
      phMin: 19,
      ph25: 52,
      fines: 1.4,
    },
    {
      time: 800,
      ian: 45,
      oan: 120,
      coan: 86,
      pd: 355,
      hl: 0.6,
      grit325: 11,
      phAvg: 28,
      phMax: 64,
      phMin: 18,
      ph25: 49,
      fines: 1.7,
    },
    {
      time: 600,
      ian: 41,
      oan: 122,
      coan: 82,
      pd: 360,
      hl: 0.4,
      grit325: 13,
      phAvg: 27,
      phMax: 62,
      phMin: 16,
      ph25: 47,
      fines: 1.5,
    },
  ],
  3: [
    {
      time: 1400,
      ian: 32,
      oan: 52,
      coan: 48,
      pd: 430,
      hl: 0.4,
      grit325: 8,
      phAvg: 24,
      phMax: 44,
      phMin: 18,
      ph25: 38,
      fines: 2.1,
    },
    {
      time: 1200,
      ian: 33,
      oan: 53,
      coan: 47,
      pd: 428,
      hl: 0.5,
      grit325: 7,
      phAvg: 25,
      phMax: 46,
      phMin: 17,
      ph25: 40,
      fines: 2.3,
    },
    {
      time: 1000,
      ian: 30,
      oan: 51,
      coan: 49,
      pd: 432,
      hl: 0.4,
      grit325: 9,
      phAvg: 23,
      phMax: 43,
      phMin: 19,
      ph25: 37,
      fines: 2.0,
    },
    {
      time: 800,
      ian: 36,
      oan: 54,
      coan: 50,
      pd: 425,
      hl: 0.6,
      grit325: 28,
      phAvg: 26,
      phMax: 47,
      phMin: 16,
      ph25: 41,
      fines: 2.5,
    },
    {
      time: 600,
      ian: 32,
      oan: 52,
      coan: 48,
      pd: 430,
      hl: 0.3,
      grit325: 6,
      phAvg: 24,
      phMax: 45,
      phMin: 18,
      ph25: 39,
      fines: 1.9,
    },
  ],
  4: [
    {
      time: 1400,
      ian: 36,
      oan: 90,
      coan: 74,
      pd: 442,
      hl: 0.4,
      grit325: 14,
      phAvg: 28,
      phMax: 60,
      phMin: 18,
      ph25: 45,
      fines: 1.3,
    },
    {
      time: 1200,
      ian: 37,
      oan: 91,
      coan: 72,
      pd: 438,
      hl: 0.5,
      grit325: 12,
      phAvg: 27,
      phMax: 58,
      phMin: 17,
      ph25: 43,
      fines: 1.4,
    },
    {
      time: 1000,
      ian: 35,
      oan: 89,
      coan: 80,
      pd: 445,
      hl: 0.4,
      grit325: 15,
      phAvg: 29,
      phMax: 62,
      phMin: 19,
      ph25: 47,
      fines: 1.2,
    },
    {
      time: 800,
      ian: 38,
      oan: 92,
      coan: 73,
      pd: 435,
      hl: 0.6,
      grit325: 13,
      phAvg: 28,
      phMax: 61,
      phMin: 18,
      ph25: 46,
      fines: 1.5,
    },
    {
      time: 600,
      ian: 34,
      oan: 88,
      coan: 75,
      pd: 448,
      hl: 0.3,
      grit325: 11,
      phAvg: 27,
      phMax: 59,
      phMin: 17,
      ph25: 44,
      fines: 1.1,
    },
  ],
  5: [
    {
      time: 1400,
      ian: 29,
      oan: 72,
      coan: 63,
      pd: 492,
      hl: 0.4,
      grit325: 10,
      phAvg: 28,
      phMax: 55,
      phMin: 18,
      ph25: 42,
      fines: 1.0,
    },
    {
      time: 1200,
      ian: 30,
      oan: 73,
      coan: 62,
      pd: 488,
      hl: 0.5,
      grit325: 9,
      phAvg: 27,
      phMax: 53,
      phMin: 17,
      ph25: 40,
      fines: 1.1,
    },
    {
      time: 1000,
      ian: 28,
      oan: 71,
      coan: 64,
      pd: 495,
      hl: 0.3,
      grit325: 11,
      phAvg: 29,
      phMax: 56,
      phMin: 19,
      ph25: 44,
      fines: 0.9,
    },
    {
      time: 800,
      ian: 31,
      oan: 74,
      coan: 61,
      pd: 485,
      hl: 0.5,
      grit325: 8,
      phAvg: 28,
      phMax: 54,
      phMin: 18,
      ph25: 41,
      fines: 1.2,
    },
    {
      time: 600,
      ian: 27,
      oan: 70,
      coan: 65,
      pd: 498,
      hl: 0.4,
      grit325: 10,
      phAvg: 27,
      phMax: 52,
      phMin: 16,
      ph25: 39,
      fines: 0.8,
    },
  ],
};

function fmtTime(t: number) {
  const h = String(Math.floor(t / 100)).padStart(2, '0');
  const m = String(t % 100).padStart(2, '0');
  return `${h}:${m}`;
}

export default function OnlineTable() {
  const [selectedLine, setSelectedLine] = useState(1);
  const line = PRODUCTION_LINES[selectedLine - 1];
  const spec = getGrade(line.grade);
  const data = ONLINE_DATA[selectedLine] || [];

  const activeCols = ONLINE_COLUMNS.filter(
    (col) =>
      spec?.onlineParams?.includes(col.key) ||
      ['ian', 'oan', 'pd', 'hl', 'grit325', 'phAvg', 'phMax', 'fines'].includes(
        col.key
      )
  );

  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 12,
      }}
    >
      {/* Line selector */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          padding: 8,
          background: 'var(--bg1)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {PRODUCTION_LINES.map((pl) => (
          <button
            key={pl.lineNo}
            onClick={() => setSelectedLine(pl.lineNo)}
            style={{
              fontSize: 10,
              padding: '4px 10px',
              borderRadius: 5,
              cursor: 'pointer',
              background: selectedLine === pl.lineNo ? 'var(--bg3)' : 'none',
              border:
                selectedLine === pl.lineNo
                  ? '1px solid var(--accent)'
                  : '1px solid transparent',
              color: selectedLine === pl.lineNo ? 'var(--txt)' : 'var(--txt2)',
              fontWeight: selectedLine === pl.lineNo ? 500 : 400,
            }}
          >
            Line {pl.lineNo} · {pl.grade}
          </button>
        ))}
      </div>

      {/* Mfg Spec bar */}
      {spec && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            alignItems: 'center',
            padding: '5px 10px',
            background: 'var(--bg1)',
            borderBottom: '1px solid var(--border)',
            fontFamily: 'monospace',
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              color: 'var(--txt3)',
              letterSpacing: '.06em',
              marginRight: 2,
            }}
          >
            MFG SPEC —
          </span>
          {activeCols.map((col) => {
            const limit = spec.mfg[col.key as keyof typeof spec.mfg];
            if (!limit || limit.type === 'na') return null;
            return (
              <span
                key={col.key}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  fontSize: 9,
                  background: 'var(--bg3)',
                  border: '1px solid var(--border2)',
                  borderRadius: 3,
                  padding: '1px 5px',
                }}
              >
                <span style={{ color: 'var(--txt3)', fontWeight: 500 }}>
                  {col.label}
                </span>
                <span style={{ color: 'var(--txt2)' }}>
                  {formatSpec(limit)} {col.unit}
                </span>
              </span>
            );
          })}
        </div>
      )}

      {/* Ship Spec bar */}
      {spec && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            alignItems: 'center',
            padding: '5px 10px',
            background: 'var(--bg2)',
            borderBottom: '1px solid var(--border)',
            fontFamily: 'monospace',
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              color: 'var(--txt3)',
              letterSpacing: '.06em',
              marginRight: 2,
            }}
          >
            SHIP SPEC —
          </span>
          {activeCols.map((col) => {
            const limit = spec.ship[col.key as keyof typeof spec.ship];
            if (!limit || limit.type === 'na') return null;
            return (
              <span
                key={col.key}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  fontSize: 9,
                  background: 'var(--bg3)',
                  border: '1px solid var(--border2)',
                  borderRadius: 3,
                  padding: '1px 5px',
                }}
              >
                <span style={{ color: 'var(--txt3)', fontWeight: 500 }}>
                  {col.label}
                </span>
                <span style={{ color: 'var(--txt2)' }}>
                  {formatSpec(limit)} {col.unit}
                </span>
              </span>
            );
          })}
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}
        >
          <thead>
            <tr>
              <th
                style={{
                  background: 'var(--bg3)',
                  color: 'var(--txt3)',
                  fontWeight: 600,
                  padding: '6px 10px',
                  textAlign: 'left',
                  borderBottom: '1px solid var(--border)',
                  fontSize: 9,
                  whiteSpace: 'nowrap',
                }}
              >
                Time
              </th>
              {activeCols.map((col) => (
                <th
                  key={col.key}
                  style={{
                    background: 'var(--bg3)',
                    color: 'var(--txt3)',
                    fontWeight: 600,
                    padding: '6px 6px',
                    textAlign: 'center',
                    borderBottom: '1px solid var(--border)',
                    fontSize: 9,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col.label}
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 400,
                      fontFamily: 'monospace',
                    }}
                  >
                    {col.unit}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                style={{
                  background: i % 2 === 0 ? 'var(--bg1)' : 'transparent',
                }}
              >
                <td
                  style={{
                    padding: '5px 10px',
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--txt3)',
                    fontFamily: 'monospace',
                    fontSize: 10,
                  }}
                >
                  {fmtTime(row.time)}
                </td>
                {activeCols.map((col) => {
                  const val = row[col.key];
                  const limit = spec?.mfg[col.key as keyof typeof spec.mfg];
                  const st =
                    val !== undefined && limit ? checkSpec(val, limit) : 'na';
                  return (
                    <td
                      key={col.key}
                      title={limit ? `Spec: ${formatSpec(limit)}` : ''}
                      style={{
                        padding: '5px 6px',
                        textAlign: 'center',
                        borderBottom: '1px solid var(--border)',
                        fontFamily: 'monospace',
                        fontSize: 10,
                        color:
                          st === 'oos'
                            ? 'var(--red)'
                            : st === 'ok'
                            ? 'var(--green)'
                            : 'var(--txt)',
                        fontWeight: st === 'oos' ? 700 : 400,
                        background:
                          st === 'oos' ? 'var(--red-bg)' : 'transparent',
                      }}
                    >
                      {val !== undefined ? val : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
