(() => {
  const DICT = {
    de: {
      nav_home: "Home",
      nav_config: "Konfigurator",
      nav_about: "Über uns",
      nav_legal: "Rechtliches",
      whatsapp_btn: "WhatsApp",
      footer_tag: "Chiptuning & Softwareoptimierung",

      home_headline: "Mehr Leistung. Mehr Emotion.",
      home_subline:
        "Professionelles Chiptuning, maßgeschneiderte Software & spürbar mehr Fahrfreude – abgestimmt auf dein Fahrzeug und deinen Fahrstil.",
      home_cta1: "Jetzt Leistung berechnen",
      home_cta2: "Mehr über uns",

      config_title: "Fahrzeug-Konfigurator",
      config_h1: "Fahrzeug-Konfigurator",
      config_intro: "Wähle Marke, Plattform und Motorisierung. Alle Werte sind unverbindliche Richtwerte.",
      config_cta: "Anfrage per WhatsApp",
      config_note: "Individuelle Softwareanpassung – keine Pauschalsoftware.",
      config_hint: "* Alle Werte sind unverbindliche Richtwerte. Stage 2 nur auf Anfrage."
    },

    en: {
      nav_home: "Home",
      nav_config: "Configurator",
      nav_about: "About",
      nav_legal: "Legal",
      whatsapp_btn: "WhatsApp",
      footer_tag: "Chiptuning & Software Optimization",

      home_headline: "More power. More emotion.",
      home_subline:
        "Professional tuning, custom ECU software and noticeably more driving pleasure — tailored to your vehicle and your driving style.",
      home_cta1: "Calculate performance now",
      home_cta2: "Learn more about us",

      config_title: "Vehicle Configurator",
      config_h1: "Vehicle Configurator",
      config_intro: "Select brand, platform and engine. All values are non-binding reference values.",
      config_cta: "Request via WhatsApp",
      config_note: "Individual software calibration — no generic one-click files.",
      config_hint: "* All values are non-binding reference values. Stage 2 on request."
    }
  };

  function applyLang(lang) {
    const dict = DICT[lang] || DICT.de;

    // HTML lang attr
    document.documentElement.lang = lang;

    // translate all data-lang nodes
    document.querySelectorAll("[data-lang]").forEach((el) => {
      const key = el.getAttribute("data-lang");
      if (!key) return;
      const val = dict[key];
      if (typeof val === "string") el.textContent = val;
    });

    // active state buttons
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-setlang") === lang);
    });
  }

  // global function for your inline onclick usage
  window.setLang = function (lang) {
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
    applyLang(lang);
  };

  document.addEventListener("DOMContentLoaded", () => {
    let lang = "de";
    try {
      lang = localStorage.getItem("lang") || "de";
    } catch (e) {}
    applyLang(lang);
  });
})();
