(() => {

  /* =========================================================
     OPTIONEN – zentrale Definition
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
     DATENBANK (Testfahrzeug)
     ========================================================= */
  const DB = {
    "Audi": {
      "A3": {
        "8P (2003–2012)": {
          "2.0 TDI CR 140 PS": {
            display: {
              title: "Audi A3 8P 2.0 TDI CR 140 PS",
              sub: ""
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
     DOM ELEMENTE
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

  const spFuel        = document.getElementById("spFuel");
  const spCompression = document.getElementById("spCompression");
  const spType        = document.getElementById("spType");
  const spDisp        = document.getElementById("spDisp");
  const spEcu         = document.getElementById("spEcu");
  const spEngineCode  = document.getElementById("spEngineCode");

  const optionCard = document.getElementById("optionCard");
  const optionGrid = document.getElementById("optionGrid");

  const canvas = document.getElementById("perfChart");
  const ctx    = canvas ? canvas.getContext("2d", { alpha:true }) : null;

  let logoImg = null;
  let chartRAF = null;

  /* =========================================================
     HILFSFUNKTIONEN
     ========================================================= */
  function resetSelect(el, disabled = true) {
    el.innerHTML = `<option value="">Bitte wählen…</option>`;
    el.disabled = disabled;
    el.value = "";
  }

  function fillSelect(el, list) {
    list.forEach(v => {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      el.appendChild(o);
    });
  }

  function closePanel() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden","true");
    if (chartRAF) cancelAnimationFrame(chartRAF);
    chartRAF = null;
    if (ctx) ctx.clearRect(0,0,canvas.width,canvas.height);
  }

  function openPanel() {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden","false");
  }

  function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }
  function lerp(a,b,t){ return a+(b-a)*t; }

  /* =========================================================
     LOGO
     ========================================================= */
  function loadLogo() {
    return new Promise(res=>{
      const i=new Image();
      i.onload=()=>res(i);
      i.onerror=()=>res(null);
      i.src="img/logo.png";
    });
  }

  /* =========================================================
     CHART (EXAKT WIE VORHER)
     ========================================================= */
  function animateChart(perf) {
    if(!ctx) return;

    const W=canvas.width, H=canvas.height;
    const padL=64,padR=64,padT=28,padB=54;
    const x0=padL, y0=padT, x1=W-padR, y1=H-padB;

    const rpmMin=perf.rpm[0], rpmMax=perf.rpm.at(-1);
    const psMax=Math.max(...perf.stdPSCurve,...perf.stgPSCurve)*1.08;
    const nmMax=Math.max(...perf.stdNmCurve,...perf.stgNmCurve)*1.08;

    const mapX=r=>x0+((r-rpmMin)/(rpmMax-rpmMin))*(x1-x0);
    const mapYps=v=>y1-(v/psMax)*(y1-y0);
    const mapYnm=v=>y1-(v/nmMax)*(y1-y0);

    const xs=perf.rpm.map(mapX);
    const psS=perf.stdPSCurve.map(mapYps);
    const psT=perf.stgPSCurve.map(mapYps);
    const nmS=perf.stdNmCurve.map(mapYnm);
    const nmT=perf.stgNmCurve.map(mapYnm);

    const start=performance.now(), dur=1200;

    function drawLine(ys,color,t){
      const u=Math.floor(lerp(1,ys.length,t));
      ctx.beginPath();
      ctx.strokeStyle=color;
      ctx.lineWidth=2.6;
      for(let i=0;i<u;i++){
        if(i===0) ctx.moveTo(xs[i],ys[i]);
        else ctx.lineTo(xs[i],ys[i]);
      }
      ctx.stroke();
    }

    function tick(now){
      const t=clamp((now-start)/dur,0,1);
      const e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;

      ctx.clearRect(0,0,W,H);
      drawLine(psS,"#f1c40f",e);
      drawLine(psT,"#ffd56a",e);
      drawLine(nmS,"#ff2b2b",e);
      drawLine(nmT,"#ff6a6a",e);

      if(t<1) chartRAF=requestAnimationFrame(tick);
    }
    chartRAF=requestAnimationFrame(tick);
  }

  /* =========================================================
     LOGIK
     ========================================================= */
  function init(){
    fillSelect(selBrand,Object.keys(DB));
    resetSelect(selModel,true);
    resetSelect(selGen,true);
    resetSelect(selEngine,true);
    closePanel();
  }

  function onBrand(){
    resetSelect(selModel,true);
    resetSelect(selGen,true);
    resetSelect(selEngine,true);
    closePanel();
    if(!selBrand.value) return;
    resetSelect(selModel,false);
    fillSelect(selModel,Object.keys(DB[selBrand.value]));
  }

  function onModel(){
    resetSelect(selGen,true);
    resetSelect(selEngine,true);
    closePanel();
    if(!selModel.value) return;
    resetSelect(selGen,false);
    fillSelect(selGen,Object.keys(DB[selBrand.value][selModel.value]));
  }

  function onGen(){
    resetSelect(selEngine,true);
    closePanel();
    if(!selGen.value) return;
    resetSelect(selEngine,false);
    fillSelect(selEngine,Object.keys(DB[selBrand.value][selModel.value][selGen.value]));
  }

  async function onEngine(){
    closePanel();
    const item=DB?.[selBrand.value]?.[selModel.value]?.[selGen.value]?.[selEngine.value];
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
    spCompression.textContent=item.specs.compression;
    spType.textContent=item.specs.type;
    spDisp.textContent=item.specs.displacement;
    spEcu.textContent=item.specs.ecu;
    spEngineCode.textContent=item.specs.engineCode;

    optionGrid.innerHTML="";
    if(item.options?.length){
      optionCard.hidden=false;
      item.options.forEach(k=>{
        const d=document.createElement("div");
        d.className="spec-item";
        d.innerHTML=`<span>${OPTION_DEFS[k]}</span>`;
        optionGrid.appendChild(d);
      });
    } else optionCard.hidden=true;

    openPanel();
    setTimeout(()=>animateChart(item.perf),200);
  }

  /* =========================================================
     EVENTS
     ========================================================= */
  selBrand.addEventListener("change",onBrand);
  selModel.addEventListener("change",onModel);
  selGen.addEventListener("change",onGen);
  selEngine.addEventListener("change",onEngine);
  document.addEventListener("DOMContentLoaded",init);

})();
