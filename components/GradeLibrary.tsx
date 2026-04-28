'use client';
import { useState } from 'react';
import { GRADES, formatSpec } from '../lib/specs';

const FAMILIES = ['All', 'ASTM', 'KLAREX RG', 'JETEX', 'KC/KP', 'ELECTRA', 'ONYX'];

const PARAM_LABELS: Record<string, string> = {
  ian:'IAN (mg/g)', nsa:'NSA (m²/g)', stsa:'STSA (m²/g)', oan:'OAN (cc/100g)',
  coan:'COAN (cc/100g)', pd:'PD (kg/m³)', tint:'Tint (%)', hl:'Heat loss (%)',
  grit325:'Grit #325 (ppm)', grit100:'Grit #100 (ppm)', phAvg:'PH avg (gf)',
  phMax:'PH max (gf)', phMin:'PH min (gf)', ph25:'25% max (gf)',
  fines:'Fines (%)', ash:'Ash (%)', pH:'pH', td:'Toluene (%T)', sulphur:'Sulphur (%)'
};

export default function GradeLibrary() {
  const [family, setFamily] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = GRADES.filter(g =>
    (family === 'All' || g.family === family) &&
    (search === '' || g.grade.toLowerCase().includes(search.toLowerCase()))
  );

  const sel = selected ? GRADES.find(g => g.grade === selected) : null;

  return (
    <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:12, height:'calc(100vh - 130px)' }}>
      {/* Left panel — grade list */}
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'10px 12px', borderBottom:'1px solid var(--border)', background:'var(--bg1)' }}>
          <input
            placeholder="Search grade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width:'100%', padding:'6px 10px', borderRadius:6, border:'1px solid var(--border2)', background:'var(--bg2)', color:'var(--txt)', fontSize:12, outline:'none', boxSizing:'border-box' }}
          />
          <div style={{ display:'flex', flexWrap:'wrap', gap:3, marginTop:8 }}>
            {FAMILIES.map(f => (
              <button key={f} onClick={() => setFamily(f)} style={{
                fontSize:10, padding:'2px 8px', borderRadius:10, cursor:'pointer',
                background: family===f ? 'var(--accent)' : 'var(--bg3)',
                color: family===f ? '#fff' : 'var(--txt2)',
                border:'1px solid var(--border2)', fontWeight: family===f ? 600 : 400
              }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowY:'auto', flex:1 }}>
          {filtered.map(g => (
            <div key={g.grade} onClick={() => setSelected(g.grade)} style={{
              padding:'8px 12px', borderBottom:'1px solid var(--border)', cursor:'pointer',
              background: selected===g.grade ? 'var(--bg3)' : 'transparent',
              borderLeft: selected===g.grade ? '3px solid var(--accent)' : '3px solid transparent',
              transition:'all 0.1s'
            }}>
              <div style={{ fontSize:12, fontWeight:500, color:'var(--txt)' }}>{g.grade}</div>
              <div style={{ fontSize:10, color:'var(--txt3)', marginTop:2 }}>{g.family} · {g.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — spec details */}
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'auto', padding:16 }}>
        {!sel ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', color:'var(--txt3)' }}>
            <div style={{ fontSize:32, marginBottom:12 }}>📦</div>
            <div style={{ fontSize:14, fontWeight:500 }}>Select a grade to view specifications</div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:20, fontWeight:700, color:'var(--txt)' }}>{sel.grade}</div>
              <div style={{ fontSize:12, color:'var(--txt3)', marginTop:4 }}>
                {sel.family} &nbsp;·&nbsp; {sel.type}
                {(sel as any).astmEquiv ? ` · ASTM equivalent: ${(sel as any).astmEquiv}` : ''}
              </div>
            </div>

            {/* Spec comparison table */}
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign:'left', padding:'8px 10px', background:'var(--bg3)', borderBottom:'1px solid var(--border)', color:'var(--txt3)', fontSize:10, fontWeight:600, letterSpacing:'0.05em' }}>PARAMETER</th>
                    <th style={{ padding:'8px 10px', background:'var(--bg3)', borderBottom:'1px solid var(--border)', color:'var(--txt3)', fontSize:10, fontWeight:600 }}>MFG SPEC</th>
                    <th style={{ padding:'8px 10px', background:'var(--bg3)', borderBottom:'1px solid var(--border)', color:'var(--txt3)', fontSize:10, fontWeight:600 }}>SHIPPING SPEC</th>
                    <th style={{ padding:'8px 10px', background:'var(--bg3)', borderBottom:'1px solid var(--border)', color:'var(--txt3)', fontSize:10, fontWeight:600 }}>TEST METHOD</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(PARAM_LABELS).map(key => {
                    const mfg = sel.mfg[key as keyof typeof sel.mfg];
                    const ship = sel.ship[key as keyof typeof sel.ship];
                    if (!mfg && !ship) return null;
                    const methods: Record<string,string> = {
                      ian:'ASTM D1510', nsa:'ASTM D6556', stsa:'ASTM D6556', oan:'ASTM D2414',
                      coan:'ASTM D3493', pd:'ASTM D1513', tint:'ASTM D3265', hl:'ASTM D1509',
                      grit325:'ASTM D1514', grit100:'ASTM D1514', phAvg:'ASTM D5230',
                      phMax:'ASTM D5230', phMin:'ASTM D5230', ph25:'ASTM D5230',
                      fines:'ASTM D1508', ash:'ASTM D1506', pH:'ASTM D1512',
                      td:'ASTM D1618', sulphur:'ASTM D1619'
                    };
                    return (
                      <tr key={key} style={{ borderBottom:'1px solid var(--border)' }}>
                        <td style={{ padding:'7px 10px', color:'var(--txt2)', fontWeight:500 }}>{PARAM_LABELS[key]}</td>
                        <td style={{ padding:'7px 10px', textAlign:'center', color:'var(--txt)', fontFamily:'monospace' }}>{mfg ? formatSpec(mfg) : '—'}</td>
                        <td style={{ padding:'7px 10px', textAlign:'center', color:'var(--txt)', fontFamily:'monospace' }}>{ship ? formatSpec(ship) : '—'}</td>
                        <td style={{ padding:'7px 10px', textAlign:'center', color:'var(--txt3)', fontSize:10 }}>{methods[key] || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
