/*
  # Initial Immigration Application Schema

  1. New Tables
    - profiles
      - User profile information and preferences
    - immigration_programs
      - Available immigration programs
    - applications
      - User immigration applications
    - documents
      - User uploaded documents
    - tasks
      - Immigration process tasks
    - progress_updates
      - Application progress tracking

  2. Security
    - Enable RLS on all tables
    - Set up policies for user data access
    - Ensure data isolation between users

  3. Changes
    - Initial schema creation
    - Basic data structure for immigration tracking
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  date_of_birth date,
  nationality text,
  current_country text,
  in_canada boolean DEFAULT false,
  marital_status text,
  spouse_canadian boolean DEFAULT false,
  children_count integer DEFAULT 0,
  education_level text,
  studied_in_canada boolean DEFAULT false,
  canadian_institution text,
  study_duration text,
  years_experience text,
  currently_employed boolean DEFAULT false,
  job_title text,
  noc_code text,
  has_job_offer boolean DEFAULT false,
  language_test text,
  test_type text,
  language_scores jsonb,
  primary_goal text,
  timeline text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Immigration Programs table
CREATE TABLE IF NOT EXISTS immigration_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  description text,
  requirements jsonb,
  estimated_timeframe text,
  difficulty integer,
  processing_time text,
  fees jsonb,
  benefits text[],
  created_at timestamptz DEFAULT now()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id),
  program_id uuid REFERENCES immigration_programs(id),
  status text NOT NULL DEFAULT 'draft',
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id),
  application_id uuid REFERENCES applications(id),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  file_path text,
  upload_date timestamptz DEFAULT now(),
  verification_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id),
  application_id uuid REFERENCES applications(id),
  title text NOT NULL,
  description text,
  due_date timestamptz,
  priority text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'pending',
  category text NOT NULL,
  checklist jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Progress Updates table
CREATE TABLE IF NOT EXISTS progress_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id),
  application_id uuid REFERENCES applications(id),
  title text NOT NULL,
  description text,
  type text NOT NULL,
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE immigration_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_updates ENABLE ROW LEVEL SECURITY;

-- Policies
-- Profiles: Users can only read/write their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Immigration Programs: Anyone can view, only admins can modify
CREATE POLICY "Anyone can view programs"
  ON immigration_programs FOR SELECT
  TO authenticated
  USING (true);

-- Applications: Users can only access their own applications
CREATE POLICY "Users can view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert own applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Documents: Users can only access their own documents
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert own documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Tasks: Users can only access their own tasks
CREATE POLICY "Users can view own tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert own tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Progress Updates: Users can only access their own progress
CREATE POLICY "Users can view own progress"
  ON progress_updates FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert own progress"
  ON progress_updates FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());