import { UserProfile } from '../types';
import { mockImmigrationPrograms } from './mockImmigrationPrograms';

export const mockUserProfile: UserProfile = {
  onboardingCompleted: false,
  role: 'user',
  id: '1',
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  countryOfOrigin: 'China',
  destinationCountry: 'Canada',
  immigrationProgram: mockImmigrationPrograms[0],
  goals: [
    'Obtain permanent residency',
    'Secure employment in tech sector',
    'Complete language certification',
  ],
  level: 3,
  points: 450,
  currentProgress: 65
};