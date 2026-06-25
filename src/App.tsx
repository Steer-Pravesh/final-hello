import { useMemo, useState } from 'react';
import {
  Activity, AlertTriangle, BarChart3, Bell, BrainCircuit, ChevronDown, Clock3,
  CloudSun, Droplets, Gauge, HeartPulse, Home, LayoutDashboard, LogOut, Menu,
  MoreHorizontal, Pause, Play, Search, ShieldCheck, Siren, Sparkles, ThermometerSun,
  TimerReset, UserRound, UsersRound, Wind, X, CheckCircle2, FileText, Settings,
  Stethoscope, CircleStop, Waves, Dumbbell, Eye, ArrowUpRight, Zap, ShieldAlert
} from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SafetyCenter } from './components/SafetyCenter';
import { ReportsPage } from './components/ReportsPage';
import { CoachesPage } from './components/CoachesPage';
import { ParentTrends } from './components/ParentTrends';
import { AddAthleteModal } from './components/AddAthleteModal';
import { initialAthletes, insights } from './data/mock';
import type { Activity as ActivityType, Athlete, Risk, Role } from './types';
const riskRank: Record<Risk, number> = { red: 4, orange: 3, yellow: 2, green: 1 };
const riskLabel: Record<Risk, string> = { red: 'Critical', orange: 'Issue Raised', yellow: 'Needs Monitoring', green: 'Safe' };

const actionMap: Record<string, ActivityType> = {
  'Give Rest': 'Resting', Hydrate: 'Hydrating', 'Reduce Intensity': 'Reduced Intensity',
  Resume: 'Training', Pause: 'Paused', 'End Session': 'Session Ended', 'Medical Attention': 'Medical Attention'
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'login' | 'app'>('landing');
  const [role, setRole] = useState<Role>('coach');
  const [page, setPage] = useState('Live Session');
  const [athletes, setAthletes] = useState(initialAthletes);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [criticalAthlete, setCriticalAthlete] = useState<Athlete | null>(initialAthletes[0]);
  const [insightOpen, setInsightOpen] = useState<(typeof insights)[0] | null>(null);
  const [toast, setToast] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddAthlete, setShowAddAthlete] = useState(false);

  const sortedAthletes = useMemo(
    () => [...athletes].sort((a, b) => riskRank[b.risk] - riskRank[a.risk]),
    [athletes]
  );

  const counts = useMemo(() => ({
    red: athletes.filter(a => a.risk === 'red').length,
    orange: athletes.filter(a => a.risk === 'orange').length,
    yellow: athletes.filter(a => a.risk === 'yellow').length,
    green: athletes.filter(a => a.risk === 'green').length,
  }), [athletes]);

  const performAction = (athlete: Athlete, action: string) => {
    const nextActivity = actionMap[action];
    setAthletes(prev => prev.map(a => a.id === athlete.id ? {
      ...a,
      activity: nextActivity ?? a.activity,
      latestAction: `${action} · just now`,
      risk: action === 'Medical Attention' ? 'red' : action === 'End Session' ? 'yellow' : action === 'Give Rest' || action === 'Hydrate' ? 'orange' : a.risk,
      issueRaised: action === 'Resume' ? false : a.issueRaised,
      intensity: action === 'Reduce Intensity' ? 'Reduced' : a.intensity,
    } : a));
    setCriticalAthlete(null);
    setToast(`${action} applied to ${athlete.name}`);
    window.setTimeout(() => setToast(''), 2800);
  };

  if (currentScreen === 'landing') {
    return <LandingPage onLoginClick={() => setCurrentScreen('login')} />;
  }

  if (currentScreen === 'login') {
    return <LoginPage onLoginSuccess={(r) => { setRole(r); setCurrentScreen('app'); setPage('Dashboard'); }} onBack={() => setCurrentScreen('landing')} />;
  }

  return (
    <div className="app-shell">
      <Sidebar role={role} page={page} setPage={setPage} open={sidebarOpen} close={() => setSidebarOpen(false)} onLogout={() => { setCurrentScreen('landing'); setSidebarOpen(false); }} />
      <main className="main-area">
        <Topbar role={role} setRole={setRole} onMenu={() => setSidebarOpen(true)} />
        {role === 'coach' && page === 'Live Session' && (
          <LiveSession athletes={sortedAthletes} counts={counts} onOpen={setSelectedAthlete} onAction={performAction} />
        )}
        {role === 'coach' && page === 'Dashboard' && <CoachDashboard athletes={sortedAthletes} onOpen={setSelectedAthlete} setPage={setPage} />}
        {role === 'coach' && page === 'Athletes' && <AthleteDirectory athletes={sortedAthletes} onOpen={setSelectedAthlete} onAddClick={() => setShowAddAthlete(true)} />}
        {role === 'coach' && page === 'AI Insights' && <InsightsPage onOpen={setInsightOpen} />}
        {role === 'coach' && page === 'Safety Center' && <SafetyCenter />}
        {role === 'coach' && page === 'Reports' && <ReportsPage />}

        {role === 'owner' && page === 'Dashboard' && <OwnerDashboard athletes={sortedAthletes} counts={counts} onOpen={setSelectedAthlete} />}
        {role === 'owner' && page === 'Athletes' && <AthleteDirectory athletes={sortedAthletes} onOpen={setSelectedAthlete} onAddClick={() => setShowAddAthlete(true)} />}
        {role === 'owner' && page === 'Safety Center' && <SafetyCenter />}
        {role === 'owner' && page === 'Reports' && <ReportsPage />}
        {role === 'owner' && page === 'Coaches' && <CoachesPage />}

        {role === 'parent' && page === 'Dashboard' && <ParentDashboard athlete={athletes[2]} />}
        {role === 'parent' && page === 'Reports' && <ReportsPage />}
        {role === 'parent' && page === 'Safety Trends' && <ParentTrends />}
      </main>

      {selectedAthlete && <AthleteProfile athlete={selectedAthlete} close={() => setSelectedAthlete(null)} onAction={performAction} role={role} />}
      {criticalAthlete && role === 'coach' && <CriticalAlert athlete={criticalAthlete} close={() => setCriticalAthlete(null)} onAction={performAction} />}
      {insightOpen && <InsightModal insight={insightOpen} close={() => setInsightOpen(null)} />}
      {showAddAthlete && <AddAthleteModal onClose={() => setShowAddAthlete(false)} onAdd={(a) => { setAthletes(prev => [...prev, a]); setToast(`Added ${a.name}`); window.setTimeout(() => setToast(''), 2800); }} />}
      {toast && <div className="toast"><CheckCircle2 size={18} />{toast}</div>}
    </div>
  );
}

