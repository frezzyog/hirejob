
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uqpammfgbrrhwzzsbbdk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxcGFtbWZnYnJyaHd6enNiYmRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyMTA0NjUsImV4cCI6MjA4MTc4NjQ2NX0.JruGzrFG0QjPrE5by9ENwgTikZZ25tV7bg6ytTvhYBo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
