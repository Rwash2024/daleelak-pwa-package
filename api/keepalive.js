// Runs once a day (see vercel.json). Free Supabase projects are paused after about a week
// without activity, which would blank the whole site; one cheap read a day prevents that.
const SUPABASE_URL = 'https://nhtqdfnmdsrhbplfkdey.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eFAzBTqbatLmZrUdkVWg9g_zk8bMcFD'; // public key, same one the site ships

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/public_shops?select=id&limit=1', {
      headers: { apikey: SUPABASE_ANON_KEY }
    });
    res.status(r.ok ? 200 : 502).json({ ok: r.ok, status: r.status, at: new Date().toISOString() });
  } catch (e) {
    res.status(502).json({ ok: false, error: String((e && e.message) || e) });
  }
};
