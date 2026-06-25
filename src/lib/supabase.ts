import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

// Provide dummy URL and key if missing to avoid throwing an error immediately, 
// allowing the app to run in mock mode.
export const supabase = createClient(
  supabaseUrl || 'https://mock.supabase.co',
  supabaseAnonKey || 'mock-anon-key'
);
