import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Conversion {
  id: string;
  filename: string;
  file_type: string;
  total_slides: number;
  output_format: string;
  created_at: string;
}
