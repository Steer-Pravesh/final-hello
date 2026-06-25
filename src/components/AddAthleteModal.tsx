import { useState } from 'react';
import { X } from 'lucide-react';
import type { Athlete } from '../types';

interface AddAthleteModalProps {
  onClose: () => void;
  onAdd: (athlete: Athlete) => void;
}

export function AddAthleteModal({ onClose, onAdd }: AddAthleteModalProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [position, setPosition] = useState('');
  const [batch, setBatch] = useState('Elite U-18');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !position) return;

    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    const newAthlete: Athlete = {
      id: Date.now(),
      name,
      initials,
      age: parseInt(age, 10),
      sport: 'Football',
      position,
      batch,
      activity: 'Not in Session',
      risk: 'green',
      riskScore: 0,
      activeTime: '00:00',
      restTime: '00:00',
      hydration: 'N/A',
      intensity: 'Low',
      recovery: 100,
      fatigue: 0,
      sleep: 8,
      readiness: 100,
      avatarTone: 'tone-blue'
    };

    onAdd(newAthlete);
    onClose();
  };

  return (
    <div className="modal-layer">
      <button className="modal-backdrop" onClick={onClose} />
      <div className="insight-modal" style={{width: 'min(500px, calc(100% - 30px))'}}>
        <button className="close-floating" onClick={onClose}><X /></button>
        <h2>Add Athlete</h2>
        <p className="lead" style={{marginBottom: '20px'}}>Register a new athlete for live monitoring.</p>
        
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <div>
            <label style={{display: 'block', fontSize: '12px', marginBottom: '5px', color: 'var(--muted)'}}>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.5)', color: 'var(--text)'}} />
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            <div>
              <label style={{display: 'block', fontSize: '12px', marginBottom: '5px', color: 'var(--muted)'}}>Age</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} required min="10" max="40" style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.5)', color: 'var(--text)'}} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '12px', marginBottom: '5px', color: 'var(--muted)'}}>Position</label>
              <input type="text" value={position} onChange={e => setPosition(e.target.value)} required placeholder="e.g. Midfielder" style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.5)', color: 'var(--text)'}} />
            </div>
          </div>
          <div>
            <label style={{display: 'block', fontSize: '12px', marginBottom: '5px', color: 'var(--muted)'}}>Batch Assignment</label>
            <select value={batch} onChange={e => setBatch(e.target.value)} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.5)', color: 'var(--text)'}}>
              <option value="Elite U-18">Elite U-18</option>
              <option value="Pro Reserves">Pro Reserves</option>
              <option value="U-16 Academy">U-16 Academy</option>
            </select>
          </div>
          
          <div className="modal-actions" style={{marginTop: '25px'}}>
            <button type="button" onClick={onClose} style={{background: 'transparent'}}>Cancel</button>
            <button type="submit" className="primary-action" style={{border: 'none'}}>Register Athlete</button>
          </div>
        </form>
      </div>
    </div>
  );
}
