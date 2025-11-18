import { User } from '../types/auth';

export const mockUsers: Record<string, User> = {
  'user@example.com': {
    id: '1',
    email: 'user@example.com',
    name: 'John Smith',
    role: 'user',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  },
  'admin@example.com': {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'
  }
};