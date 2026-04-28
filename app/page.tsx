'use client';
import { useState } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import MetricCard from '../components/MetricCard';
import LineCard from '../components/LineCard';
import OnlineTable from '../components/OnlineTable';
import ApprovalPanel from '../components/ApprovalPanel';
import SolutionPanel from '../components/SolutionPanel';
import MISPanel from '../components/MISPanel';
import GradeLibrary from '../components/GradeLibrary';
import TrainingCompliance from '../components/TrainingCompliance';
import SectionTitle from '../components/SectionTitle';
import { PRODUCTION_LINES } from '../lib/specs';

const LINE_PARAMS = [
  [
    { key:'ian', label:'IAN', value:83, specKey:'ian' as const },
    { key:'nsa', label:'NSA', value:77, specKey:'nsa' as const },
    { key:'tint', label:'TINT', value:105, specKey:'tint' as const },
    { key:'ph', label:'pH', value:7.8, specKey:'pH' as const },
    { key:'ash', label:'Ash', value:0.6, specKey:'ash' as const },
  ],
  [
    { key:'ian', label:'IAN', value:44, specKey:'ian' as const },
    { key:'nsa', label:'NSA', value:40, specKey:'nsa' as const },
    { key:'oan', label:'OAN', value:128, specKey:'oan' as const },
    { key:'ph', label:'pH', value:7.4, specKey:'pH' as const },
    { key:'hl', label:'HL%', value:0.4, specKey:'hl' as const },
  ],
  [
    { key:'ian', label:'IAN', value:32, specKey:'ian' as const },
    { key:'nsa', label:'NSA', value:33, specKey:'nsa' as const },
    { key:'stsa', label:'STSA', value:31, specKey:'stsa' as const },
    { key:'oan', label:'OAN', value:52, specKey:'oan' as const },
    { key:'coan', label:'COAN', value:48, specKey:'coan' as const },
  ],
  [
    { key:'ian', label:'IAN', value:36, specKey:'ian' as const },
    { key:'nsa', label:'NSA', value:35, specKey:'nsa' as const },
    { key:'oan', label:'OAN', value:90, specKey:'oan' as const },
    { key:'coan', label:'COAN', value:80, specKey:'coan' as const },
    { key:'ash', label:'Ash', value:0.4, specKey:'ash' as const },
  ],
  [
    { key:'ian', label:'IAN', value:29, specKey:'ian' as const },
    { key:'nsa', label:'NSA', value:30, specKey:'nsa' as const },
    { key:'oan', label:'OAN', value:72, specKey:'oan' as const },
    { key:'pd', label:'PD', value:492, specKey:'pd' as const },
    { key:'ph', label:'pH', value:7.1, specKey:'pH' as const },
  ],
];

function Placeholder({ name, icon }: { name: string; icon?: string }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 20px', background:'var(--bg2)', border:'1px dashed var(--border2)', borderRadius:10, textAlign:'center' }}>
      <div style={{ fontSize:36, marginBottom:12 }}>{icon || '🚧'}</div>
      <div style={{ fontSize:16, fontWeight:600, color:'var(--txt)', marginBottom:6 }}>{name}</div>
      <div style={{ fontSize:12, color:'var(--txt3)' }}>Module under development — coming soon</div>
    </div>
  );
}

// Iframe wrapper for HTML dashboards
function HtmlDashboard({ src, title }: { src: string; title: string }) {
  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden' }}>
      <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', background:'var(--bg1)', fontSize:12, fontWeight:500, color:'var(--txt)' }}>
        {title}
      </div>
      <iframe
        src={src}
        style={{ width:'100%', height:'calc(100vh - 180px)', border:'none', background:'white' }}
        title={title}
      />
    </div>
  );
}

