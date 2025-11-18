import {ImmigrationProgram} from "./programs";
import {User} from "../../../auth/src/types/auth";

export interface UserProfile extends User {
  photoUrl?: string;
  countryOfOrigin: string;
  destinationCountry: string;
  immigrationProgram: ImmigrationProgram;
  goals: string[];
  currentProgress: number;
  level: number;
  points: number;
  onboardingCompleted: boolean;
  role: 'user'|'admin';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateEarned: Date;
}

export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: 'identification' | 'education' | 'financial' | 'employment' | 'other';
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  deadline?: Date;
}