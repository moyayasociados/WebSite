import { redirect } from 'next/navigation';
import { createClient } from '@/shared/lib/supabase/server';
export async function getCurrentAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: admin } = await supabase.from('admin_users').select('user_id, display_name').eq('user_id', user.id).maybeSingle();
  return admin ? { user, admin } : null;
}
export async function requireAdmin() {
  const result = await getCurrentAdmin();
  if (!result) redirect('/portal/login');
  return result;
}
