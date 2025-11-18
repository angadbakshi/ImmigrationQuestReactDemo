/*
  # Update profiles table with role column and policies
  
  1. Changes
    - Add role column to profiles table
    - Update RLS policies for role-based access
    
  2. Security
    - Ensure proper role validation
    - Update access policies for admin and user roles
*/

-- Add role column with default value if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role text NOT NULL DEFAULT 'user';
  END IF;
END $$;

-- Add check constraint if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE constraint_name = 'valid_role'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT valid_role CHECK (role IN ('user', 'admin'));
  END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create new policies
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id 
    OR auth.jwt() ->> 'role' = 'admin'
  );