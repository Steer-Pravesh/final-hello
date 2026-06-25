import { UserRound, MessageSquare, AlertCircle } from 'lucide-react';

export function CoachesPage() {
  const coaches = [
    { id: 1, name: 'Arjun Khanna', batch: 'Elite U-18', athletes: 24, score: 98, status: 'Active Session' },
    { id: 2, name: 'Vikram Malhotra', batch: 'Pro Reserves', athletes: 18, score: 92, status: 'Active Session' },
    { id: 3, name: 'Priya Sen', batch: 'U-16 Academy', athletes: 22, score: 99, status: 'Offline' },
  ];

  const handleMessage = (name: string) => {
    alert(`Mock: Sending direct safety alert to ${name}`);
  };

  return (
    <div className="page-wrap dashboard-page">
      <div className="welcome-row">
        <div>
          <span className="eyebrow">ACADEMY STAFF</span>
          <h1>Coaches Directory</h1>
          <p>Monitor coach activity and safety compliance scores.</p>
        </div>
      </div>

      <div className="dashboard-columns">
        <section className="panel" style={{gridColumn: '1 / -1'}}>
          <div className="owner-table">
            <div className="table-head" style={{gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr'}}>
              <span>Coach Name</span>
              <span>Active Batch</span>
              <span>Athletes</span>
              <span>Status</span>
              <span>Safety Score</span>
              <span>Actions</span>
            </div>
            
            {coaches.map(coach => (
              <div key={coach.id} className="table-row" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', alignItems: 'center', padding: '12px 10px', borderTop: '1px solid var(--line)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <div className="avatar tone-blue"><UserRound size={16} /></div>
                  <strong>{coach.name}</strong>
                </div>
                <span>{coach.batch}</span>
                <span>{coach.athletes}</span>
                <span>
                  <span className={`live-badge ${coach.status === 'Offline' ? 'offline' : ''}`} style={{display: 'inline-flex', padding: '4px 8px', background: coach.status === 'Offline' ? 'rgba(150,150,150,0.1)' : 'rgba(46,230,200,.1)', color: coach.status === 'Offline' ? '#888' : '#33A4A9', borderRadius: '4px'}}>
                    {coach.status}
                  </span>
                </span>
                <strong>{coach.score}%</strong>
                <button className="secondary-action" onClick={() => handleMessage(coach.name)} style={{padding: '6px 12px', fontSize: '12px'}}>
                  <MessageSquare size={14} style={{marginRight: '6px', display: 'inline'}} /> Alert
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
