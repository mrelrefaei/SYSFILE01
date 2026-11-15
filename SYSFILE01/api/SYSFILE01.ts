import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://esthpbyuiirdpjbrouzo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GZKGksA66Ceiq3XMsoD_JQ_gnfURS-a';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);