-- Add permissions column to auth.users table
alter table auth.users
add column if not exists permissions text[];

-- Enable RLS if not already enabled
alter table auth.users enable row level security;

-- Create RLS policy for admin access to permissions
create policy "Admins can manage permissions"
  on auth.users for all
  using (auth.uid() in (select id from auth.users where permissions @> array['admin']::text[]))
  with check (auth.uid() in (select id from auth.users where permissions @> array['admin']::text[]));

-- Policy to allow users to view their own permissions
create policy "Users can view their own permissions"
  on auth.users for select
  using (auth.uid() = id);

-- Policy to allow users to update their own permissions if they have admin rights
create policy "Users can update their own permissions"
  on auth.users for update
  using (auth.uid() = id and permissions @> array['admin']::text[]);
