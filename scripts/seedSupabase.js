// Forward to syncSheetToSupabase.js
import { syncSheetToSupabase } from './syncSheetToSupabase.js';

console.log('Running sync from Google Sheet to Supabase...');
syncSheetToSupabase()
  .then(() => console.log('Done!'))
  .catch(console.error);

