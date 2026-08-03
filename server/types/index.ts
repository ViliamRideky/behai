export interface UserProfile {
  userId: string;
  goal: string;
  experience: string;
  frequency: string;
  injuries?: string | null;
  injuryDetails?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanOverview {
  totalWeeks: number;
  goal: string;
  raceDate?: string;
}

export interface DaySchedule {
  day: string;
  workoutType: string;
  distanceKm?: number;
  description: string;
}

export interface TrainingPlanContent {
  overview: PlanOverview;
  weeklySchedule: DaySchedule[];
  progression: string;
}

// Toto reprezentuje CELY DB riadok, s obsahom už rozbaleným pre pohodlné použitie v appke
export interface TrainingPlan extends TrainingPlanContent {
  id: string;
  userId: string;
  version: number;
  createdAt: string;
}
