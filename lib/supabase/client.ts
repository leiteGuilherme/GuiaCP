import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate that credentials are configured
const isConfigured =
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'your_supabase_project_url' &&
    supabaseAnonKey !== 'your_supabase_anon_key' &&
    supabaseUrl.startsWith('http');

if (!isConfigured) {
    console.error('⚠️ Supabase não está configurado!');
    console.error('Por favor, configure as variáveis de ambiente no arquivo .env.local:');
    console.error('- NEXT_PUBLIC_SUPABASE_URL');
    console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
    console.error('Veja o arquivo SUPABASE_SETUP.md para instruções completas.');
}

// Create client with fallback values to prevent errors during build
export const supabase = createClient(
    isConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
    isConfigured ? supabaseAnonKey : 'placeholder-key'
);

export const isSupabaseConfigured = isConfigured;
