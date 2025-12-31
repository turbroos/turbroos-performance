(() => {
  /* =========================================================
     Test-Datenbank (Schritt A: 1 Fahrzeug)
     Struktur ist bereits so gebaut, dass wir später easy erweitern.
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

  const DB = {
    "Audi": {
      "A3": {
        "8P (2003–2012)": {
          "2.0 TDI CR 140 PS": {
            display: {
              title: "Audi A3 8P 2.0 TDI CR 140 PS",
            },
            perf: {
              stdPS: 140,
              stgPS: 180,
              stdNm: 320,
              stgNm: 400,
              rpm: [800, 1000, 1200, 1400, 1600, 1800, 2000, 2300, 2600, 3000, 3400, 3800, 4200, 4600, 5000],
              stdPSCurve: [20, 28, 40, 60, 78, 92, 105, 118, 128, 135, 138, 140, 138, 130, 110],
              stgPSCurve: [24, 34, 50, 75, 98, 118, 135, 152, 165, 175, 179, 180, 176, 165, 140],
              stdNmCurve: [140, 180, 240, 300, 320, 320, 320, 315, 310, 300, 285, 265, 240, 210, 170],
              stgNmCurve: [160, 210, 280, 350, 400, 400, 400, 395, 385, 370, 350, 325, 290, 250, 200]
            },
            specs: {
              fuel: "Diesel",
              method: "Chiptuning",
              type: "Stage 1",
              displacement: "1968 ccm",
              ecu: "Bosch EDC17",
              engineCode: "CFF"
            },
            options: [
              "EGR_OFF",
              "DPF_OFF",
              "DTC_REMOVAL",
              "START_STOP_OFF",
              "FLAPS",
              "VMAX",
              "ADBLUE"
            ]
          }
        }
      }
    }
  };

  /* =========================================================
     DOM
     ========================================================= */
  const selBrand = document.getElementById("selBrand");
  const selModel = document.getElementById("selModel");
  const selGen = document.getElementById("selGen");
  const selEngine = document.getElementById("selEngine");

  const panel = document.getElementById("resultPanel");
  const vehicleTitle = document.getElementById("vehicleTitle");
  const vehicleSub = document.getElementById("vehicleSub");

  const psStd = document.getElementById("psStd");
  const psStg = document.getElementById("psStg");
  const psDiff = document.getElementById("psDiff");
  const nmStd = document.getElementById("nmStd");
  const nmStg = document.getElementById("nmStg");
  const nmDiff = document.getElementById("nmDiff");

  const spFuel = document.getElementById("spFuel");
  const spMethod = document.getElementById("spMethod");
  const spType = document.getElementById("spType");
  const spDisp = document.getElementById("spDisp");
  const spEcu = document.getElementById("spEcu");
  const spEngineCode = document.getElementById("spEngineCode");

  // Zusatzoptionen
  const optionCard = document.getElementById("optionCard");
  const optionGrid = document.getElementById("optionGrid");

  const canvas = document.getElementById("perfChart");
  const ctx = canvas.getContext("2d", { alpha: true });

  let logoImg = null;
  let chartAnimRaf = null;

  /* =========================================================
     Helpers
     ========================================================= */
  function resetSelect(selectEl, disabled = true) {
    selectEl.innerHTML = `<option value="">Bitte wählen…</option>`;
    selectEl.disabled = disabled;
    selectEl.value = "";
  }

  function fillSelect(selectEl, items) {
    for (const it of items) {
      const opt = document.createElement("option");
      opt.value = it;
      opt.textContent = it;
      selectEl.appendChild(opt);
    }
  }

  function closePanel() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    if (chartAnimRaf) cancelAnimationFrame(chartAnimRaf);
    chartAnimRaf = null;
    clearCanvas();
  }

  function openPanel() {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /* =========================================================
     Chart rendering (animated) – UNVERÄNDERT
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
    if (!logoImg) return;

    const w = canvas.width;
    const h = canvas.height;

    const targetW = Math.min(w * 0.42, 360);
    const ratio = logoImg.width / logoImg.height;
    const targetH = targetW / ratio;

    const x = (w - targetW) / 2;
    const y = (h - targetH) / 2;

    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.drawImage(logoImg, x, y, targetW, targetH);
    ctx.restore();
  }

  function drawGrid(x0, y0, x1, y1, xTicks = 10, yTicks = 6) {
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
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "800 12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
    ctx.textAlign = "center";
    ctx.fillText("RPM", (x0 + x1) / 2, y1 + 34);

    ctx.save();
    ctx.translate(x0 - 34, (y0 + y1) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("Leistung (PS)", 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(x1 + 34, (y0 + y1) / 2);
    ctx.rotate(Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("Drehmoment (Nm)", 0, 0);
    ctx.restore();

    ctx.restore();
  }

  function drawLine(xs, ys, t, color, width = 2.5, dotEvery = 1) {
    const upto = Math.floor(lerp(1, xs.length, t));

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    for (let i = 0; i < upto; i++) {
      if (i === 0) ctx.moveTo(xs[i], ys[i]);
      else ctx.lineTo(xs[i], ys[i]);
    }
    ctx.stroke();

    ctx.fillStyle = color;
    for (let i = 0; i < upto; i += dotEvery) {
      ctx.beginPath();
      ctx.arc(xs[i], ys[i], 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function animateChart(perf) {
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
      drawGrid(x0, y0, x1, y1, 12, 6);
      drawWatermarkLogo();
      drawAxesLabels(x0, y0, x1, y1);

      const t1 = clamp(ease * 1.08, 0, 1);
      const t2 = clamp((ease - 0.10) * 1.18, 0, 1);

      drawLine(xs, ysPsStd, t1, "#f1c40f", 2.6, 2);
      drawLine(xs, ysPsStg, t1, "#ffd56a", 2.6, 2);
      drawLine(xs, ysNmStd, t2, "#ff2b2b", 2.6, 2);
      drawLine(xs, ysNmStg, t2, "#ff6a6a", 2.6, 2);

      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.10)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      ctx.restore();

      if (t < 1) chartAnimRaf = requestAnimationFrame(tick);
      else chartAnimRaf = null;
    };

    chartAnimRaf = requestAnimationFrame(tick);
  }

  /* =========================================================
     Populate & logic
     ========================================================= */
  function init() {
    fillSelect(selBrand, Object.keys(DB));
    resetSelect(selModel, true);
    resetSelect(selGen, true);
    resetSelect(selEngine, true);
    closePanel();
  }

  function onBrand() {
    const brand = selBrand.value;
    resetSelect(selModel, true);
    resetSelect(selGen, true);
    resetSelect(selEngine, true);
    closePanel();
    if (!brand) return;
    resetSelect(selModel, false);
    fillSelect(selModel, Object.keys(DB[brand] || {}));
  }

  function onModel() {
    const brand = selBrand.value;
    const model = selModel.value;
    resetSelect(selGen, true);
    resetSelect(selEngine, true);
    closePanel();
    if (!brand || !model) return;
    resetSelect(selGen, false);
    fillSelect(selGen, Object.keys(DB[brand][model] || {}));
  }

  function onGen() {
    const brand = selBrand.value;
    const model = selModel.value;
    const gen = selGen.value;
    resetSelect(selEngine, true);
    closePanel();
    if (!brand || !model || !gen) return;
    resetSelect(selEngine, false);
    fillSelect(selEngine, Object.keys(DB[brand][model][gen] || {}));
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

    if (logoImg === null) logoImg = await loadLogo();

    vehicleTitle.textContent = item.display.title;
    vehicleSub.textContent = item.display.sub || "";

    const p = item.perf;
    psStd.textContent = p.stdPS;
    psStg.textContent = p.stgPS;
    psDiff.textContent = p.stgPS - p.stdPS;

    nmStd.textContent = p.stdNm;
    nmStg.textContent = p.stgNm;
    nmDiff.textContent = p.stgNm - p.stdNm;

    spFuel.textContent = item.specs.fuel;
    spMethod.textContent = item.specs.method;
    spType.textContent = item.specs.type;
    spDisp.textContent = item.specs.displacement;
    spEcu.textContent = item.specs.ecu;
    spEngineCode.textContent = item.specs.engineCode;

    /* ===== ZUSATZOPTIONEN ===== */
    optionGrid.innerHTML = "";
    if (Array.isArray(item.options) && item.options.length > 0) {
      optionCard.hidden = false;
      item.options.forEach(key => {
        const label = OPTION_DEFS[key];
        if (!label) return;
        const el = document.createElement("div");
        el.className = "spec-item";
        el.innerHTML = `<span>${label}</span>`;
        optionGrid.appendChild(el);
      });
    } else {
      optionCard.hidden = true;
    }

    openPanel();
    setTimeout(() => animateChart(item.perf), 180);
  }

  /* =========================================================
     Events
     ========================================================= */
  selBrand.addEventListener("change", onBrand);
  selModel.addEventListener("change", onModel);
  selGen.addEventListener("change", onGen);
  selEngine.addEventListener("change", onEngine);

  document.addEventListener("DOMContentLoaded", init);
})();
