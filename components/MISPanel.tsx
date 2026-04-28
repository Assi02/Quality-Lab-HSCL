'use client';
import { useState } from 'react';

const MONTH = 'April 2026';

const KPI = [
  { label:'Total Production (MT)', value:'1,842', sub:'5 lines running', up:true },
  { label:'Online Off-spec (MT/%)', value:'12 / 0.65%', sub:'▼ vs Mar (0.82%)', up:true },
  { label:'Packed Off-spec (MT/%)', value:'8 / 0.43%', sub:'▼ vs Mar (0.61%)', up:true },
  { label:'NOTR Generation (MT/%)', value:'4 / 0.22%', sub:'Within target', up:true },
];

const SAFETY = { participants:28, audits:4, completion:87 };

const DISPATCH = { current:1620, oldStock:180, salesReturn:42, total:1842 };

const TESTING = [
  { type:'Customer Complaint', count:14 },
  { type:'Development project', count:6 },
  { type:'Customer returned material', count:3 },
  { type:'Sample for approval', count:24 },
  { type:'Sample from external WHs', count:8 },
  { type:'Special Sample', count:5 },
];

const INCOMING = [
  { area:'Jumbo Bag', tested:42, accept:95.2, reject:4.8 },
  { area:'Paper Bag', tested:18, accept:100, reject:0 },
  { area:'Blend Oil', tested:6, accept:83.3, reject:16.7 },
  { area:'HPL', tested:4, accept:100, reject:0 },
  { area:'Anthracene Oil', tested:3, accept:100, reject:0 },
];

const DEFECTS_ONLINE = [
  { line:'Line 1', grade:'N330', oan:'In spec', ian:'In spec', fines:'In spec', grit:'OOS', status:'Check' },
  { line:'Line 2', grade:'N550', oan:'OOS', ian:'In spec', fines:'In spec', grit:'In spec', status:'OOS' },
  { line:'Line 3', grade:'RG 522', oan:'In spec', ian:'In spec', fines:'In spec', grit:'In spec', status:'OK' },
  { line:'Line 4', grade:'N660', oan:'In spec', ian:'In spec', fines:'OOS', grit:'In spec', status:'Check' },
  { line:'Line 5', grade:'N774', oan:'In spec', ian:'In spec', fines:'In spec', grit:'In spec', status:'OK' },
];

const COMPLAINTS = [
  { type:'Quality', ytd:28, mtd:4, closed:3, open:1 },
  { type:'Technical', ytd:18, mtd:2, closed:2, open:0 },
  { type:'Packaging', ytd:12, mtd:1, closed:1, open:0 },
  { type:'Logistics', ytd:10, mtd:0, closed:0, open:0 },
  { type:'Others', ytd:8, mtd:1, closed:0, open:1 },
];

