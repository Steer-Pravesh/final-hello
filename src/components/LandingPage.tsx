import { ShieldCheck, Activity, Zap, ArrowRight, Play, Server, ServerOff } from 'lucide-react';
import { hasSupabaseConfig } from '../lib/supabase';

interface LandingPageProps {
  onLoginClick: () => void;
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <div className="landing-wrapper">
      <header className="landing-header">
        <div className="brand">
          <div className="brand-mark">
            <ShieldCheck size={24} />
          </div>
          <div>
            <strong>HelioSense</strong>
            <span>LIVE SAFETY INTELLIGENCE</span>
          </div>
        </div>
        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#teams">For Teams</a>
        </nav>
        <div className="landing-actions">
          {hasSupabaseConfig ? (
            <div className="db-status connected" title="Connected to Supabase">
              <Server size={14} /> <span>Live DB</span>
            </div>
          ) : (
            <div className="db-status mock" title="Running in Mock Mode">
              <ServerOff size={14} /> <span>Mock Mode</span>
            </div>
          )}
          <button className="login-btn" onClick={onLoginClick}>
            Sign In
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span className="eyebrow pulse"><Zap size={14} /> REAL-TIME ATHLETIC INTELLIGENCE</span>
            <h1>Protect Your Athletes.<br />Optimize Performance.</h1>
            <p className="hero-subtitle">
              HelioSense delivers real-time heat load monitoring, fatigue alerts, and 
              hydration intelligence to elite academies, keeping every player safe 
              during high-intensity sessions.
            </p>
            <div className="hero-ctas">
              <button className="primary-action large" onClick={onLoginClick}>
                Launch Demo Dashboard <ArrowRight size={18} />
              </button>
              <button className="secondary-action large" onClick={onLoginClick}>
                <Play size={18} fill="currentColor" /> See How It Works
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="simulated-widget widget-1">
              <div className="widget-head">
                <Activity size={16} /> <span>Live Heat Load</span>
              </div>
              <div className="widget-value">38°C</div>
              <div className="widget-sub warning">Reduced intensity recommended</div>
            </div>
            <div className="simulated-widget widget-2">
              <div className="widget-head">
                <ShieldCheck size={16} /> <span>Team Status</span>
              </div>
              <div className="widget-value">24 Safe</div>
              <div className="widget-sub">2 require hydration</div>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="section-title">
            <h2>Built for the Modern Academy</h2>
            <p>Everything you need to monitor, manage, and report on athletic safety.</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><Activity /></div>
              <h3>Real-Time Monitoring</h3>
              <p>Track live fatigue, hydration, and active time across multiple batches instantly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Zap /></div>
              <h3>AI Fatigue Alerts</h3>
              <p>Proactive AI models detect early signs of heat stress and fatigue before they escalate.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck /></div>
              <h3>Academy Command</h3>
              <p>A unified owner dashboard gives complete visibility into safety compliance across all coaches.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="brand">
          <div className="brand-mark small">
            <ShieldCheck size={16} />
          </div>
          <div>
            <strong>HelioSense</strong>
          </div>
        </div>
        <p>&copy; {new Date().getFullYear()} HelioSense Sports Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}
