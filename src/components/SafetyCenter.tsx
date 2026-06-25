import { ShieldCheck, ThermometerSun, Wind, Droplets, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function SafetyCenter() {
  return (
    <div className="page-wrap dashboard-page">
      <div className="welcome-row">
        <div>
          <span className="eyebrow">ACADEMY SAFETY PROTOCOLS</span>
          <h1>Safety Center</h1>
          <p>Live environmental guidelines and emergency checklists.</p>
        </div>
      </div>
      
      <div className="dashboard-columns">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Current Environment Level</h2>
              <p>Based on live local sensors</p>
            </div>
            <ThermometerSun size={24} className="text-orange" />
          </div>
          
          <div className="environment-level orange-level">
            <strong>MODERATE-HIGH RISK (WBGT: 29.4°C)</strong>
            <p>Heat stress is elevated. Mandatory adjustments required for all active sessions.</p>
          </div>

          <div className="checklist-box">
            <h3>Required Adjustments</h3>
            <ul>
              <li><CheckCircle2 size={14} className="text-green" /> Increase hydration breaks to every 15 minutes</li>
              <li><CheckCircle2 size={14} className="text-green" /> Reduce high-intensity sprint duration by 20%</li>
              <li><AlertTriangle size={14} className="text-orange" /> Monitor athletes with prior heat-illness history closely</li>
            </ul>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Emergency Action Plan</h2>
              <p>Quick reference guide</p>
            </div>
            <ShieldCheck size={24} className="text-cyan" />
          </div>
          
          <div className="emergency-steps">
            <div className="step-card">
              <span className="step-num">1</span>
              <div>
                <strong>Assess Symptoms</strong>
                <p>Check for dizziness, nausea, confusion, or lack of sweating.</p>
              </div>
            </div>
            <div className="step-card">
              <span className="step-num">2</span>
              <div>
                <strong>Cool Immediately</strong>
                <p>Move to shade, apply ice towels to neck, groin, and armpits.</p>
              </div>
            </div>
            <div className="step-card">
              <span className="step-num">3</span>
              <div>
                <strong>Medical Escort</strong>
                <p>Do not let the athlete walk alone. Call EMS if symptoms worsen.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
