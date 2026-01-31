import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('🔍 Supabase Configuration:');
console.log('  URL:', supabaseUrl || '❌ MISSING');
console.log('  Key:', supabaseAnonKey ? `✅ ${supabaseAnonKey.substring(0, 20)}...` : '❌ MISSING');

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Missing Supabase credentials. Database features will not work.');
    console.warn('   Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env');
    console.warn('   You may need to restart the dev server after updating .env');
} else {
    console.log('✅ Supabase client initialized successfully');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
