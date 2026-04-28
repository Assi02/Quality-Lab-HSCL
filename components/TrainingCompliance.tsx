'use client';
import { useState } from 'react';

const TEAM = [
  { name:'Ahtasam Akhtar',       role:'QC Manager',        trainings:['ISO 9001:2015','ASTM Methods','Safety Induction','Carbon Black Technology'], completed:[true,true,true,false] },
  { name:'Ravi Kumar',           role:'Senior Chemist',    trainings:['ISO 9001:2015','ASTM Methods','Safety Induction','Carbon Black Technology'], completed:[true,true,true,true] },
  { name:'Priya Singh',          role:'Lab Analyst',       trainings:['ISO 9001:2015','ASTM Methods','Safety Induction','Carbon Black Technology'], completed:[true,false,true,false] },
  { name:'Suresh Mehta',         role:'QC Technician',     trainings:['ISO 9001:2015','ASTM Methods','Safety Induction','Carbon Black Technology'], completed:[false,false,true,false] },
  { name:'Anita Das',            role:'Lab Analyst',       trainings:['ISO 9001:2015','ASTM Methods','Safety Induction','Carbon Black Technology'], completed:[true,true,true,true] },
];

const MODULES = ['ISO 9001:2015','ASTM Methods','Safety Induction','Carbon Black Technology'];

export default function TrainingCompliance() {
  const [view, setView] = useState<'matrix'|'modules'>('matrix');

  const totalCompliance = () => {
    const total = TEAM.length * MODULES.length;
    const done = TEAM.reduce((s, t) => s + t.completed.filter(Boolean).length, 0);
    return Math.round((done/total)*100);
  };

  return (
    <div>
      {/* Header stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:16 }}>
        {[
          { label:'Overall compliance', value:`${totalCompliance()}%`, color:'var(--green)' },
          { label:'Team members', value:String(TEAM.length), color:'var(--blue)' },
          { label:'Training modules', value:String(MODULES.length), color:'var(--amber)' },
          { label:'Fully compliant', value:String(TEAM.filter(t=>t.completed.every(Boolean)).length), color:'var(--green)' },
        ].map(s => (
          <div key={s.label} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:'12px 14px' }}>
            <div style={{ fontSize:10, color:'var(--txt3)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:6 }}>{s.label}</div>
            <div style={{ fontSize:24, fontWeight:700, color:s.color, fontFamily:'monospace' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* View toggle */}
      <div style={{ display:'flex', gap:4, marginBottom:12 }}>
        {(['matrix','modules'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            fontSize:11, padding:'5px 14px', borderRadius:6, cursor:'pointer',
            background: view===v ? 'var(--bg3)' : 'none',
            border: view===v ? '1px solid var(--border2)' : '1px solid transparent',
            color: view===v ? 'var(--txt)' : 'var(--txt2)', fontWeight: view===v ? 500 : 400
          }}>{v === 'matrix' ? '🗂 Compliance Matrix' : '📋 Module Summary'}</button>
        ))}
      </div>

      {view === 'matrix' && (
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
            <thead>
              <tr style={{ background:'var(--bg3)' }}>
                <th style={{ textAlign:'left', padding:'10px 14px', color:'var(--txt3)', fontSize:10, fontWeight:600, letterSpacing:'0.05em', borderBottom:'1px solid var(--border)' }}>TEAM MEMBER</th>
                <th style={{ textAlign:'left', padding:'10px 10px', color:'var(--txt3)', fontSize:10, fontWeight:600, letterSpacing:'0.05em', borderBottom:'1px solid var(--border)' }}>ROLE</th>
                {MODULES.map(m => (
                  <th key={m} style={{ padding:'10px 10px', color:'var(--txt3)', fontSize:10, fontWeight:600, borderBottom:'1px solid var(--border)', textAlign:'center', whiteSpace:'nowrap' }}>{m}</th>
                ))}
                <th style={{ padding:'10px 10px', color:'var(--txt3)', fontSize:10, fontWeight:600, borderBottom:'1px solid var(--border)', textAlign:'center' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {TEAM.map((t, i) => {
                const pct = Math.round((t.completed.filter(Boolean).length / MODULES.length) * 100);
                return (
                  <tr key={t.name} style={{ borderBottom:'1px solid var(--border)', background: i%2===0 ? 'var(--bg1)' : 'transparent' }}>
                    <td style={{ padding:'10px 14px', color:'var(--txt)', fontWeight:500 }}>{t.name}</td>
                    <td style={{ padding:'10px 10px', color:'var(--txt3)', fontSize:11 }}>{t.role}</td>
                    {t.completed.map((c, j) => (
                      <td key={j} style={{ textAlign:'center', padding:'10px 10px' }}>
                        <span style={{
                          display:'inline-block', width:22, height:22, borderRadius:'50%', lineHeight:'22px', fontSize:12,
                          background: c ? 'var(--green-bg)' : 'var(--red-bg)',
                          color: c ? 'var(--green)' : 'var(--red)',
                          fontWeight:600
                        }}>{c ? '✓' : '✗'}</span>
                      </td>
                    ))}
                    <td style={{ textAlign:'center', padding:'10px 10px' }}>
                      <span style={{
                        fontSize:11, padding:'3px 10px', borderRadius:20, fontWeight:600,
                        background: pct===100 ? 'var(--green-bg)' : pct>=50 ? 'var(--amber-bg)' : 'var(--red-bg)',
                        color: pct===100 ? 'var(--green)' : pct>=50 ? 'var(--amber)' : 'var(--red)'
                      }}>{pct}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {view === 'modules' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
          {MODULES.map((mod, mi) => {
            const done = TEAM.filter(t => t.completed[mi]).length;
            const pct = Math.round((done/TEAM.length)*100);
            return (
              <div key={mod} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--txt)' }}>{mod}</div>
                  <span style={{
                    fontSize:12, padding:'3px 10px', borderRadius:20, fontWeight:600,
                    background: pct===100 ? 'var(--green-bg)' : pct>=50 ? 'var(--amber-bg)' : 'var(--red-bg)',
                    color: pct===100 ? 'var(--green)' : pct>=50 ? 'var(--amber)' : 'var(--red)'
                  }}>{done}/{TEAM.length} · {pct}%</span>
                </div>
                <div style={{ height:6, background:'var(--bg3)', borderRadius:3, overflow:'hidden', marginBottom:10 }}>
                  <div style={{ height:'100%', width:`${pct}%`, background: pct===100 ? 'var(--green)' : pct>=50 ? 'var(--amber)' : 'var(--red)', borderRadius:3, transition:'width 0.3s' }}/>
                </div>
                {TEAM.map(t => (
                  <div key={t.name} style={{ display:'flex', justifyContent:'space-between', padding:'4px 0', borderBottom:'1px solid var(--border)', fontSize:11 }}>
                    <span style={{ color:'var(--txt2)' }}>{t.name}</span>
                    <span style={{ color: t.completed[mi] ? 'var(--green)' : 'var(--red)', fontWeight:500 }}>
                      {t.completed[mi] ? '✓ Done' : '✗ Pending'}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
