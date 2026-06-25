import { Download, BarChart3, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { useState } from 'react';

export function ReportsPage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
    }, 2000);
  };

  return (
    <div className="page-wrap dashboard-page">
      <div className="welcome-row">
        <div>
          <span className="eyebrow">ACADEMY ANALYTICS</span>
          <h1>Safety Reports</h1>
          <p>Historical trends and compliance metrics for all batches.</p>
        </div>
        <button className="primary-action" onClick={handleDownload} disabled={downloading}>
          <Download size={16} /> {downloading ? 'Generating PDF...' : 'Export Report'}
        </button>
      </div>

      <div className="dashboard-columns">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Weekly Fatigue Trend</h2>
              <p>Average reported fatigue vs workload</p>
            </div>
            <BarChart3 size={20} className="text-cyan" />
          </div>
          
          <div className="simulated-chart">
            <div className="chart-bar" style={{height: '60%'}}><span>Mon</span></div>
            <div className="chart-bar" style={{height: '45%'}}><span>Tue</span></div>
            <div className="chart-bar" style={{height: '80%', background: 'var(--orange)'}}><span>Wed</span></div>
            <div className="chart-bar" style={{height: '50%'}}><span>Thu</span></div>
            <div className="chart-bar" style={{height: '75%'}}><span>Fri</span></div>
          </div>
          <div className="chart-legend">
            <span><i style={{background: 'var(--cyan)'}}></i> Normal Load</span>
            <span><i style={{background: 'var(--orange)'}}></i> High Load Alert</span>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Hydration Compliance</h2>
              <p>Percentage of recommended breaks taken</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-value">94%</div>
            <div className="stat-trend positive"><TrendingUp size={16}/> +2% from last week</div>
          </div>
          <div className="checklist-box mt-4">
            <p className="text-sm text-muted">Overall compliance is excellent. Mid-week sessions showed minor delays in hydration intervals during tactical drills.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