function Sidebar({ role, page, setPage, open, close, onLogout }: { role: Role; page: string; setPage: (v: string) => void; open: boolean; close: () => void; onLogout: () => void; }) {
  const coachItems = [
    ['Dashboard', LayoutDashboard], ['Live Session', Activity], ['Athletes', UsersRound],
    ['Safety Center', ShieldAlert], ['AI Insights', BrainCircuit], ['Reports', BarChart3]
  ] as const;
  const ownerItems = [['Dashboard', LayoutDashboard], ['Athletes', UsersRound], ['Safety Center', ShieldCheck], ['Reports', BarChart3], ['Coaches', UserRound]] as const;
  const parentItems = [['Dashboard', Home], ['Reports', FileText], ['Safety Trends', BarChart3]] as const;
  const items = role === 'coach' ? coachItems : role === 'owner' ? ownerItems : parentItems;
  return <>
    {open && <button className="sidebar-backdrop" onClick={close} aria-label="Close navigation" />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Waves size={22}/></div><div><strong>HelioSense</strong><span>LIVE SAFETY INTELLIGENCE</span></div></div>
      <nav>
        <p className="nav-label">WORKSPACE</p>
        {items.map(([label, Icon]) => <button key={label} className={page === label ? 'nav-active' : ''} onClick={() => { setPage(label); close(); }}><Icon size={19}/><span>{label}</span>{label === 'Live Session' && <i className="live-dot"/>}</button>)}
      </nav>
      <div className="side-card">
        <div className="side-card-icon"><ShieldCheck size={20}/></div>
        <strong>System status</strong><span>All safety services operational</span>
        <div className="system-row"><i/>Real-time sync active</div>
      </div>
      <div className="sidebar-bottom">
        <button><Settings size={18}/>Settings</button><button onClick={onLogout}><LogOut size={18}/>Sign out</button>
      </div>
    </aside>
  </>;
}

function Topbar({ role, setRole, onMenu }: { role: Role; setRole: (r: Role) => void; onMenu: () => void }) {
  return <header className="topbar">
    <button className="mobile-menu" onClick={onMenu}><Menu size={22}/></button>
    <div className="search"><Search size={18}/><input placeholder="Search athlete, batch or session..."/><span>⌘ K</span></div>
    <div className="topbar-actions">
      <select value={role} onChange={e => setRole(e.target.value as Role)} aria-label="Switch demo role">
        <option value="coach">Coach view</option><option value="owner">Academy owner</option><option value="parent">Parent view</option>
      </select>
      <button className="icon-btn notification"><Bell size={20}/><i/></button>
      <div className="user-chip"><div className="avatar small">AK</div><div><strong>Arjun Khanna</strong><span>{role === 'coach' ? 'Head Coach' : role === 'owner' ? 'Academy Owner' : 'Parent'}</span></div><ChevronDown size={16}/></div>
    </div>
  </header>;
}

function LiveSession({ athletes, counts, onOpen, onAction }: { athletes: Athlete[]; counts: Record<Risk, number>; onOpen: (a: Athlete) => void; onAction: (a: Athlete, s: string) => void }) {
  return <div className="page-wrap">
    <section className="session-hero">
      <div className="hero-top"><div><div className="eyebrow"><span className="pulse-dot"/>LIVE SESSION · ELITE U-18</div><h1>High Intensity Conditioning</h1><p>Coach Arjun Khanna · Outdoor Main Pitch</p></div><div className="elapsed"><span>ELAPSED TIME</span><strong>00:47:32</strong><small>of 60 min planned</small></div></div>
      <div className="hero-stats">
        <Metric icon={<ThermometerSun/>} label="Temperature" value="34°C" sub="Feels like 38°C" warning />
        <Metric icon={<Droplets/>} label="Humidity" value="68%" sub="Elevated" warning />
        <Metric icon={<CloudSun/>} label="UV index" value="8.2" sub="Very high" danger />
        <Metric icon={<Wind/>} label="Air quality" value="72" sub="Moderate" />
        <div className="environment-card"><div><ShieldAlert size={20}/><span>Environment risk</span></div><strong>HIGH</strong><p>Shorten work intervals and hydrate earlier.</p></div>
      </div>
    </section>

    <section className="session-toolbar">
      <div><button className="primary-action"><Pause size={17}/>Pause Session</button><button><Droplets size={17}/>Group Hydration</button><button><Gauge size={17}/>Reduce All</button><button><Dumbbell size={17}/>Change Drill</button></div>
      <button className="danger-outline"><CircleStop size={17}/>End Session</button>
    </section>

    <section className="risk-summary">
      <div className="summary-intro"><div><strong>{athletes.length}</strong><span>Athletes live</span></div><p>Cards automatically prioritised by risk</p></div>
      {(['red','orange','yellow','green'] as Risk[]).map(r => <div className={`risk-count ${r}`} key={r}><span>{riskLabel[r]}</span><strong>{counts[r]}</strong><div className="mini-bar"><i style={{width: `${Math.max(12, counts[r] / athletes.length * 100)}%`}}/></div></div>)}
    </section>

    <div className="section-heading"><div><h2>Live athlete monitoring</h2><p>Individual status, safety risk and coach interventions</p></div><div className="view-controls"><button className="active"><LayoutDashboard size={17}/></button><button><Menu size={17}/></button><button><MoreHorizontal size={18}/></button></div></div>
    <section className="athlete-grid">
      {athletes.map(a => <AthleteCard key={a.id} athlete={a} onOpen={onOpen} onAction={onAction}/>) }
    </section>
  </div>;
}

function AthleteCard({ athlete, onOpen, onAction }: { athlete: Athlete; onOpen: (a: Athlete) => void; onAction: (a: Athlete, s: string) => void }) {
  return <article className={`athlete-card risk-${athlete.risk}`}>
    <div className="card-priority-line"/>
    <div className="activity-banner"><span><Activity size={15}/>{athlete.activity}</span><span className={`risk-pill ${athlete.risk}`}><i/>{riskLabel[athlete.risk]}</span></div>
    <div className="athlete-main" onClick={() => onOpen(athlete)} role="button" tabIndex={0}>
      <div className={`avatar athlete-avatar ${athlete.avatarTone}`}>{athlete.initials}<span className={`status-ring ${athlete.risk}`}/></div>
      <div className="identity"><h3>{athlete.name}</h3><p>{athlete.position} · {athlete.age} yrs</p><span>{athlete.batch}</span></div>
      <button className="open-profile"><ArrowUpRight size={17}/></button>
    </div>
    {athlete.issueRaised && <div className={`issue-strip ${athlete.risk}`}><AlertTriangle size={16}/><div><strong>{athlete.alert}</strong><span>Coach action {athlete.risk === 'red' ? 'required now' : 'recommended'}</span></div></div>}
    <div className="card-metrics"><div><Clock3/><span>Active<strong>{athlete.activeTime}</strong></span></div><div><TimerReset/><span>Rest<strong>{athlete.restTime}</strong></span></div><div><Droplets/><span>Hydration<strong>{athlete.hydration}</strong></span></div></div>
    <div className="load-row"><span>Current load</span><div className="load-track"><i style={{width: athlete.intensity === 'Very High' ? '94%' : athlete.intensity === 'High' ? '78%' : athlete.intensity === 'Moderate' ? '55%' : '38%'}}/></div><strong>{athlete.intensity}</strong></div>
    {athlete.latestAction && <div className="latest-action"><CheckCircle2 size={14}/>{athlete.latestAction}</div>}
    <div className="card-actions">
      {athlete.activity === 'Resting' || athlete.activity === 'Hydrating' || athlete.activity === 'Paused' ? <button onClick={() => onAction(athlete, 'Resume')}><Play size={15}/>Resume</button> : <button onClick={() => onAction(athlete, 'Give Rest')}><Pause size={15}/>Rest</button>}
      <button onClick={() => onAction(athlete, 'Hydrate')}><Droplets size={15}/>Hydrate</button>
      <button onClick={() => onAction(athlete, 'Reduce Intensity')}><Gauge size={15}/>Reduce</button>
      <button className="more-action" onClick={() => onOpen(athlete)}><MoreHorizontal size={17}/></button>
    </div>
  </article>;
}

function CoachDashboard({ athletes, onOpen, setPage }: { athletes: Athlete[]; onOpen: (a: Athlete) => void; setPage: (v: string) => void }) {
  return <div className="page-wrap dashboard-page">
    <div className="welcome-row"><div><span className="eyebrow">THURSDAY · 25 JUNE</span><h1>Good afternoon, Arjun.</h1><p>Here is what needs your attention before the next drill.</p></div><button className="primary-action" onClick={() => setPage('Live Session')}><Play size={17}/>Continue live session</button></div>
    <div className="kpi-grid">
      <Kpi icon={<Activity/>} label="Live sessions" value="2" trend="1 high environment risk" />
      <Kpi icon={<UsersRound/>} label="Athletes training" value="24" trend="6 require attention" />
      <Kpi icon={<Siren/>} label="Open alerts" value="4" trend="1 critical" danger />
      <Kpi icon={<Droplets/>} label="Hydration compliance" value="87%" trend="+6% this week" />
    </div>
    <div className="dashboard-columns">
      <section className="panel"><div className="panel-head"><div><h2>Athletes requiring attention</h2><p>Prioritised by current risk</p></div><button onClick={() => setPage('Athletes')}>View all</button></div>{athletes.slice(0,4).map(a => <button className="attention-row" key={a.id} onClick={() => onOpen(a)}><div className={`avatar ${a.avatarTone}`}>{a.initials}</div><div><strong>{a.name}</strong><span>{a.alert ?? 'Monitoring within expected range'}</span></div><span className={`risk-pill ${a.risk}`}>{riskLabel[a.risk]}</span><ChevronDown size={17}/></button>)}</section>
      <section className="panel weather-panel"><div className="panel-head"><div><h2>Training conditions</h2><p>Main outdoor pitch</p></div><CloudSun/></div><div className="weather-big"><strong>34°</strong><span>Feels like 38°C<br/>High heat stress</span></div><div className="weather-grid"><span><Droplets/>68% humidity</span><span><CloudSun/>UV 8.2</span><span><Wind/>AQI 72</span><span><ThermometerSun/>WBGT 29.4°</span></div><div className="recommendation"><Sparkles/><p><strong>Safety recommendation</strong>Reduce high-intensity intervals to 8 minutes and schedule group hydration within 5 minutes.</p></div></section>
    </div>
  </div>;
}

function AthleteDirectory({ athletes, onOpen, onAddClick }: { athletes: Athlete[]; onOpen: (a: Athlete) => void; onAddClick?: () => void }) {
  return <div className="page-wrap"><div className="welcome-row"><div><span className="eyebrow">ATHLETE SECTION</span><h1>Assigned athletes</h1><p>Fast-scanning live status across your current batches.</p></div><button className="primary-action" onClick={onAddClick}><UserRound size={17}/>Add athlete</button></div><div className="directory-filters"><div className="search"><Search size={17}/><input placeholder="Search athlete..."/></div><button>All batches <ChevronDown size={15}/></button><button>All risk levels <ChevronDown size={15}/></button><button>Current activity <ChevronDown size={15}/></button></div><section className="athlete-grid">{athletes.map(a => <AthleteCard key={a.id} athlete={a} onOpen={onOpen} onAction={() => {}}/>)}</section></div>;
}

function InsightsPage({ onOpen }: { onOpen: (i: (typeof insights)[0]) => void }) {
  return <div className="page-wrap"><div className="welcome-row"><div><span className="eyebrow">EXPLAINABLE INTELLIGENCE</span><h1>AI insights</h1><p>Personal-baseline observations with clear supporting evidence.</p></div></div><div className="insights-grid">{insights.map((i, idx) => <button className="insight-card" key={i.title} onClick={() => onOpen(i)}><div className="insight-icon"><BrainCircuit/></div><span className={`insight-risk r${idx}`}>{i.risk}</span><h2>{i.title}</h2><p>{i.detail}</p><div><span>{i.athlete}</span><ArrowUpRight size={18}/></div></button>)}</div></div>;
}

function OwnerDashboard({ athletes, counts, onOpen }: { athletes: Athlete[]; counts: Record<Risk, number>; onOpen: (a: Athlete) => void }) {
  return <div className="page-wrap dashboard-page"><div className="welcome-row"><div><span className="eyebrow">ACADEMY COMMAND CENTER</span><h1>Live safety overview</h1><p>Complete visibility across every coach, batch and active athlete.</p></div><div className="live-badge"><span/>REAL-TIME SYNC</div></div><div className="kpi-grid owner-kpis"><Kpi icon={<Activity/>} label="Live sessions" value="5" trend="Across 4 batches"/><Kpi icon={<UsersRound/>} label="Athletes training" value="67" trend="8 resting · 5 hydrating"/><Kpi icon={<ShieldAlert/>} label="Issue raised" value={String(counts.orange + counts.red)} trend={`${counts.red} critical alert`} danger/><Kpi icon={<TimerReset/>} label="Coach response" value="1m 42s" trend="18s faster this week"/></div><section className="panel"><div className="panel-head"><div><h2>Academy-wide athlete safety</h2><p>Owner monitoring view · coach actions remain protected</p></div><div className="risk-legend">{(['red','orange','yellow','green'] as Risk[]).map(r => <span key={r}><i className={r}/>{counts[r]} {r}</span>)}</div></div><div className="owner-table"><div className="table-head"><span>Athlete</span><span>Current activity</span><span>Coach</span><span>Risk</span><span>Session time</span><span></span></div>{athletes.map(a => <button key={a.id} onClick={() => onOpen(a)}><span className="table-athlete"><span className={`avatar ${a.avatarTone}`}>{a.initials}</span><span><strong>{a.name}</strong><small>{a.batch}</small></span></span><span><Activity size={15}/>{a.activity}</span><span>Arjun Khanna</span><span><i className={`risk-pill ${a.risk}`}>{riskLabel[a.risk]}</i></span><span>{a.activeTime}</span><span><Eye size={17}/></span></button>)}</div></section></div>;
}

function ParentDashboard({ athlete }: { athlete: Athlete }) {
  return <div className="page-wrap parent-page"><div className="parent-hero"><div><span className="eyebrow">TODAY'S TRAINING SUMMARY</span><h1>{athlete.name} completed training safely.</h1><p>He received an extra hydration break when fatigue began rising and recovered normally before continuing.</p><div className="safe-status"><ShieldCheck/>Current status: Recovered and safe</div></div><div className={`avatar parent-avatar ${athlete.avatarTone}`}>{athlete.initials}</div></div><div className="parent-stats"><Kpi icon={<Clock3/>} label="Active training" value="42 min" trend="Planned: 45 min"/><Kpi icon={<TimerReset/>} label="Rest time" value="8 min" trend="2 guided breaks"/><Kpi icon={<Droplets/>} label="Hydration" value="3 breaks" trend="All reminders followed"/><Kpi icon={<ShieldCheck/>} label="Peak safety level" value="Monitor" trend="Recovered normally"/></div><div className="dashboard-columns"><section className="panel"><div className="panel-head"><div><h2>What happened today</h2><p>A simple timeline of the session</p></div></div><div className="timeline"><div><i/><span>4:05 PM</span><p><strong>Session started</strong>Readiness check was within a safe range.</p></div><div><i/><span>4:28 PM</span><p><strong>Hydration break</strong>Coach provided water slightly earlier due to warm conditions.</p></div><div><i/><span>4:43 PM</span><p><strong>Short rest</strong>Fatigue was higher than his normal pattern.</p></div><div><i/><span>4:51 PM</span><p><strong>Training resumed</strong>He recovered normally and continued at moderate intensity.</p></div></div></section><section className="panel recommendation parent-reco"><Sparkles/><div><h2>Recommendation for home</h2><p>Encourage regular fluids this evening and a full night's sleep before tomorrow’s training. No special action is currently required.</p></div></section></div></div>;
}

function AthleteProfile({ athlete, close, onAction, role }: { athlete: Athlete; close: () => void; onAction: (a: Athlete, s: string) => void; role: Role }) {
  return <div className="modal-layer"><button className="modal-backdrop" onClick={close}/><aside className="profile-drawer"><div className="drawer-head"><span>ATHLETE PROFILE</span><button onClick={close}><X/></button></div><div className="profile-identity"><div className={`avatar profile-avatar ${athlete.avatarTone}`}>{athlete.initials}</div><div><h2>{athlete.name}</h2><p>{athlete.sport} · {athlete.position} · {athlete.age} years</p><span>{athlete.batch}</span></div><span className={`risk-pill ${athlete.risk}`}>{riskLabel[athlete.risk]}</span></div><div className="profile-live"><div><span>CURRENT ACTIVITY</span><strong><Activity/>{athlete.activity}</strong></div><div className="risk-score"><span>LIVE RISK SCORE</span><strong>{athlete.riskScore}<small>/100</small></strong></div></div>{athlete.alert && <div className={`issue-strip ${athlete.risk}`}><AlertTriangle/><div><strong>{athlete.alert}</strong><span>Based on live session and personal baseline data</span></div></div>}<div className="profile-section"><h3>Current readiness</h3><div className="readiness-grid"><Progress label="Readiness" value={athlete.readiness}/><Progress label="Recovery" value={athlete.recovery}/><Progress label="Fatigue" value={athlete.fatigue} reverse/><div className="data-tile"><span>Sleep</span><strong>{athlete.sleep} hrs</strong><small>Last night</small></div></div></div><div className="profile-section"><h3>Live session data</h3><div className="detail-grid"><Data label="Active duration" value={athlete.activeTime}/><Data label="Rest duration" value={athlete.restTime}/><Data label="Hydration" value={athlete.hydration}/><Data label="Current intensity" value={athlete.intensity}/><Data label="Heat tolerance" value="Moderate"/><Data label="Latest intervention" value={athlete.latestAction ?? 'None'}/></div></div><div className="profile-section"><h3>Baseline & medical</h3><div className="detail-grid"><Data label="Height / weight" value="174 cm · 68 kg"/><Data label="Fitness baseline" value="Advanced"/><Data label="Heat acclimatisation" value="Partial"/><Data label="Medical restrictions" value="None recorded"/></div></div>{role === 'coach' && <div className="drawer-actions"><button onClick={() => onAction(athlete,'Give Rest')}><Pause/>Give Rest</button><button onClick={() => onAction(athlete,'Hydrate')}><Droplets/>Hydrate</button><button onClick={() => onAction(athlete,'Reduce Intensity')}><Gauge/>Reduce</button><button className="medical" onClick={() => onAction(athlete,'Medical Attention')}><Stethoscope/>Medical</button></div>}</aside></div>;
}

function CriticalAlert({ athlete, close, onAction }: { athlete: Athlete; close: () => void; onAction: (a: Athlete, s: string) => void }) {
  return <div className="critical-layer"><div className="critical-modal"><div className="critical-top"><div className="siren-icon"><Siren/></div><div><span>CRITICAL ATHLETE ALERT</span><h2>Immediate coach attention required</h2></div><button onClick={close}><X/></button></div><div className="critical-athlete"><div className={`avatar critical-avatar ${athlete.avatarTone}`}>{athlete.initials}</div><div><h3>{athlete.name}</h3><p>{athlete.activity} · {athlete.activeTime} active</p></div><strong>RISK {athlete.riskScore}</strong></div><div className="critical-reason"><AlertTriangle/><div><strong>{athlete.alert}</strong><p>Fatigue rose 31% faster than his baseline. Active time is above his personalised threshold in high heat conditions.</p></div></div><div className="supporting"><span><ThermometerSun/>Feels like<strong>38°C</strong></span><span><Zap/>Fatigue<strong>{athlete.fatigue}/100</strong></span><span><Droplets/>Last hydration<strong>{athlete.hydration}</strong></span></div><div className="recommended"><BrainCircuit/><p><span>HELIO RECOMMENDATION</span><strong>Stop high-intensity activity, provide rest and assess symptoms immediately.</strong></p></div><p className="confirmation-note">HelioSense will never end athlete participation automatically. Select and confirm the appropriate coach action.</p><div className="critical-actions"><button onClick={() => onAction(athlete,'Give Rest')}><Pause/>Give Rest</button><button onClick={() => onAction(athlete,'Hydrate')}><Droplets/>Hydrate</button><button onClick={() => onAction(athlete,'Reduce Intensity')}><Gauge/>Reduce Intensity</button><button onClick={() => onAction(athlete,'End Session')}><CircleStop/>End Athlete Session</button><button className="medical" onClick={() => onAction(athlete,'Medical Attention')}><Stethoscope/>Medical Attention</button></div><button className="false-alert" onClick={close}>Mark as false alert</button></div></div>;
}

function InsightModal({ insight, close }: { insight: (typeof insights)[0]; close: () => void }) {
  return <div className="modal-layer"><button className="modal-backdrop" onClick={close}/><div className="insight-modal"><button className="close-floating" onClick={close}><X/></button><div className="insight-icon large"><BrainCircuit/></div><span className="eyebrow">AI INSIGHT · EXPLAINABLE</span><h2>{insight.title}</h2><p className="lead">{insight.detail}</p><div className="explain-box"><h3>Why this insight appeared</h3><p>The model compared current fatigue progression, session duration, heat exposure and recent recovery against the athlete’s own baseline—not against a generic population average.</p></div><div className="detail-grid"><Data label="Athlete" value={insight.athlete}/><Data label="Risk level" value={insight.risk}/><Data label="Supporting window" value="Last 3 sessions"/><Data label="Confidence" value="High · 89%"/></div><div className="recommended"><Sparkles/><p><span>SUGGESTED COACH ACTION</span><strong>{insight.action}</strong></p></div><div className="modal-actions"><button onClick={close}>Acknowledge</button><button className="primary-action" onClick={close}>Apply recommendation</button></div></div></div>;
}

function Metric({ icon, label, value, sub, warning, danger }: { icon: React.ReactNode; label: string; value: string; sub: string; warning?: boolean; danger?: boolean }) { return <div className={`hero-metric ${warning ? 'warning' : ''} ${danger ? 'danger' : ''}`}><div>{icon}</div><span>{label}<strong>{value}</strong><small>{sub}</small></span></div>; }
function Kpi({ icon, label, value, trend, danger }: { icon: React.ReactNode; label: string; value: string; trend: string; danger?: boolean }) { return <div className={`kpi ${danger ? 'danger-kpi' : ''}`}><div className="kpi-icon">{icon}</div><span>{label}</span><strong>{value}</strong><small>{trend}</small></div>; }
function Data({ label, value }: { label: string; value: string }) { return <div className="data-tile"><span>{label}</span><strong>{value}</strong></div>; }
function Progress({ label, value, reverse }: { label: string; value: number; reverse?: boolean }) { return <div className="progress-tile"><span>{label}<strong>{value}%</strong></span><div><i className={reverse ? 'reverse' : ''} style={{width:`${value}%`}}/></div></div>; }

export default App;
