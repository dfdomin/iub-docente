// Supabase unificado IUB — sin módulo fijo (lo elige module-context.js)
(function () {
  var SUPABASE_URL = "https://nnrgxuzvjtweyzkdrech.supabase.co";
  var SUPABASE_KEY = "sb_publishable_-101J7EEEhv-C5kjosWGTg_657OtsBg";

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn("[IUB Docente] Supabase no configurado.");
    return;
  }

  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_KEY = SUPABASE_KEY;
  localStorage.setItem("iub_supabase_url", SUPABASE_URL);
  localStorage.setItem("iub_supabase_key", SUPABASE_KEY);

  console.info("[IUB Docente] Supabase ✅", SUPABASE_URL);
})();