const APPROVAL_SAMPLES = [
  { customer:'Phoenix Conveyor Belt India', dom:'DOM', grade:'N330', qty:'5 kg', requestedBy:'Sales', date:'3-Apr-25', leadTime:'2 days' },
  { customer:'Sundaram Industries', dom:'DOM', grade:'RG223', qty:'5 kg', requestedBy:'R&D', date:'5-Apr-25', leadTime:'3 days' },
  { customer:'Apollo Tyres', dom:'DOM', grade:'N550', qty:'10 kg', requestedBy:'Sales', date:'8-Apr-25', leadTime:'4 days' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ fontSize:12, fontWeight:700, color:'var(--accent)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10, paddingBottom:6, borderBottom:'2px solid var(--border)' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function statusColor(s: string) {
  if (s === 'OK' || s === 'In spec') return { color:'var(--green)', background:'var(--green-bg)' };
  if (s === 'Check') return { color:'var(--amber)', background:'var(--amber-bg)' };
  return { color:'var(--red)', background:'var(--red-bg)' };
}

export default function MISPanel() {
  const [section, setSection] = useState('all');

  const sections = [
    'all','kpi','safety','dispatch','testing','incoming','defects','complaints','approval'
  ];

  return (
    <div>
      {/* Month header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div>
          <div style={{ fontSize:18, fontWeight:700, color:'var(--txt)' }}>Monthly MIS Report — QA/QC Activities</div>
          <div style={{ fontSize:12, color:'var(--txt3)', marginTop:3 }}>Himadri Speciality Chemicals Ltd. · {MONTH}</div>
        </div>
        <span style={{ fontSize:12, padding:'6px 16px', borderRadius:20, background:'var(--blue-bg)', color:'var(--blue)', fontWeight:600 }}>📅 {MONTH}</span>
      </div>

      {/* Section filter */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:16 }}>
        {sections.map(s => (
          <button key={s} onClick={() => setSection(s)} style={{
            fontSize:10, padding:'4px 10px', borderRadius:6, cursor:'pointer', textTransform:'capitalize',
            background: section===s ? 'var(--accent)' : 'var(--bg3)',
            color: section===s ? '#fff' : 'var(--txt2)',
            border:'1px solid var(--border2)', fontWeight: section===s ? 600 : 400
          }}>{s === 'all' ? '📋 All Sections' : s}</button>
        ))}
      </div>

      {/* (1) KPI */}
      {(section==='all'||section==='kpi') && (
        <Section title="(1) QA Metrics & Key Performance Indicators">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
            {KPI.map(k => (
              <div key={k.label} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:12 }}>
                <div style={{ fontSize:10, color:'var(--txt3)', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:6 }}>{k.label}</div>
                <div style={{ fontSize:18, fontWeight:700, color:'var(--txt)', fontFamily:'monospace' }}>{k.value}</div>
                <div style={{ fontSize:10, marginTop:4, color: k.up ? 'var(--green)' : 'var(--red)' }}>{k.sub}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* (2) Safety */}
      {(section==='all'||section==='safety') && (
        <Section title="(2) Safety Audit: Plan vs Actual">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
            {[
              { label:'Participants', value:SAFETY.participants },
              { label:'Audits Conducted', value:SAFETY.audits },
              { label:'Completion (%)', value:SAFETY.completion + '%' },
            ].map(s => (
              <div key={s.label} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:12, textAlign:'center' }}>
                <div style={{ fontSize:10, color:'var(--txt3)', marginBottom:6 }}>{s.label}</div>
                <div style={{ fontSize:22, fontWeight:700, color:'var(--txt)', fontFamily:'monospace' }}>{s.value}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* (3) Dispatch */}
      {(section==='all'||section==='dispatch') && (
        <Section title="(3) Dispatch Activities">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
            {[
              { label:'From Current Production', value:DISPATCH.current + ' MT' },
              { label:'From Old Stock', value:DISPATCH.oldStock + ' MT' },
              { label:'Sales Return', value:DISPATCH.salesReturn + ' MT' },
              { label:'Total Dispatch', value:DISPATCH.total + ' MT' },
            ].map(d => (
              <div key={d.label} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:12, textAlign:'center' }}>
                <div style={{ fontSize:10, color:'var(--txt3)', marginBottom:6 }}>{d.label}</div>
                <div style={{ fontSize:18, fontWeight:700, color:'var(--txt)', fontFamily:'monospace' }}>{d.value}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* (4) Testing */}
      {(section==='all'||section==='testing') && (
        <Section title="(4) Testing Activities & Accomplishments">
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead>
                <tr style={{ background:'var(--bg3)' }}>
                  <th style={{ textAlign:'left', padding:'8px 14px', color:'var(--txt3)', fontSize:10, borderBottom:'1px solid var(--border)' }}>TYPE OF TESTING</th>
                  <th style={{ textAlign:'center', padding:'8px 14px', color:'var(--txt3)', fontSize:10, borderBottom:'1px solid var(--border)' }}>NO. OF TESTS</th>
                </tr>
              </thead>
              <tbody>
                {TESTING.map((t, i) => (
                  <tr key={t.type} style={{ borderBottom:'1px solid var(--border)', background: i%2===0 ? 'var(--bg1)' : 'transparent' }}>
                    <td style={{ padding:'8px 14px', color:'var(--txt)' }}>{t.type}</td>
                    <td style={{ padding:'8px 14px', textAlign:'center', fontWeight:600, color:'var(--txt)', fontFamily:'monospace' }}>{t.count}</td>
                  </tr>
                ))}
                <tr style={{ background:'var(--bg3)' }}>
                  <td style={{ padding:'8px 14px', fontWeight:700, color:'var(--txt)' }}>Total</td>
                  <td style={{ padding:'8px 14px', textAlign:'center', fontWeight:700, color:'var(--txt)', fontFamily:'monospace' }}>{TESTING.reduce((s,t)=>s+t.count,0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* (5) Incoming Inspection */}
      {(section==='all'||section==='incoming') && (
        <Section title="(5) Incoming Inspection">
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead>
                <tr style={{ background:'var(--bg3)' }}>
                  {['Inspection Area','No. of Tests','% Acceptance','% Rejection'].map(h => (
                    <th key={h} style={{ padding:'8px 12px', color:'var(--txt3)', fontSize:10, borderBottom:'1px solid var(--border)', textAlign: h==='Inspection Area' ? 'left' : 'center' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INCOMING.map((r, i) => (
                  <tr key={r.area} style={{ borderBottom:'1px solid var(--border)', background: i%2===0 ? 'var(--bg1)' : 'transparent' }}>
                    <td style={{ padding:'8px 12px', color:'var(--txt)', fontWeight:500 }}>{r.area}</td>
                    <td style={{ padding:'8px 12px', textAlign:'center', color:'var(--txt)', fontFamily:'monospace' }}>{r.tested}</td>
                    <td style={{ padding:'8px 12px', textAlign:'center', color:'var(--green)', fontFamily:'monospace', fontWeight:600 }}>{r.accept}%</td>
                    <td style={{ padding:'8px 12px', textAlign:'center', color: r.reject>0 ? 'var(--red)' : 'var(--txt3)', fontFamily:'monospace', fontWeight: r.reject>0 ? 600 : 400 }}>{r.reject}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* (6) Defect Metrics */}
      {(section==='all'||section==='defects') && (
        <Section title="(6) Defect Metrics — Online Status by Line">
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead>
                <tr style={{ background:'var(--bg3)' }}>
                  {['Line','Grade','OAN','IAN','Fines','Grit','Status'].map(h => (
                    <th key={h} style={{ padding:'8px 12px', color:'var(--txt3)', fontSize:10, borderBottom:'1px solid var(--border)', textAlign:'center' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEFECTS_ONLINE.map((r, i) => (
                  <tr key={r.line} style={{ borderBottom:'1px solid var(--border)', background: i%2===0 ? 'var(--bg1)' : 'transparent' }}>
                    <td style={{ padding:'8px 12px', textAlign:'center', fontWeight:600, color:'var(--txt)' }}>{r.line}</td>
                    <td style={{ padding:'8px 12px', textAlign:'center', color:'var(--accent)', fontWeight:500 }}>{r.grade}</td>
                    {[r.oan,r.ian,r.fines,r.grit].map((v,j) => (
                      <td key={j} style={{ padding:'8px 12px', textAlign:'center' }}>
                        <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, fontWeight:500, ...statusColor(v) }}>{v}</span>
                      </td>
                    ))}
                    <td style={{ padding:'8px 12px', textAlign:'center' }}>
                      <span style={{ fontSize:11, padding:'3px 10px', borderRadius:12, fontWeight:600, ...statusColor(r.status) }}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* (7) Customer Complaints */}
      {(section==='all'||section==='complaints') && (
        <Section title="(7) Customer Complaints">
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead>
                <tr style={{ background:'var(--bg3)' }}>
                  {['Type','YTD','MTD','Closed','Open'].map(h => (
                    <th key={h} style={{ padding:'8px 12px', color:'var(--txt3)', fontSize:10, borderBottom:'1px solid var(--border)', textAlign: h==='Type'?'left':'center' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPLAINTS.map((r, i) => (
                  <tr key={r.type} style={{ borderBottom:'1px solid var(--border)', background: i%2===0 ? 'var(--bg1)' : 'transparent' }}>
                    <td style={{ padding:'8px 12px', color:'var(--txt)', fontWeight:500 }}>{r.type}</td>
                    <td style={{ padding:'8px 12px', textAlign:'center', fontFamily:'monospace', color:'var(--txt)' }}>{r.ytd}</td>
                    <td style={{ padding:'8px 12px', textAlign:'center', fontFamily:'monospace', color:'var(--txt)' }}>{r.mtd}</td>
                    <td style={{ padding:'8px 12px', textAlign:'center', fontFamily:'monospace', color:'var(--green)', fontWeight:500 }}>{r.closed}</td>
                    <td style={{ padding:'8px 12px', textAlign:'center', fontFamily:'monospace', color: r.open>0 ? 'var(--red)' : 'var(--txt3)', fontWeight: r.open>0 ? 700 : 400 }}>{r.open}</td>
                  </tr>
                ))}
                <tr style={{ background:'var(--bg3)' }}>
                  <td style={{ padding:'8px 12px', fontWeight:700, color:'var(--txt)' }}>Grand Total</td>
                  {['ytd','mtd','closed','open'].map(k => (
                    <td key={k} style={{ padding:'8px 12px', textAlign:'center', fontWeight:700, fontFamily:'monospace', color: k==='open' ? 'var(--red)' : 'var(--txt)' }}>
                      {COMPLAINTS.reduce((s,r) => s + (r as any)[k], 0)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* (8) Approval Samples */}
      {(section==='all'||section==='approval') && (
        <Section title="(8) Sample for Approval">
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead>
                <tr style={{ background:'var(--bg3)' }}>
                  {['Customer','Dom/Exp','Grade','Qty (Kg)','Requested By','Request Date','Lead Time'].map(h => (
                    <th key={h} style={{ padding:'8px 12px', color:'var(--txt3)', fontSize:10, borderBottom:'1px solid var(--border)', textAlign:'left', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {APPROVAL_SAMPLES.map((r, i) => (
                  <tr key={r.customer} style={{ borderBottom:'1px solid var(--border)', background: i%2===0 ? 'var(--bg1)' : 'transparent' }}>
                    <td style={{ padding:'8px 12px', color:'var(--txt)', fontWeight:500 }}>{r.customer}</td>
                    <td style={{ padding:'8px 12px', color:'var(--txt3)' }}>{r.dom}</td>
                    <td style={{ padding:'8px 12px', color:'var(--accent)', fontWeight:500 }}>{r.grade}</td>
                    <td style={{ padding:'8px 12px', color:'var(--txt)', fontFamily:'monospace' }}>{r.qty}</td>
                    <td style={{ padding:'8px 12px', color:'var(--txt2)' }}>{r.requestedBy}</td>
                    <td style={{ padding:'8px 12px', color:'var(--txt2)', fontFamily:'monospace' }}>{r.date}</td>
                    <td style={{ padding:'8px 12px', color:'var(--txt2)' }}>{r.leadTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}
    </div>
  );
}
