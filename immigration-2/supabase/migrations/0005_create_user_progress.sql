-- Create user_progress table (name this file something like 20240110_create_user_progress.sql)
create table if not exists public.user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  level integer default 1 not null,
  points integer default 0 not null,
  progress integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.user_progress enable row level security;

create policy "Users can view their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- Add trigger for updated_at
create trigger handle_updated_at before update on public.user_progress
  for each row execute function moddatetime (updated_at);