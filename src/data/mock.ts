import type { Athlete } from '../types';

export const initialAthletes: Athlete[] = [
  { id: 1, name: 'Rohan Mehta', initials: 'RM', age: 17, sport: 'Football', position: 'Winger', batch: 'Elite U-18', activity: 'Sprint Drill', risk: 'red', riskScore: 91, activeTime: '43:18', restTime: '04:10', hydration: '22m ago', intensity: 'Very High', alert: 'Rapid fatigue rise + dizziness reported', issueRaised: true, recovery: 42, fatigue: 87, sleep: 5.5, readiness: 51, avatarTone: 'tone-red' },
  { id: 2, name: 'Aarav Singh', initials: 'AS', age: 16, sport: 'Football', position: 'Midfielder', batch: 'Elite U-18', activity: 'Training', risk: 'orange', riskScore: 72, activeTime: '39:42', restTime: '03:00', hydration: '28m ago', intensity: 'High', alert: 'Hydration threshold exceeded', issueRaised: true, recovery: 63, fatigue: 68, sleep: 6.5, readiness: 68, avatarTone: 'tone-orange' },
  { id: 3, name: 'Kabir Sharma', initials: 'KS', age: 18, sport: 'Football', position: 'Defender', batch: 'Elite U-18', activity: 'Hydrating', risk: 'yellow', riskScore: 48, activeTime: '35:26', restTime: '05:14', hydration: 'Now', intensity: 'Moderate', latestAction: 'Hydration break · 1m ago', recovery: 75, fatigue: 48, sleep: 7.5, readiness: 78, avatarTone: 'tone-yellow' },
  { id: 4, name: 'Vihaan Kapoor', initials: 'VK', age: 17, sport: 'Football', position: 'Goalkeeper', batch: 'Elite U-18', activity: 'Training', risk: 'green', riskScore: 23, activeTime: '44:02', restTime: '02:40', hydration: '15m ago', intensity: 'High', recovery: 88, fatigue: 29, sleep: 8, readiness: 91, avatarTone: 'tone-green' },
  { id: 5, name: 'Aditya Nair', initials: 'AN', age: 16, sport: 'Football', position: 'Striker', batch: 'Elite U-18', activity: 'Resting', risk: 'orange', riskScore: 69, activeTime: '31:11', restTime: '08:25', hydration: '11m ago', intensity: 'Reduced', alert: 'Heat load above personal baseline', issueRaised: true, latestAction: 'Give Rest · 3m ago', recovery: 58, fatigue: 71, sleep: 6, readiness: 62, avatarTone: 'tone-orange' },
  { id: 6, name: 'Arjun Rao', initials: 'AR', age: 17, sport: 'Football', position: 'Full Back', batch: 'Elite U-18', activity: 'Reduced Intensity', risk: 'yellow', riskScore: 44, activeTime: '38:57', restTime: '04:22', hydration: '18m ago', intensity: 'Moderate', latestAction: 'Intensity reduced · 5m ago', recovery: 72, fatigue: 51, sleep: 7, readiness: 76, avatarTone: 'tone-blue' },
];

export const insights = [
  { title: 'Fatigue is rising faster than usual', athlete: 'Rohan Mehta', detail: 'Fatigue increased 31% faster than his personal baseline during the last 14 minutes.', risk: 'Critical', action: 'Give immediate rest and assess symptoms.' },
  { title: 'Earlier hydration recommended', athlete: 'Aarav Singh', detail: 'High heat and active duration have exceeded his personalised hydration threshold.', risk: 'Action required', action: 'Start hydration break now.' },
  { title: 'Recovery response is improving', athlete: 'Kabir Sharma', detail: 'Heart-rate recovery proxy and coach observations improved across the last 3 sessions.', risk: 'Positive', action: 'Continue current work-rest pattern.' },
];
