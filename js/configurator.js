(() => {
  /* =========================================================
     TURBROOS – Configurator.js (FINAL)
     - Panel klappt zuverlässig auf (Desktop & Mobile)
     - Diagramm wieder wie vorher (Grid, Achsenlabels, Watermark-Logo, Dots, Animation)
     - Zusatzoptionen nur wenn in DB vorhanden
     - "Methode" komplett entfernt -> Verdichtungsverhältnis (spCompression)
     ========================================================= */

  /* =========================================================
     Zusatzoptionen: Keys -> Labels
     ========================================================= */
  const OPTION_DEFS = {
    EGR_OFF:        "EGR OFF",
    DPF_OFF:        "DPF OFF",
    DTC_REMOVAL:    "DTC Removal",
    START_STOP_OFF: "Start/Stop OFF",
    FLAPS:          "Flaps",
    VMAX:           "Vmax",
    ADBLUE:         "AdBlue"
  };

  /* =========================================================
     Test-Datenbank (aktuell 1 Fahrzeug)
     ========================================================= */

const DB = {
  "Audi": {
    "A3": {
      "8P (2003–2008)": {

        /* =========================
           BENZIN
        ========================= */

        "1.6 FSI 115 PS": {
          display: { title: "Audi A3 1.6 FSI 115 PS" },
          perf: {
            stdPS: 115, stgPS: 125,
            stdNm: 155, stgNm: 170,
            rpm: [800,1000,1200,1400,1600,1800,2000,2300,2600,3000,3400,3800,4200,4600,5000],
            stdPSCurve: [10,18,28,40,55,68,80,92,102,110,114,115,112,105,95],
            stgPSCurve: [12,22,34,48,64,78,92,105,115,122,125,124,120,112,100],
            stdNmCurve: [90,110,130,145,155,155,150,145,140,135,125,115,105,95,85],
            stgNmCurve: [100,120,145,160,170,170,165,160,155,150,140,130,120,110,95]
          },
          specs: {
            fuel: "Benzin",
            compression: "12.0 : 1",
            type: "Stage 1",
            displacement: "1598 ccm",
            ecu: "Bosch MED9.5.10",
            engineCode: "BLF"
          },
          options: ["DTC_REMOVAL","DECAT","FLAPS","VMAX"]
        },

        "1.8 TFSI 160 PS": {
          display: { title: "Audi A3 1.8 TFSI 160 PS" },
          perf: {
            stdPS: 160, stgPS: 210,
            stdNm: 250, stgNm: 340,
            rpm: [800,1000,1200,1400,1600,1800,2000,2300,2600,3000,3400,3800,4200,4600,5000],
            stdPSCurve: [15,25,40,60,85,110,130,145,155,160,158,155,148,138,120],
            stgPSCurve: [20,35,60,90,125,155,175,190,200,210,208,202,190,170,145],
            stdNmCurve: [140,180,220,250,250,250,245,240,235,230,215,195,175,150,120],
            stgNmCurve: [170,220,280,330,340,340,335,330,320,310,295,270,240,200,160]
          },
          specs: {
            fuel: "Benzin",
            compression: "9.6 : 1",
            type: "Stage 1",
            displacement: "1798 ccm",
            ecu: "Bosch MED17.5",
            engineCode: "BZB"
          },
          options: ["DTC_REMOVAL","START_STOP_OFF","DECAT","FLAPS","VMAX","POP_BANG"]
        },

        "2.0 TFSI 200 PS": {
          display: { title: "Audi A3 2.0 TFSI 200 PS" },
          perf: {
            stdPS: 200, stgPS: 250,
            stdNm: 280, stgNm: 360,
            rpm: [800,1000,1200,1400,1600,1800,2000,2300,2600,3000,3400,3800,4200,4600,5000],
            stdPSCurve: [20,35,55,80,110,145,170,185,195,200,198,195,185,165,140],
            stgPSCurve: [25,45,75,115,155,185,210,230,245,250,248,240,225,200,165],
            stdNmCurve: [160,210,250,280,280,280,275,270,265,260,240,215,185,150,120],
            stgNmCurve: [200,260,320,350,360,360,355,350,340,330,305,270,230,180,150]
          },
          specs: {
            fuel: "Benzin",
            compression: "10.5 : 1",
            type: "Stage 1",
            displacement: "1984 ccm",
            ecu: "Bosch MED17.5",
            engineCode: "BWA"
          },
          options: ["DTC_REMOVAL","START_STOP_OFF","DECAT","FLAPS","VMAX","POP_BANG","ANTILAG"]
        },

        "3.2 V6 250 PS": {
          display: { title: "Audi A3 3.2 V6 250 PS" },
          perf: {
            stdPS: 250, stgPS: 265,
            stdNm: 320, stgNm: 340,
            rpm: [800,1000,1200,1400,1600,1800,2000,2300,2600,3000,3400,3800,4200,4600,5000],
            stdPSCurve: [25,40,60,90,120,155,185,210,230,245,250,248,240,220,190],
            stgPSCurve: [28,45,70,105,140,175,205,230,250,260,265,262,250,225,195],
            stdNmCurve: [180,220,260,300,320,320,315,310,305,300,285,265,240,210,180],
            stgNmCurve: [200,240,280,320,340,340,335,330,325,320,300,280,255,225,190]
          },
          specs: {
            fuel: "Benzin",
            compression: "11.3 : 1",
            type: "Stage 1",
            displacement: "3189 ccm",
            ecu: "Bosch ME7.1.1",
            engineCode: "BMJ"
          },
          options: ["DTC_REMOVAL","DECAT","FLAPS","VMAX","POP_BANG","ANTILAG"]
        },

        /* =========================
           DIESEL
        ========================= */

        "1.9 TDI 105 PS": {
          display: { title: "Audi A3 1.9 TDI 105 PS" },
          perf: {
            stdPS: 105, stgPS: 140,
            stdNm: 250, stgNm: 340,
            rpm: [800,1000,1200,1400,1600,1800,2000,2300,2600,3000,3400,3800,4200,4600,5000],
            stdPSCurve: [10,18,30,45,65,80,92,100,105,103,98,90,80,65,50],
            stgPSCurve: [15,28,45,70,95,115,130,138,140,138,130,115,95,75,55],
            stdNmCurve: [160,200,230,250,250,250,245,240,230,220,200,180,155,130,105],
            stgNmCurve: [190,240,300,330,340,340,335,330,315,300,270,230,190,155,125]
          },
          specs: {
            fuel: "Diesel",
            compression: "19.0 : 1",
            type: "Stage 1",
            displacement: "1896 ccm",
            ecu: "Bosch EDC16U1",
            engineCode: "BKC"
          },
          options: ["EGR_OFF","DPF_OFF","DTC_REMOVAL","FLAPS","VMAX","ADBLUE"]
        },

        "2.0 TDI 140 PS": {
          display: { title: "Audi A3 2.0 TDI 140 PS" },
          perf: {
            stdPS: 140, stgPS: 180,
            stdNm: 320, stgNm: 400,
            rpm: [800,1000,1200,1400,1600,1800,2000,2300,2600,3000,3400,3800,4200,4600,5000],
            stdPSCurve: [15,25,40,65,90,110,125,135,140,138,132,120,105,85,65],
            stgPSCurve: [20,35,60,90,120,145,165,175,180,178,168,150,125,95,70],
            stdNmCurve: [180,220,280,320,320,320,315,310,300,285,260,230,195,160,130],
            stgNmCurve: [220,270,340,390,400,400,395,390,375,355,320,280,235,185,150]
          },
          specs: {
            fuel: "Diesel",
            compression: "18.0 : 1",
            type: "Stage 1",
            displacement: "1968 ccm",
            ecu: "Bosch EDC16U34",
            engineCode: "BMN"
          },
          options: ["EGR_OFF","DPF_OFF","DTC_REMOVAL","START_STOP_OFF","FLAPS","VMAX","ADBLUE"]
        }

      }
    }
  }
};

  /* =========================================================
     DOM – Felder
     ========================================================= */
  const selBrand  = document.getElementById("selBrand");
  const selModel  = document.getElementById("selModel");
  const selGen    = document.getElementById("selGen");
  const selEngine = document.getElementById("selEngine");

  const panel       = document.getElementById("resultPanel");
  const vehicleTitle = document.getElementById("vehicleTitle");
  const vehicleSub   = document.getElementById("vehicleSub");

  const psStd  = document.getElementById("psStd");
  const psStg  = document.getElementById("psStg");
  const psDiff = document.getElementById("psDiff");
  const nmStd  = document.getElementById("nmStd");
  const nmStg  = document.getElementById("nmStg");
  const nmDiff = document.getElementById("nmDiff");

  const spFuel       = document.getElementById("spFuel");
  const spCompression = document.getElementById("spCompression"); // NEU: Verdichtungsverhältnis
  const spType       = document.getElementById("spType");
  const spDisp       = document.getElementById("spDisp");
  const spEcu        = document.getElementById("spEcu");
  const spEngineCode = document.getElementById("spEngineCode");

  // (falls irgendwo noch vorhanden, soll es NICHT crashen)
  const spMethod = document.getElementById("spMethod");

  // Zusatzoptionen
  const optionCard = document.getElementById("optionCard");
  const optionGrid = document.getElementById("optionGrid");

  // Chart
  const canvas = document.getElementById("perfChart");
  const ctx = canvas ? canvas.getContext("2d", { alpha: true }) : null;

  let logoImg = null;
  let chartAnimRaf = null;

  /* =========================================================
     Safety Checks (falls irgendwas fehlt -> nicht crashen)
     ========================================================= */
  function hasCoreDom() {
    return (
      selBrand && selModel && selGen && selEngine &&
      panel && vehicleTitle && vehicleSub &&
      psStd && psStg && psDiff &&
      nmStd && nmStg && nmDiff &&
      spFuel && spType && spDisp && spEcu && spEngineCode &&
      optionCard && optionGrid &&
      canvas && ctx
    );
  }

  /* =========================================================
     Helpers
     ========================================================= */
  function resetSelect(selectEl, disabled = true) {
    if (!selectEl) return;
    selectEl.innerHTML = `<option value="">Bitte wählen…</option>`;
    selectEl.disabled = disabled;
    selectEl.value = "";
  }

  function fillSelect(selectEl, items) {
    if (!selectEl) return;
    for (const it of items) {
      const opt = document.createElement("option");
      opt.value = it;
      opt.textContent = it;
      selectEl.appendChild(opt);
    }
  }

  function clearCanvas() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function closePanel() {
    if (!panel) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");

    // OptionCard beim Schließen immer verstecken, damit es nicht "stehen bleibt"
    if (optionCard) optionCard.hidden = true;
    if (optionGrid) optionGrid.innerHTML = "";

    // Chart-Animation stoppen
    if (chartAnimRaf) cancelAnimationFrame(chartAnimRaf);
    chartAnimRaf = null;
    clearCanvas();
  }

  function openPanel() {
    if (!panel) return;
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /* =========================================================
     Chart Rendering (wie vorher: Grid + Labels + Watermark + Dots)
     ========================================================= */
  function loadLogo() {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = "img/logo.png";
    });
  }

  function drawWatermarkLogo() {
    if (!logoImg || !ctx || !canvas) return;

    const w = canvas.width;
    const h = canvas.height;

    const targetW = Math.min(w * 0.42, 360);
    const ratio = logoImg.width / logoImg.height;
    const targetH = targetW / ratio;

    const x = (w - targetW) / 2;
    const y = (h - targetH) / 2;

    ctx.save();
    ctx.globalAlpha = 0.06; // subtil
    ctx.drawImage(logoImg, x, y, targetW, targetH);
    ctx.restore();
  }

  function drawGrid(x0, y0, x1, y1, xTicks = 12, yTicks = 6) {
    if (!ctx) return;

    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;

    const w = x1 - x0;
    const h = y1 - y0;

    for (let i = 0; i <= xTicks; i++) {
      const x = x0 + (w * i) / xTicks;
      ctx.beginPath();
      ctx.moveTo(x, y0);
      ctx.lineTo(x, y1);
      ctx.stroke();
    }

    for (let j = 0; j <= yTicks; j++) {
      const y = y1 - (h * j) / yTicks;
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawAxesLabels(x0, y0, x1, y1) {
    if (!ctx) return;

    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "800 12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
    ctx.textAlign = "center";

    // X label
    ctx.fillText("RPM", (x0 + x1) / 2, y1 + 34);

    // left label (PS)
    ctx.save();
    ctx.translate(x0 - 34, (y0 + y1) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("Leistung (PS)", 0, 0);
    ctx.restore();

    // right label (Nm)
    ctx.save();
    ctx.translate(x1 + 34, (y0 + y1) / 2);
    ctx.rotate(Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("Drehmoment (Nm)", 0, 0);
    ctx.restore();

    ctx.restore();
  }

  function drawLine(xs, ys, t, color, width = 2.6, dotEvery = 2) {
    if (!ctx) return;

    const n = xs.length;
    const upto = Math.max(1, Math.floor(lerp(1, n, t)));

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // line
    ctx.beginPath();
    for (let i = 0; i < upto; i++) {
      const x = xs[i];
      const y = ys[i];
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // dots
    ctx.fillStyle = color;
    for (let i = 0; i < upto; i += dotEvery) {
      ctx.beginPath();
      ctx.arc(xs[i], ys[i], 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function animateChart(perf) {
    if (!ctx || !canvas) return;

    if (chartAnimRaf) cancelAnimationFrame(chartAnimRaf);
    chartAnimRaf = null;

    const w = canvas.width;
    const h = canvas.height;

    const padL = 64;
    const padR = 64;
    const padT = 28;
    const padB = 54;

    const x0 = padL;
    const y0 = padT;
    const x1 = w - padR;
    const y1 = h - padB;

    const rpmMin = perf.rpm[0];
    const rpmMax = perf.rpm[perf.rpm.length - 1];

    const psMax = Math.max(...perf.stdPSCurve, ...perf.stgPSCurve) * 1.08;
    const nmMax = Math.max(...perf.stdNmCurve, ...perf.stgNmCurve) * 1.08;

    const mapX = (rpm) => x0 + ((rpm - rpmMin) / (rpmMax - rpmMin)) * (x1 - x0);
    const mapYps = (ps) => y1 - (ps / psMax) * (y1 - y0);
    const mapYnm = (nm) => y1 - (nm / nmMax) * (y1 - y0);

    const xs = perf.rpm.map(mapX);
    const ysPsStd = perf.stdPSCurve.map(mapYps);
    const ysPsStg = perf.stgPSCurve.map(mapYps);
    const ysNmStd = perf.stdNmCurve.map(mapYnm);
    const ysNmStg = perf.stgNmCurve.map(mapYnm);

    const start = performance.now();
    const dur = 1200;

    const tick = (now) => {
      const raw = (now - start) / dur;
      const t = clamp(raw, 0, 1);
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      clearCanvas();

      // Grid + Watermark + Labels (wie vorher)
      drawGrid(x0, y0, x1, y1, 12, 6);
      drawWatermarkLogo();
      drawAxesLabels(x0, y0, x1, y1);

      // Animation Stagger: PS zuerst, Nm leicht verzögert
      const tPS = clamp(ease * 1.08, 0, 1);
      const tNM = clamp((ease - 0.10) * 1.18, 0, 1);

      // Farben wie vorher (passen zur Legend in CSS)
      drawLine(xs, ysPsStd, tPS, "#f1c40f", 2.6, 2); // Serie PS
      drawLine(xs, ysPsStg, tPS, "#ffd56a", 2.6, 2); // Stage 1 PS
      drawLine(xs, ysNmStd, tNM, "#ff2b2b", 2.6, 2); // Serie Nm
      drawLine(xs, ysNmStg, tNM, "#ff6a6a", 2.6, 2); // Stage 1 Nm

      // Rahmen
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.10)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      ctx.restore();

      if (t < 1) {
        chartAnimRaf = requestAnimationFrame(tick);
      } else {
        chartAnimRaf = null;
      }
    };

    chartAnimRaf = requestAnimationFrame(tick);
  }

  /* =========================================================
     Zusatzoptionen rendern (nur wenn vorhanden)
     ========================================================= */
  function renderOptions(item) {
    if (!optionCard || !optionGrid) return;

    optionGrid.innerHTML = "";

    const list = Array.isArray(item?.options) ? item.options : [];
    const cleaned = list
      .map(k => OPTION_DEFS[k])
      .filter(Boolean);

    if (cleaned.length === 0) {
      optionCard.hidden = true;
      return;
    }

    optionCard.hidden = false;

    for (const label of cleaned) {
      const el = document.createElement("div");
      el.className = "spec-item";
      // Design bleibt wie deine spec-card/spec-grid
      el.innerHTML = `<span>${label}</span>`;
      optionGrid.appendChild(el);
    }
  }

  /* =========================================================
     Populate & Logic
     ========================================================= */
  function init() {
    if (!hasCoreDom()) {
      // wenn irgendwas fehlt: nicht crashen, sondern leise abbrechen
      return;
    }

    // Brands füllen
    fillSelect(selBrand, Object.keys(DB));

    // andere Selects zurücksetzen
    resetSelect(selModel, true);
    resetSelect(selGen, true);
    resetSelect(selEngine, true);

    // Panel zu Beginn zu
    closePanel();
  }

  function onBrand() {
    const brand = selBrand.value;

    resetSelect(selModel, true);
    resetSelect(selGen, true);
    resetSelect(selEngine, true);

    closePanel();

    if (!brand) return;

    const models = Object.keys(DB[brand] || {});
    resetSelect(selModel, false);
    fillSelect(selModel, models);
  }

  function onModel() {
    const brand = selBrand.value;
    const model = selModel.value;

    resetSelect(selGen, true);
    resetSelect(selEngine, true);

    closePanel();

    if (!brand || !model) return;

    const gens = Object.keys(DB[brand][model] || {});
    resetSelect(selGen, false);
    fillSelect(selGen, gens);
  }

  function onGen() {
    const brand = selBrand.value;
    const model = selModel.value;
    const gen = selGen.value;

    resetSelect(selEngine, true);
    closePanel();

    if (!brand || !model || !gen) return;

    const engines = Object.keys(DB[brand][model][gen] || {});
    resetSelect(selEngine, false);
    fillSelect(selEngine, engines);
  }

  async function onEngine() {
    const brand = selBrand.value;
    const model = selModel.value;
    const gen = selGen.value;
    const engine = selEngine.value;

    closePanel();

    if (!brand || !model || !gen || !engine) return;

    const item = DB?.[brand]?.[model]?.[gen]?.[engine];
    if (!item) return;

    // Logo einmal laden (für Watermark im Chart)
    if (logoImg === null) {
      logoImg = await loadLogo();
    }

    // Titel / Sub
    vehicleTitle.textContent = item.display?.title || "—";
    vehicleSub.textContent = item.display?.sub || "";

    // Performance Zahlen
    const p = item.perf;

    psStd.textContent  = String(p.stdPS);
    psStg.textContent  = String(p.stgPS);
    psDiff.textContent = String(p.stgPS - p.stdPS);

    nmStd.textContent  = String(p.stdNm);
    nmStg.textContent  = String(p.stgNm);
    nmDiff.textContent = String(p.stgNm - p.stdNm);

    // Motor-Daten (Methode ist entfernt)
    spFuel.textContent = item.specs?.fuel || "—";
    if (spCompression) spCompression.textContent = item.specs?.compression || "—";
    if (spMethod) spMethod.textContent = ""; // falls noch im HTML
    spType.textContent = item.specs?.type || "—";
    spDisp.textContent = item.specs?.displacement || "—";
    spEcu.textContent  = item.specs?.ecu || "—";
    spEngineCode.textContent = item.specs?.engineCode || "—";

    // Zusatzoptionen
    renderOptions(item);

    // Panel öffnen
    openPanel();

    // Chart animieren leicht verzögert, damit Panel-Animation startet
    setTimeout(() => {
      animateChart(item.perf);
    }, 180);
  }

  /* =========================================================
     Events
     ========================================================= */
  if (selBrand)  selBrand.addEventListener("change", onBrand);
  if (selModel)  selModel.addEventListener("change", onModel);
  if (selGen)    selGen.addEventListener("change", onGen);
  if (selEngine) selEngine.addEventListener("change", onEngine);

  document.addEventListener("DOMContentLoaded", init);
})();
