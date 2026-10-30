import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cfnpfphihqwauczgfwqx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_pYXsApaoD3YiI0XzjgSB4Q_Ztc4vv2p';
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzApwyDg0lxOkNqueBziylX4vJiIj4vMQkHMrA6Egr7PGKM7daErIhBe4D15u4EP6Qn/exec';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function parseDateForDb(dStr) {
  if (!dStr) return null;
  // If ISO string like 2025-12-15T18:30:00.000Z
  if (typeof dStr === 'string' && dStr.includes('T')) {
    const d = new Date(dStr);
    if (!isNaN(d.getTime())) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }

  // Handle DD-MM-YYYY or YYYY-MM-DD (safely handle day 00 or missing day)
  const parts = String(dStr).split(/[-/]/);
  if (parts.length === 3) {
    let y, m, d;
    if (parts[0].length === 4) {
      y = parseInt(parts[0], 10);
      m = parseInt(parts[1], 10);
      d = parseInt(parts[2], 10);
    } else if (parts[2].length === 4) {
      d = parseInt(parts[0], 10);
      m = parseInt(parts[1], 10);
      y = parseInt(parts[2], 10);
    }

    if (y && m) {
      if (!d || d < 1 || d > 31) d = 1; // Fix day 00 to 01
      if (m < 1 || m > 12) m = 1;
      return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }
  }
  return null;
}

function parseNumber(val) {
  if (val === undefined || val === null || val === '') return null;
  const n = parseInt(val, 10);
  return isNaN(n) ? null : n;
}

function parseContact(val) {
  if (!val || !String(val).trim()) return null;
  const cleaned = String(val).replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned, 10) : null;
}

export async function syncSheetToSupabase() {
  console.log('1. Fetching members from Google Sheet...');
  const res = await fetch(GOOGLE_SHEET_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet data: ${res.statusText}`);
  }
  const sheetRows = await res.json();
  console.log(`Fetched ${sheetRows.length} raw rows from Google Sheet.`);

  const validMembers = sheetRows
    .filter((r) => {
      const name = String(r.Name || r.name || '').trim();
      const regNo = String(r.Reg_no ?? r.reg_no ?? '').trim();
      return name.length > 0 || regNo.length > 0;
    })
    .map((r, index) => {
      return {
        Reg_no: String(r.Reg_no ?? r.reg_no ?? index + 1).trim(),
        Reg_Date: parseDateForDb(r.Reg_Date || r.reg_date),
        Name: String(r.Name || r.name || '').trim(),
        Contact_No: parseContact(r.Contact_No),
        Village: String(r.Village || r.village || '').trim(),
        Total_Members: parseNumber(r.Total_Members),
        Total_Major: parseNumber(r.Total_Major),
        Total_Minor: parseNumber(r.Total_Minor),
      };
    });

  console.log(`Prepared ${validMembers.length} valid members for Supabase.`);

  // Clear existing Supabase members
  console.log('2. Refreshing Supabase Members table...');
  const { error: delError } = await supabase.from('Members').delete().neq('id', -1);
  if (delError) {
    console.warn('Delete warning:', delError.message);
  }

  // Insert in batches of 50
  console.log('3. Uploading to Supabase in batches...');
  const batchSize = 50;
  for (let i = 0; i < validMembers.length; i += batchSize) {
    const batch = validMembers.slice(i, i + batchSize);
    const { error: insError } = await supabase.from('Members').insert(batch);
    if (insError) {
      console.error(`Error in batch ${i / batchSize + 1}:`, insError.message);
    } else {
      console.log(`Batch ${i / batchSize + 1} (${batch.length} rows) uploaded.`);
    }
  }

  console.log('✅ Google Sheet to Supabase sync completed successfully!');
}

if (process.argv[1] && process.argv[1].endsWith('syncSheetToSupabase.js')) {
  syncSheetToSupabase().catch(console.error);
}
