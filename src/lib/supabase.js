import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cfnpfphihqwauczgfwqx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_pYXsApaoD3YiI0XzjgSB4Q_Ztc4vv2p';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
