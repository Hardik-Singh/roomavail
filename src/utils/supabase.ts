import { createClient } from '@supabase/supabase-js';

// ✅ Vite auto-populates import.meta.env if .env is configured correctly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    '❌ Supabase environment variables are missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined in .env and start with VITE_'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);