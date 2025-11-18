-- File: ./scripts/seed_data.sql

-- Insert immigration programs
INSERT INTO immigration_programs (id, name, type, description, requirements, processing_time, difficulty, estimated_timeframe, fees)
VALUES
  -- Federal Skilled Worker
  (uuid_generate_v4(), 'Federal Skilled Worker', 'work', 'For skilled workers with foreign work experience',
   '[
     "Work experience in NOC 0, A, or B",
     "Language ability (CLB 7)",
     "Education credential assessment"
   ]'::jsonb,
   '6-8 months', 2, '6-12 months',
   '{"application": 850, "processing": 515}'::jsonb),

  -- Study Permit
  (uuid_generate_v4(), 'Study Permit', 'study', 'For international students',
   '[
     "Acceptance from DLI",
     "Proof of financial support",
     "Medical exam"
   ]'::jsonb,
   '3-4 months', 1, '4-6 months',
   '{"application": 150, "processing": 85}'::jsonb),

  -- Spousal Sponsorship
  (uuid_generate_v4(), 'Spousal Sponsorship', 'family', 'For Canadian citizens/PR sponsoring spouse',
   '[
     "Proof of relationship",
     "Financial requirements",
     "Police certificates"
   ]'::jsonb,
   '12 months', 2, '12-16 months',
   '{"application": 1050, "processing": 550}'::jsonb),

  -- Start-up Visa
  (uuid_generate_v4(), 'Start-up Visa', 'business', 'For entrepreneurs starting business in Canada',
   '[
     "Support from designated organization",
     "Language ability (CLB 5)",
     "Sufficient funds"
   ]'::jsonb,
   '12-16 months', 3, '18-24 months',
   '{"application": 2075, "processing": 825}'::jsonb);

-- Insert sample profiles
INSERT INTO profiles (
    id,
    full_name,
    date_of_birth,
    nationality,
    current_country,
    in_canada,
    marital_status,
    spouse_canadian,
    children_count,
    education_level,
    studied_in_canada,
    years_experience,
    currently_employed,
    job_title,
    has_job_offer,
    language_test,
    language_scores,
    primary_goal,
    timeline,
    role,
    onboarding_completed,
    destination_country,
    goals
)
VALUES
  -- Student profile
  (
    uuid_generate_v4(),
    'Sarah Chen',
    '2000-01-15',
    'CN',
    'CN',
    false,
    'single',
    false,
    0,
    'bachelors',
    false,
    'less1',
    false,
    null,
    false,
    'ielts',
    '{"listening": "7.5", "speaking": "7.0", "reading": "7.0", "writing": "6.5"}'::jsonb,
    'study',
    '6-12',
    'user',
    true,
    'Canada',
    '["Complete studies", "Gain Canadian experience", "Apply for PR"]'::jsonb
  ),

  -- Skilled worker profile
  (
    uuid_generate_v4(),
    'Raj Patel',
    '1990-03-20',
    'IN',
    'AE',
    false,
    'married',
    false,
    1,
    'masters',
    false,
    '5+',
    true,
    'Software Engineer',
    true,
    'ielts',
    '{"listening": "8.0", "speaking": "7.5", "reading": "8.0", "writing": "7.0"}'::jsonb,
    'work',
    '3-6',
    'user',
    true,
    'Canada',
    '["Secure job offer", "Relocate family", "Obtain PR"]'::jsonb
  ),

  -- Family sponsorship profile
  (
    uuid_generate_v4(),
    'Maria Garcia',
    '1995-07-10',
    'MX',
    'MX',
    false,
    'married',
    true,
    0,
    'bachelors',
    false,
    '3-5',
    true,
    'Marketing Manager',
    false,
    'celpip',
    '{"listening": "9", "speaking": "8", "reading": "9", "writing": "8"}'::jsonb,
    'family',
    'immediate',
    'user',
    true,
    'Canada',
    '["Join spouse in Canada", "Find employment", "Start family"]'::jsonb
  );

-- Insert quests
INSERT INTO quests (id, title, description, points, difficulty, program_id)
VALUES
  -- Study permit quests
  (uuid_generate_v4(), 'Complete Language Test', 'Take and submit IELTS or TOEFL test results', 100, 2,
   (SELECT id FROM immigration_programs WHERE type = 'study' LIMIT 1)),

  -- Skilled worker quests
  (uuid_generate_v4(), 'Education Assessment', 'Complete WES evaluation for your education', 150, 2,
   (SELECT id FROM immigration_programs WHERE type = 'work' LIMIT 1)),

  -- Family sponsorship quests
  (uuid_generate_v4(), 'Relationship Documents', 'Gather and organize relationship evidence', 75, 1,
   (SELECT id FROM immigration_programs WHERE type = 'family' LIMIT 1)),

  -- Start-up visa quests
  (uuid_generate_v4(), 'Business Plan', 'Prepare comprehensive business plan', 200, 3,
   (SELECT id FROM immigration_programs WHERE type = 'business' LIMIT 1));

-- Assign programs to users (using selected_program_id in profiles)
UPDATE profiles
SET selected_program_id = (
  CASE
    WHEN primary_goal = 'study' THEN (SELECT id FROM immigration_programs WHERE type = 'study' LIMIT 1)
    WHEN primary_goal = 'work' THEN (SELECT id FROM immigration_programs WHERE type = 'work' LIMIT 1)
    WHEN primary_goal = 'family' THEN (SELECT id FROM immigration_programs WHERE type = 'family' LIMIT 1)
    ELSE (SELECT id FROM immigration_programs WHERE type = 'work' LIMIT 1)
  END
)
WHERE role = 'user';

-- Insert user quests
INSERT INTO user_quests (id, user_id, quest_id, completed, completed_at)
SELECT
  uuid_generate_v4(),
  p.id,
  q.id,
  false,
  NULL
FROM profiles p
CROSS JOIN quests q
WHERE p.role = 'user'
  AND q.program_id = p.selected_program_id
LIMIT 10;