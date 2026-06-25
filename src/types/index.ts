export type Risk = 'green' | 'yellow' | 'orange' | 'red';
export type Role = 'coach' | 'owner' | 'parent';
export type Activity =
  | 'Training'
  | 'Warm-Up'
  | 'Sprint Drill'
  | 'Endurance Drill'
  | 'Skill Practice'
  | 'Match Simulation'
  | 'Resting'
  | 'Hydrating'
  | 'Reduced Intensity'
  | 'Paused'
  | 'Session Ended'
  | 'Medical Attention'
  | 'Not in Session';

export interface Athlete {
  id: number;
  name: string;
  initials: string;
  age: number;
  sport: string;
  position: string;
  batch: string;
  activity: Activity;
  risk: Risk;
  riskScore: number;
  activeTime: string;
  restTime: string;
  hydration: string;
  intensity: string;
  alert?: string;
  latestAction?: string;
  issueRaised?: boolean;
  recovery: number;
  fatigue: number;
  sleep: number;
  readiness: number;
  avatarTone: string;
}