const s = {
  root: { minHeight:'100vh', background:'var(--bg0)' } as React.CSSProperties,
  main: { maxWidth:1400, margin:'0 auto', padding:16, display:'flex', flexDirection:'column' as const, gap:12 },
  metricGrid: { display:'grid', gridTemplateColumns:'repeat(4,minmax(0,1fr))', gap:8 },
  lineGrid:   { display:'grid', gridTemplateColumns:'repeat(5,minmax(0,1fr))', gap:8 },
  twoCol:     { display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)', gap:12 },
};

export default function Home() {
  const [tab, setTab] = useState('overview');
  return (
    <ThemeProvider>
      <div style={s.root}>
        <Topbar />
        <Navbar active={tab} onChange={setTab} />
        <main style={s.main}>

          {tab === 'overview' && (
            <>
              <SectionTitle>📅 Yesterday at a glance — vs day before</SectionTitle>
              <div style={s.metricGrid}>
                <MetricCard icon="🧪" label="Samples Analysed"  value={38} sub="▲ 4 vs prev day (34)" subVariant="up" />
                <MetricCard icon="✅" label="Approval Pending"  value={6}  sub="3 urgent · 3 routine"  subVariant="neutral" />
                <MetricCard icon="⚠" label="OOS Results"        value={3}  sub="▲ 1 vs prev day (2)"  subVariant="down" />
                <MetricCard icon="📄" label="Reports Dispatched" value={12} sub="▲ 2 vs prev day (10)" subVariant="up" />
              </div>
              <SectionTitle>🏭 Production lines — running grades &amp; critical params (mfg spec)</SectionTitle>
              <div style={s.lineGrid}>
                {PRODUCTION_LINES.map((pl, i) => (
                  <LineCard key={pl.lineNo} lineNo={pl.lineNo} grade={pl.grade} lot={pl.lot}
                    startDay={pl.startDay} dayNo={pl.dayNo} params={LINE_PARAMS[i]}
                    status={pl.lineNo === 2 ? 'check' : 'running'} />
                ))}
              </div>
              <SectionTitle>📡 Online data — last 5 entries (with mfg &amp; shipping spec bars)</SectionTitle>
              <OnlineTable />
              <div style={s.twoCol}>
                <div>
                  <SectionTitle>✅ Approval sample status</SectionTitle>
                  <ApprovalPanel />
                </div>
                <div>
                  <SectionTitle>🧴 Solution status</SectionTitle>
                  <SolutionPanel />
                </div>
              </div>
            </>
          )}

          {tab === 'online'    && <Placeholder name="Online Status" icon="📡" />}
          {tab === 'special'   && <Placeholder name="Special Parameters" icon="⚗" />}
          {tab === 'approval'  && <HtmlDashboard src="/ApprovalSample.html" title="Carbon Black — Sample Dispatch Dashboard · FY 2025–26" />}
          {tab === 'complaint' && <HtmlDashboard src="/CustomerComplaints.html" title="Customer Complaints Analytics · HSCL" />}
          {tab === 'counter'   && <Placeholder name="Counter Sample" icon="🧪" />}
          {tab === 'analysis'  && <Placeholder name="Analysis Area" icon="🔬" />}
          {tab === 'solution'  && <Placeholder name="Solution Preparation" icon="🧴" />}
          {tab === 'grade'     && (
            <>
              <SectionTitle>📦 Grade Library — Manufacturing &amp; Shipping Specifications</SectionTitle>
              <GradeLibrary />
            </>
          )}
          {tab === 'report'    && <Placeholder name="Report Generator" icon="📄" />}
          {tab === 'mis'       && (
            <>
              <MISPanel />
            </>
          )}
          {tab === 'training'  && (
            <>
              <SectionTitle>🎓 Training &amp; Compliance Tracker</SectionTitle>
              <TrainingCompliance />
            </>
          )}
          {tab === 'study'     && <Placeholder name="Study Zone" icon="📚" />}
          {tab === 'team'      && <Placeholder name="Team" icon="👥" />}

        </main>
      </div>
    </ThemeProvider>
  );
}
