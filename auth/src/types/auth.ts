import {Session} from "@supabase/supabase-js";

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  photoUrl?: string;
  onboardingCompleted: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
}

export interface SignUpResponse {
  data: {
    user: User | null;
    session: Session | null;
  };
  error: Error | null;
}

// Add proper typing for the Supabase user
export interface SupabaseUser {
  id: string;
  email?: string;
  user_metadata: {
    full_name?: string;
    role?: string;
  };
  // Add other Supabase user properties as needed
}