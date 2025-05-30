import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sthoxujpadacfsnwoaly.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0aG94dWpwYWRhY2ZzbndvYWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NzQ4ODYsImV4cCI6MjA2NDA1MDg4Nn0.lwOEksh3rz2NM_9ny30noNTzdE9Es1oN5sPEn3whrTA'

export const supabase = createClient(supabaseUrl, supabaseKey)
