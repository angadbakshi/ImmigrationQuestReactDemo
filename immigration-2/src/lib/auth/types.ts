import { User } from "../../../../admin/auth/src/types/auth";

export interface Profile {
  id: string;
  full_name: string;
  role: 'user' | 'admin';
  created_at?: string;
  updated_at?: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface SessionState {
  user: User | null;
  loading: boolean;
  error: string | null;
}