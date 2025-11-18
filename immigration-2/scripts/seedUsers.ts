import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const testUsers = [
  {
    email: 'admin@immigrationquest.com',
    password: 'Admin@123!',
    fullName: 'Admin User',
    role: 'admin',
    onboarding_completed: true
  },
  {
    email: 'sarah.chen@example.com',
    password: 'Password123!',
    fullName: 'Sarah Chen',
    role: 'user',
    profile: {
      nationality: 'CN',
      current_country: 'CN',
      education_level: 'masters',
      years_experience: '3-5',
      job_title: 'Software Engineer',
      noc_code: '21231',
      has_job_offer: true,
      primary_goal: 'work'
    }
  },
  {
    email: 'raj.patel@example.com',
    password: 'Password123!',
    fullName: 'Raj Patel',
    role: 'user',
    profile: {
      nationality: 'IN',
      current_country: 'IN',
      marital_status: 'married',
      spouse_canadian: true,
      primary_goal: 'family'
    }
  },
  {
    email: 'john.smith@example.com',
    password: 'Password123!',
    fullName: 'John Smith',
    role: 'user',
    profile: {
      nationality: 'US',
      current_country: 'US',
      education_level: 'bachelors',
      years_experience: '5+',
      language_test: 'ielts',
      language_scores: {
        listening: '8.0',
        speaking: '7.5',
        reading: '7.5',
        writing: '7.0'
      },
      primary_goal: 'pr'
    }
  }
];

async function seedUsers() {
  console.log('Starting user seeding...');

  for (const user of testUsers) {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('full_name', user.fullName)
        .single();

      if (existingUser) {
        console.log(`User ${user.email} already exists, skipping...`);
        continue;
      }

      // Create auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            full_name: user.fullName,
            role: user.role
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error(`Failed to create user ${user.email}`);

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          full_name: user.fullName,
          role: user.role,
          ...user.profile
        }]);

      if (profileError) throw profileError;

      console.log(`Successfully created user: ${user.email}`);
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error);
    }
  }

  console.log('User seeding completed!');
}

seedUsers();