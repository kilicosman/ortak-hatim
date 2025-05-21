// api/backup.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Sadece GET isteği desteklenir' });
  }

  try {
    const [groups, hatimler, cuzler] = await Promise.all([
      supabase.from('hatim_groups').select('*'),
      supabase.from('hatimler').select('*'),
      supabase.from('cuzler').select('*')
    ]);

    if (groups.error || hatimler.error || cuzler.error) {
      return res.status(500).json({
        error: 'Veriler alınamadı',
        details: [groups.error, hatimler.error, cuzler.error]
      });
    }

    const backup = {
      timestamp: new Date().toISOString(),
      groups: groups.data,
      hatimler: hatimler.data,
      cuzler: cuzler.data
    };

    res.setHeader('Content-Disposition', 'attachment; filename="yedek.json"');
    res.status(200).json(backup);
  } catch (err) {
    res.status(500).json({ error: 'Bilinmeyen hata', message: err.message });
  }
}
