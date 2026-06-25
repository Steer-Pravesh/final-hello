import { TrendingUp, Activity, Moon } from 'lucide-react';

export function ParentTrends() {
  return (
    <div className="page-wrap dashboard-page">
      <div className="welcome-row">
        <div>
          <span className="eyebrow">LONG-TERM WELLNESS</span>
          <h1>Safety Trends</h1>
          <p>Monitor fatigue, sleep, and recovery history over time.</p>
        </div>
      </div>

      <div className="dashboard-columns">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Sleep & Recovery Quality</h2>
              <p>Weekly average based on daily readiness checks</p>
            </div>
            <Moon size={24} className="text-cyan" />
          </div>
          
          <div className="simulated-chart">
            <div className="chart-bar" style={{height: '85%'}}><span>Mon</span></div>
            <div className="chart-bar" style={{height: '75%'}}><span>Tue</span></div>
            <div className="chart-bar" style={{height: '60%', background: 'var(--orange)'}}><span>Wed</span></div>
            <div className="chart-bar" style={{height: '90%'}}><span>Thu</span></div>
            <div className="chart-bar" style={{height: '80%'}}><span>Fri</span></div>
          </div>
          <div className="chart-legend mt-4">
            <p className="text-sm text-muted">A dip in sleep quality was recorded on Wednesday, resulting in a moderate fatigue alert during practice. Recovery has since normalized.</p>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Overall Readiness</h2>
              <p>Current score</p>
            </div>
            <Activity size={24} className="text-green" />
          </div>
          <div className="stat-card">
            <div className="stat-value text-green" style={{fontSize: '48px', fontWeight: 'bold'}}>88%</div>
            <div className="stat-trend positive" style={{marginTop: '10px'}}><TrendingUp size={16}/> Optimal Range</div>
          </div>
        </section>
      </div>
    </div>
  );
}
