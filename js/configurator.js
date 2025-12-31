(() => {
  /* =========================================================
     Test-Datenbank (Schritt A: 1 Fahrzeug)
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
              rpm: [800,1000,1200,1400,1600,1800,2000,2300,2600,3000,3400,3800,4200,4600,5000],
              stdPSCurve: [20,28,40,60,78,92,105,118,128,135,138,140,138,130,110],
              stgPSCurve: [24,34,50,75,98,118,135,152,165,175,179,180,176,165,140],
              stdNmCurve: [140,180,240,300,320,320,320,315,310,300,285,265,240,210,170],
              stgNmCurve: [160,210,280,350,400,400,400,395,385,370,350,325,290,250,200]
            },
            specs: {
              fuel: "Diesel",
              compression: "18.0 : 1",
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
  const selBrand  = document.getElementById("selBrand");
  const selModel  = document.getElementById("selModel");
  const selGen    = document.getElementById("selGen");
  const selEngine = document.getElementById("selEngine");

  const panel        = document.getElementById("resultPanel");
  const vehicleTitle = document.getElementById("vehicleTitle");
  const vehicleSub   = document.getElementById("vehicleSub");

  const psStd  = document.getElementById("psStd");
  const psStg  = document.getElementById("psStg");
  const psDiff = document.getElementById("psDiff");
  const nmStd  = document.getElementById("nmStd");
  const nmStg  = document.getElementById("nmStg");
  const nmDiff = document.getElementById("nmDiff");

  const spFuel       = document.getElementById("spFuel");
  const spCompression= document.getElementById("spCompression"); // ✅ NEU
  const spType       = document.getElementById("spType");
  const spDisp       = document.getElementById("spDisp");
  const spEcu        = document.getElementById("spEcu");
  const spEngineCode = document.getElementById("spEngineCode");

  const optionCard = document.getElementById("optionCard");
  const optionGrid = document.getElementById("optionGrid");

  const canvas = document.getElementById("perfChart");
  const ctx    = canvas.getContext("2d", { alpha: true });

  let logoImg = null;
  let chartAnimRaf = null;

  /* =========================================================
     Helpers
     ========================================================= */
  function resetSelect(el, disabled = true) {
    el.innerHTML = `<option value="">Bitte wählen…</option>`;
    el.disabled = disabled;
    el.value = "";
  }

  function fillSelect(el, items) {
    items.forEach(it => {
      const opt = document.createElement("option");
      opt.value = it;
      opt.textContent = it;
      el.appendChild(opt);
    });
  }

  function closePanel() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden","true");
    if (chartAnimRaf) cancelAnimationFrame(chartAnimRaf);
    chartAnimRaf = null;
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }

  function openPanel() {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden","false");
  }

  /* =========================================================
     Chart (unverändert)
     ========================================================= */
  function loadLogo() {
    return new Promise(res => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = () => res(null);
      img.src = "img/logo.png";
    });
  }

  function animateChart(perf) {
    if (chartAnimRaf) cancelAnimationFrame(chartAnimRaf);
    const start = performance.now();
    const dur = 1200;

    const pad = {l:64,r:64,t:28,b:54};
    const x0 = pad.l, y0 = pad.t;
    const x1 = canvas.width-pad.r, y1 = canvas.height-pad.b;

    const rpmMin = perf.rpm[0];
    const rpmMax = perf.rpm.at(-1);
    const psMax = Math.max(...perf.stdPSCurve,...perf.stgPSCurve)*1.08;
    const nmMax = Math.max(...perf.stdNmCurve,...perf.stgNmCurve)*1.08;

    const mapX = r => x0+(r-rpmMin)/(rpmMax-rpmMin)*(x1-x0);
    const mapYps = v => y1-(v/psMax)*(y1-y0);
    const mapYnm = v => y1-(v/nmMax)*(y1-y0);

    const xs = perf.rpm.map(mapX);
    const ys = {
      psS: perf.stdPSCurve.map(mapYps),
      psT: perf.stgPSCurve.map(mapYps),
      nmS: perf.stdNmCurve.map(mapYnm),
      nmT: perf.stgNmCurve.map(mapYnm)
    };

    const tick = now => {
      const t = Math.min((now-start)/dur,1);
      ctx.clearRect(0,0,canvas.width,canvas.height);

      ctx.strokeStyle="rgba(255,255,255,.08)";
      for(let i=0;i<=12;i++){
        const x=x0+(x1-x0)*i/12;
        ctx.beginPath();ctx.moveTo(x,y0);ctx.lineTo(x,y1);ctx.stroke();
      }

      const draw=(arr,col)=>{
        ctx.strokeStyle=col;ctx.beginPath();
        arr.slice(0,Math.floor(arr.length*t)).forEach((y,i)=>{
          i?ctx.lineTo(xs[i],y):ctx.moveTo(xs[i],y);
        });
        ctx.stroke();
      };

      draw(ys.psS,"#f1c40f");
      draw(ys.psT,"#ffd56a");
      draw(ys.nmS,"#ff2b2b");
      draw(ys.nmT,"#ff6a6a");

      if(t<1) chartAnimRaf=requestAnimationFrame(tick);
    };
    chartAnimRaf=requestAnimationFrame(tick);
  }

  /* =========================================================
     Logic
     ========================================================= */
  function init(){
    fillSelect(selBrand,Object.keys(DB));
    resetSelect(selModel);
    resetSelect(selGen);
    resetSelect(selEngine);
    closePanel();
  }

  function onBrand(){
    resetSelect(selModel,false);
    resetSelect(selGen);
    resetSelect(selEngine);
    closePanel();
    fillSelect(selModel,Object.keys(DB[selBrand.value]||{}));
  }

  function onModel(){
    resetSelect(selGen,false);
    resetSelect(selEngine);
    closePanel();
    fillSelect(selGen,Object.keys(DB[selBrand.value][selModel.value]||{}));
  }

  function onGen(){
    resetSelect(selEngine,false);
    closePanel();
    fillSelect(selEngine,Object.keys(DB[selBrand.value][selModel.value][selGen.value]||{}));
  }

  async function onEngine(){
    const item = DB?.[selBrand.value]?.[selModel.value]?.[selGen.value]?.[selEngine.value];
    if(!item) return;

    if(!logoImg) logoImg=await loadLogo();

    vehicleTitle.textContent=item.display.title;
    vehicleSub.textContent=item.display.sub||"";

    const p=item.perf;
    psStd.textContent=p.stdPS;
    psStg.textContent=p.stgPS;
    psDiff.textContent=p.stgPS-p.stdPS;
    nmStd.textContent=p.stdNm;
    nmStg.textContent=p.stgNm;
    nmDiff.textContent=p.stgNm-p.stdNm;

    spFuel.textContent=item.specs.fuel;
    spCompression.textContent=item.specs.compression; // ✅ HIER
    spType.textContent=item.specs.type;
    spDisp.textContent=item.specs.displacement;
    spEcu.textContent=item.specs.ecu;
    spEngineCode.textContent=item.specs.engineCode;

    optionGrid.innerHTML="";
    if(item.options?.length){
      optionCard.hidden=false;
      item.options.forEach(k=>{
        if(!OPTION_DEFS[k])return;
        optionGrid.innerHTML+=`<div class="spec-item"><span>${OPTION_DEFS[k]}</span></div>`;
      });
    } else optionCard.hidden=true;

    openPanel();
    setTimeout(()=>animateChart(p),180);
  }

  selBrand.onchange=onBrand;
  selModel.onchange=onModel;
  selGen.onchange=onGen;
  selEngine.onchange=onEngine;
  document.addEventListener("DOMContentLoaded",init);
})();
