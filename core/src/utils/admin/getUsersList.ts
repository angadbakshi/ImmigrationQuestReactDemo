import { supabase } from '../../services/supabase/supabase';

export async function getUsersList() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      role,
      created_at
    `)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

  return profiles;
}