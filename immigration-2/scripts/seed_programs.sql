-- File: ./scripts/seed_programs.sql

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
   '{"application": 1050, "processing": 550}'::jsonb);

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
   (SELECT id FROM immigration_programs WHERE type = 'family' LIMIT 1));