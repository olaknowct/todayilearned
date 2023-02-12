import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ugxzdkbxclwbuqvbmobw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpka2J4Y2x3YnVxdmJtb2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYwODM1NzMsImV4cCI6MTk5MTY1OTU3M30.FoqK3lJopqmLeFCYzKjoRNw-GzfvqOYbP8L8vZkzbck';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
