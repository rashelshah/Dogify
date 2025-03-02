import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// In a real app, these would be environment variables
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);