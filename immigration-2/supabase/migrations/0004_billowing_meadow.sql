/*
  # Seed Test Users

  1. Users
    - Admin user for system management
    - Test users with different immigration pathways
    - Each user has appropriate profile data

  2. Security
    - Passwords are securely hashed
    - Proper role assignments
    - RLS policies respected
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to create users safely
CREATE OR REPLACE FUNCTION create_user_with_profile(
  p_email TEXT,
  p_password TEXT,
  p_full_name TEXT,
  p_role TEXT,
  p_profile jsonb DEFAULT '{}'::jsonb
) RETURNS uuid AS $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Create auth user if doesn't exist
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data
  )
  SELECT
    uuid_generate_v4(),
    p_email,
    crypt(p_password, gen_salt('bf')),
    now(),
    jsonb_build_object('full_name', p_full_name, 'role', p_role)
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = p_email
  )
  RETURNING id INTO v_user_id;

  -- Get user id if user already exists
  IF v_user_id IS NULL THEN
    SELECT id INTO v_user_id FROM auth.users WHERE email = p_email;
  END IF;

  -- Create or update profile
  INSERT INTO public.profiles (
    id,
    full_name,
    role,
    nationality,
    current_country,
    education_level,
    years_experience,
    job_title,
    noc_code,
    has_job_offer,
    marital_status,
    spouse_canadian,
    language_test,
    language_scores,
    primary_goal
  )
  VALUES (
    v_user_id,
    p_full_name,
    p_role,
    p_profile->>'nationality',
    p_profile->>'current_country',
    p_profile->>'education_level',
    p_profile->>'years_experience',
    p_profile->>'job_title',
    p_profile->>'noc_code',
    (p_profile->>'has_job_offer')::boolean,
    p_profile->>'marital_status',
    (p_profile->>'spouse_canadian')::boolean,
    p_profile->>'language_test',
    p_profile->'language_scores',
    p_profile->>'primary_goal'
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    nationality = EXCLUDED.nationality,
    current_country = EXCLUDED.current_country,
    education_level = EXCLUDED.education_level,
    years_experience = EXCLUDED.years_experience,
    job_title = EXCLUDED.job_title,
    noc_code = EXCLUDED.noc_code,
    has_job_offer = EXCLUDED.has_job_offer,
    marital_status = EXCLUDED.marital_status,
    spouse_canadian = EXCLUDED.spouse_canadian,
    language_test = EXCLUDED.language_test,
    language_scores = EXCLUDED.language_scores,
    primary_goal = EXCLUDED.primary_goal;

  RETURN v_user_id;
END;
$$ LANGUAGE plpgsql;

-- Create Admin User
SELECT create_user_with_profile(
  'admin@immigrationquest.com',
  'Admin@123!',
  'Admin User',
  'admin'
);

-- Create Sarah Chen (Skilled Worker)
SELECT create_user_with_profile(
  'sarah.chen@example.com',
  'Password123!',
  'Sarah Chen',
  'user',
  '{
    "nationality": "CN",
    "current_country": "CN",
    "education_level": "masters",
    "years_experience": "3-5",
    "job_title": "Software Engineer",
    "noc_code": "21231",
    "has_job_offer": true,
    "primary_goal": "work"
  }'::jsonb
);

-- Create Raj Patel (Family Sponsorship)
SELECT create_user_with_profile(
  'raj.patel@example.com',
  'Password123!',
  'Raj Patel',
  'user',
  '{
    "nationality": "IN",
    "current_country": "IN",
    "marital_status": "married",
    "spouse_canadian": true,
    "primary_goal": "family"
  }'::jsonb
);

-- Create John Smith (Express Entry)
SELECT create_user_with_profile(
  'john.smith@example.com',
  'Password123!',
  'John Smith',
  'user',
  '{
    "nationality": "US",
    "current_country": "US",
    "education_level": "bachelors",
    "years_experience": "5+",
    "language_test": "ielts",
    "language_scores": {
      "listening": "8.0",
      "speaking": "7.5",
      "reading": "7.5",
      "writing": "7.0"
    },
    "primary_goal": "pr"
  }'::jsonb
);

-- Drop the function after use
DROP FUNCTION create_user_with_profile;