import { useState } from 'react';
import { ShieldCheck, User, Users, Home, Loader2, ArrowLeft } from 'lucide-react';
import { supabase, hasSupabaseConfig } from '../lib/supabase';
import type { Role } from '../types';

interface LoginPageProps {
  onLoginSuccess: (role: Role) => void;
  onBack: () => void;
}

type Tab = 'signin' | 'signup';

export function LoginPage({ onLoginSuccess, onBack }: LoginPageProps) {
  const [tab, setTab] = useState<Tab>('signin');
  const [selectedRole, setSelectedRole] = useState<Role>('coach');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const roles = [
    { id: 'coach' as Role, label: 'Coach', icon: <User />, desc: 'Live session management' },
    { id: 'owner' as Role, label: 'Academy Owner', icon: <Users />, desc: 'Command center overview' },
    { id: 'parent' as Role, label: 'Parent', icon: <Home />, desc: 'Athlete safety reports' },
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (hasSupabaseConfig) {
        if (!email || !password) throw new Error('Please enter both email and password');

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;

        if (authData.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authData.user.id)
            .single();

          if (profileError) throw new Error('Profile not found. Contact your administrator.');
          if (profile?.role) {
            onLoginSuccess(profile.role as Role);
          }
        }
      } else {
        // Mock Mode
        setTimeout(() => onLoginSuccess(selectedRole), 600);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (!name || !email || !password) throw new Error('Please fill in all fields');
      if (password.length < 6) throw new Error('Password must be at least 6 characters');

      if (hasSupabaseConfig) {
        // Step 1: Create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) throw authError;

        if (authData.user) {
          // Step 2: Insert into profiles table with the selected role
          const { error: profileError } = await supabase.from('profiles').insert({
            id: authData.user.id,
            name,
            email,
            role: selectedRole,
            avatar_tone: 'tone-blue',
          });

          if (profileError) throw profileError;

          setSuccessMsg(`Account created! Check your email (${email}) to confirm, then sign in.`);
          setTab('signin');
        }
      } else {
        // Mock Mode: just login directly
        setTimeout(() => onLoginSuccess(selectedRole), 600);
      }
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--line)',
    background: 'rgba(255,255,255,0.6)',
    color: 'var(--text)',
    fontSize: '14px',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    color: 'var(--muted)',
    marginBottom: '5px',
    fontWeight: '500',
  };

  return (
    <div className="login-wrapper">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={18} /> Back to Home
      </button>

      <div className="login-container">
        <div className="login-header">
          <div className="brand-mark large" style={{ width: '64px', height: '64px', display: 'grid', placeItems: 'center', borderRadius: '18px', background: 'linear-gradient(135deg,#33A4A9,#D0EFF0)', color: '#103249', margin: '0 auto 15px' }}>
            <ShieldCheck size={32} />
          </div>
          <h2 style={{ margin: '0 0 5px', fontSize: '22px' }}>HelioSense</h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '13px' }}>Live Safety Intelligence Platform</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: 'rgba(30,61,89,0.08)', borderRadius: '10px', padding: '4px', marginBottom: '24px', gap: '4px' }}>
          <button
            type="button"
            onClick={() => { setTab('signin'); setError(''); setSuccessMsg(''); }}
            style={{ flex: 1, padding: '9px', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', background: tab === 'signin' ? 'white' : 'transparent', color: tab === 'signin' ? 'var(--teal)' : 'var(--muted)', boxShadow: tab === 'signin' ? 'var(--shadow)' : 'none' }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('signup'); setError(''); setSuccessMsg(''); }}
            style={{ flex: 1, padding: '9px', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', background: tab === 'signup' ? 'white' : 'transparent', color: tab === 'signup' ? 'var(--teal)' : 'var(--muted)', boxShadow: tab === 'signup' ? 'var(--shadow)' : 'none' }}
          >
            Create Account
          </button>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div style={{ background: 'rgba(40,167,69,0.1)', border: '1px solid var(--green)', padding: '12px', borderRadius: '8px', marginBottom: '16px', color: 'var(--green)', fontSize: '12px' }}>
            ✓ {successMsg}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{ background: 'rgba(229,57,53,0.1)', border: '1px solid var(--red)', padding: '12px', borderRadius: '8px', marginBottom: '16px', color: 'var(--red)', fontSize: '12px' }}>
            ✕ {error}
          </div>
        )}

        {/* SIGN IN FORM */}
        {tab === 'signin' && (
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {hasSupabaseConfig ? (
              <>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@academy.com" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} required />
                </div>
              </>
            ) : (
              <>
                <div className="mock-banner">
                  <strong>Mock Mode Active</strong>
                  <p>No database credentials found. Using local mock data.</p>
                </div>
                <div>
                  <p className="field-label">Select your mock role:</p>
                  <div className="role-cards">
                    {roles.map(r => (
                      <button key={r.id} type="button" className={`role-card ${selectedRole === r.id ? 'active' : ''}`} onClick={() => setSelectedRole(r.id)}>
                        <div className="role-icon">{r.icon}</div>
                        <div><strong>{r.label}</strong><span>{r.desc}</span></div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="primary-action full-width login-submit" disabled={loading} style={{ marginTop: '10px', justifyContent: 'center', border: 'none', padding: '14px' }}>
              {loading ? <Loader2 className="spinner" size={18} /> : 'Sign In to Dashboard'}
            </button>
          </form>
        )}

        {/* SIGN UP FORM */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Arjun Khanna" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@academy.com" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Your Role</label>
              <div className="role-cards" style={{ marginTop: '8px' }}>
                {roles.map(r => (
                  <button key={r.id} type="button" className={`role-card ${selectedRole === r.id ? 'active' : ''}`} onClick={() => setSelectedRole(r.id)}>
                    <div className="role-icon">{r.icon}</div>
                    <div><strong>{r.label}</strong><span>{r.desc}</span></div>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="primary-action full-width login-submit" disabled={loading} style={{ marginTop: '10px', justifyContent: 'center', border: 'none', padding: '14px' }}>
              {loading ? <Loader2 className="spinner" size={18} /> : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
