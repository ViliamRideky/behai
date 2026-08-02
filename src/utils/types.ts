import type {
  goalOptions,
  experienceOptions,
  weeklyFrequencyOptions,
  injuryHistoryOptions,
} from "./options";

export type Goal = (typeof goalOptions)[number]["value"];
export type Experience = (typeof experienceOptions)[number]["value"];
export type WeeklyFrequency = (typeof weeklyFrequencyOptions)[number]["value"];
export type InjuryHistory = (typeof injuryHistoryOptions)[number]["value"];

export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface UserProfile {
  userId: User["id"];
  goal: Goal;
  experience: Experience;
  frequency: WeeklyFrequency;
  injuries?: InjuryHistory;
  injuryDetails?: string;
}
