(() => {
  const DICT = {
    /* =========================
       DEUTSCH
       ========================= */
    de: {
      /* NAV */
      nav_home: "Home",
      nav_config: "Konfigurator",
      nav_about: "Über uns",
      nav_legal: "Rechtliches",
      whatsapp_btn: "WhatsApp",
      footer_tag: "Chiptuning & Softwareoptimierung",

      /* HOME */
      home_headline: "Mehr Leistung. Mehr Emotion.",
      home_subline:
        "Professionelles Chiptuning, maßgeschneiderte Software & spürbar mehr Fahrfreude – abgestimmt auf dein Fahrzeug und deinen Fahrstil.",
      home_cta1: "Jetzt Leistung berechnen",
      home_cta2: "Mehr über uns",

      /* ABOUT */
      about_h1: "Über uns",
      about_intro:
        "turbroos performance steht für individuelle Softwareoptimierung und professionelles Chiptuning. Wir setzen bewusst auf saubere Kennfeldanpassungen statt pauschaler Standardlösungen.",
      about_card1_t: "Individuelle Abstimmung",
      about_card1_p:
        "Jedes Fahrzeug wird individuell betrachtet. Motorisierung, Softwarestand und Hardware fließen direkt in die Optimierung ein.",
      about_card2_t: "Transparente Richtwerte",
      about_card2_p:
        "Leistungswerte im Konfigurator dienen als unverbindliche Orientierung.",
      about_card3_t: "Preis auf Anfrage",
      about_card3_p:
        "Der Preis richtet sich nach Fahrzeug, Motor und gewünschtem Leistungsziel.",

      about_extra_h2: "Was passiert bei einer Kennfeldoptimierung?",
      about_extra_p1:
        "Bei einer Kennfeldoptimierung werden Steuerparameter im Motorsteuergerät gezielt angepasst.",
      about_extra_p2:
        "Ziel ist eine harmonische Leistungsentfaltung und bessere Fahrbarkeit.",
      about_extra_p3:
        "Alle Anpassungen erfolgen unter Berücksichtigung von Sicherheit und Haltbarkeit.",

      about_process_h: "Ablauf einer professionellen Chiptuning-Optimierung",
      about_process_1: "Analyse der Fahrzeugdaten.",
      about_process_2: "Anpassung relevanter Kennfelder.",
      about_process_3: "Feinabstimmung für den Alltag.",
      about_process_4: "Abschlussprüfung und Übergabe.",

      /* CONFIGURATOR */
      cfg_h1: "Fahrzeug-Konfigurator",
      cfg_intro:
        "Wähle Marke, Plattform und Motorisierung. Alle Werte sind unverbindliche Richtwerte.",
      cta_btn: "Anfrage per WhatsApp",
      cta_note:
        "Individuelle Softwareanpassung – keine Pauschalsoftware.",
      cfg_note:
        "* Alle Werte sind unverbindliche Richtwerte. Stage 2 nur auf Anfrage.",

      /* LEGAL */
      legal_h1: "Rechtliches",
      legal_intro:
        "Hier findest du Impressum und Datenschutz."
    },

    /* =========================
       ENGLISH
       ========================= */
    en: {
      nav_home: "Home",
      nav_config: "Configurator",
      nav_about: "About us",
      nav_legal: "Legal",
      whatsapp_btn: "WhatsApp",
      footer_tag: "Chiptuning & Software Optimization",

      /* HOME */
      home_headline: "More Power. More Emotion.",
      home_subline:
        "Professional chiptuning, custom ECU calibration and noticeable driving pleasure – tailored to your vehicle and driving style.",
      home_cta1: "Calculate performance",
      home_cta2: "Learn more about us",

      /* ABOUT */
      about_h1: "About us",
      about_intro:
        "turbroos performance stands for individual ECU calibration and professional chiptuning.",
      about_card1_t: "Individual calibration",
      about_card1_p:
        "Each vehicle is analyzed individually before tuning.",
      about_card2_t: "Transparent reference values",
      about_card2_p:
        "Configurator values are non-binding reference figures.",
      about_card3_t: "Price on request",
      about_card3_p:
        "Pricing depends on vehicle and tuning scope.",

      about_extra_h2: "What happens during ECU tuning?",
      about_extra_p1:
        "ECU tuning adjusts control parameters inside the engine control unit.",
      about_extra_p2:
        "The goal is smooth power delivery and drivability.",
      about_extra_p3:
        "All changes respect safety margins.",

      about_process_h: "Typical tuning process",
      about_process_1: "Vehicle data analysis.",
      about_process_2: "Map optimization.",
      about_process_3: "Fine tuning.",
      about_process_4: "Final checks.",

      /* CONFIGURATOR */
      cfg_h1: "Vehicle Configurator",
      cfg_intro:
        "Select brand, platform and engine. All values are non-binding.",
      cta_btn: "Request via WhatsApp",
      cta_note:
        "Individual software calibration – no generic files.",
      cfg_note:
        "* All values are non-binding. Stage 2 on request only.",

      /* LEGAL */
      legal_h1: "Legal Notice",
      legal_intro:
        "Here you will find legal information and privacy policy."
    }
  };

  function applyLang(lang) {
    const dict = DICT[lang] || DICT.de;
    document.querySelectorAll("[data-lang]").forEach(el => {
      const key = el.getAttribute("data-lang");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
  }

  function updateLangButtons(lang) {
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.setlang === lang);
    });
  }

  window.setLang = function (lang) {
    localStorage.setItem("lang", lang);
    applyLang(lang);
    updateLangButtons(lang);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("lang") || "de";
    applyLang(lang);
    updateLangButtons(lang);
  });
})();
