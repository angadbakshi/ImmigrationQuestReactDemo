/*
  # Update Immigration Programs RLS Policy

  1. Changes
    - Add policy to allow inserting programs for authenticated users
    - Add policy to allow updating programs for authenticated users
    - Keep existing policy for viewing programs

  2. Security
    - Maintains read access for all authenticated users
    - Allows program management for authenticated users
    - Preserves existing security model
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can view programs" ON immigration_programs;

-- Create new policies
CREATE POLICY "Anyone can view programs"
  ON immigration_programs FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert programs"
  ON immigration_programs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update programs"
  ON immigration_programs FOR UPDATE
  USING (auth.role() = 'authenticated');