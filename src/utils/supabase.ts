import { createClient } from '@supabase/supabase-js';

// Inline fallback if vite-env.d.ts isn't being picked up
interface ImportMetaEnvFix {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMetaFix {
  readonly env: ImportMetaEnvFix;
}

const meta = import.meta as unknown as ImportMetaFix;

const supabaseUrl = meta.env.VITE_SUPABASE_URL;
const supabaseKey = meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);