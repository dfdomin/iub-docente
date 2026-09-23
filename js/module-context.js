// Catálogo de módulos / offerings y contexto activo para la consola docente IUB
(function (global) {
  "use strict";

  var SESSION_OFFERING = "iub_selected_offering";

  var CATALOG = [
    {
      moduleCode: "TGA04",
      offeringCode: "TGA04-2026-2",
      title: "Fundamentos de Computación",
      narrative: "NeuroBiz S.A.S.",
      prefix: "tga04",
      studentSite: "https://dfdomin.github.io/tga04-neurobiz/",
    },
    {
      moduleCode: "TGA05",
      offeringCode: "TGA05-2026-2",
      title: "Estructura de Datos para los Negocios",
      narrative: "NeuroBiz S.A.S.",
      prefix: "tga05",
      studentSite: "https://dfdomin.github.io/tga05-neurobiz/",
    },
    {
      moduleCode: "ADM18",
      offeringCode: "ADM18-2026-3",
      title: "Procesamiento de la Información",
      narrative: "LatamBox",
      prefix: "adm18",
      studentSite: "https://dfdomin.github.io/adm18-material/",
    },
    {
      moduleCode: "ADM18",
      offeringCode: "ADM18-2026-2",
      title: "Procesamiento de la Información",
      narrative: "LatamBox",
      prefix: "adm18",
      studentSite: "https://dfdomin.github.io/adm18-material/",
    },
    {
      moduleCode: "TD",
      offeringCode: "TD-2026-2",
      title: "Transformación Digital en la Empresa",
      narrative: "Mercado360",
      prefix: "td",
      studentSite: "https://dfdomin.github.io/td-inteligencia-negocios/",
    },
  ];

  function findByOffering(code) {
    return CATALOG.find(function (o) {
      return o.offeringCode === code;
    }) || null;
  }

  function findByModule(mod) {
    return CATALOG.find(function (o) {
      return o.moduleCode === String(mod || "").toUpperCase();
    }) || null;
  }

  function getSelected() {
    var code = sessionStorage.getItem(SESSION_OFFERING);
    return code ? findByOffering(code) : null;
  }

  function select(offeringCode) {
    var entry = findByOffering(offeringCode);
    if (!entry) return null;
    sessionStorage.setItem(SESSION_OFFERING, entry.offeringCode);
    apply(entry);
    return entry;
  }

  function selectFromQuery() {
    var params = new URLSearchParams(global.location.search);
    var mod = params.get("module");
    var off = params.get("offering");
    if (off) return select(off);
    if (mod) {
      var entry = findByModule(mod);
      if (entry) return select(entry.offeringCode);
    }
    return null;
  }

  function apply(entry) {
    entry = entry || getSelected();
    if (!entry) return false;

    global.MODULE_CODE = entry.moduleCode;
    global.OFFERING_CODE = entry.offeringCode;
    global.NARRATIVE = entry.narrative;
    global.GAMIF_PREFIX = entry.prefix;

    localStorage.setItem("gamif_module_code", entry.moduleCode);
    localStorage.setItem("gamif_offering_code", entry.offeringCode);
    localStorage.setItem("gamif_narrative", entry.narrative);
    localStorage.setItem(entry.prefix + "_supabase_url", global.SUPABASE_URL || "");
    localStorage.setItem(entry.prefix + "_supabase_key", global.SUPABASE_KEY || "");
    localStorage.setItem(entry.prefix + "_course_code", entry.offeringCode);

    return true;
  }

  function storageKey(suffix) {
    var entry = getSelected();
    var code = entry ? entry.offeringCode : "none";
    return "iub:" + code + ":" + suffix;
  }

  function requireSelected(redirectUrl) {
    var entry = getSelected() || selectFromQuery();
    if (!entry) {
      global.location.href = redirectUrl || "index.html";
      return null;
    }
    apply(entry);
    return entry;
  }

  function listForSession(session) {
    var allowed = (session && session.modules) || [];
    if (!allowed.length) return CATALOG.slice();
    return CATALOG.filter(function (o) {
      return allowed.some(function (m) {
        return String(m).toUpperCase() === o.moduleCode;
      });
    });
  }

  function label(entry) {
    return entry.moduleCode + " · " + entry.title + " (" + entry.offeringCode + ")";
  }

  global.IUBModuleContext = {
    CATALOG: CATALOG,
    getSelected: getSelected,
    select: select,
    selectFromQuery: selectFromQuery,
    apply: apply,
    storageKey: storageKey,
    requireSelected: requireSelected,
    listForSession: listForSession,
    label: label,
    findByOffering: findByOffering,
  };
})(typeof window !== "undefined" ? window : globalThis);
