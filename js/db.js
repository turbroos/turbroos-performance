/* =========================================================
   db.js  (NUR Datenbank / NUR Konstanten)
   ========================================================= */

// =======================
// Basis-Initialisierung
// =======================
window.DB = window.DB || {};
window.DB.Audi = window.DB.Audi || {};

// =======================
// Kurven-Templates
// =======================
window.CURVES = {
  petrol: {
    rpm: [800,1200,1600,2000,2500,3000,3500,4000,4500,5000],
    ps:  [0.15,0.30,0.55,0.75,0.88,0.95,1.00,0.98,0.90,0.70],
    nm:  [0.40,0.75,0.95,1.00,1.00,0.97,0.90,0.80,0.65,0.45]
  },
  diesel: {
    rpm: [800,1200,1600,2000,2500,3000,3500,4000,4500],
    ps:  [0.10,0.30,0.55,0.75,0.90,1.00,0.98,0.90,0.70],
    nm:  [0.55,0.85,1.00,1.00,0.95,0.85,0.70,0.55,0.40]
  }
};

// =======================
// Curve-Scaler
// =======================
window.scaleCurve = function (base, peak) {
  return base.map(v => Math.round(v * peak));
};

// =======================
// Option Labels
// =======================
window.OPTION_DEFS = {
  EGR_OFF: "EGR OFF",
  DPF_OFF: "DPF OFF",
  DTC_REMOVAL: "DTC Removal",
  START_STOP_OFF: "Start/Stop OFF",
  FLAPS: "Flaps",
  VMAX: "Vmax",
  ADBLUE: "AdBlue",
  POP_BANG: "Pop & Bang / Crackle map",
  DECAT: "Decat",
  ANTILAG: "Anti Lag"
};

////////////////////////////////////////////////////////////
// AUDI 80
////////////////////////////////////////////////////////////
window.DB.Audi["80"] = {
  "B4 (1991–1995)": {
    "1.9 TDI 90hp": {
      display: { title: "Audi 80 1.9 TDI 90hp" },
      perf: {
        stdPS: 90, stgPS: 115,
        stdNm: 202, stgNm: 260,
        rpm: CURVES.diesel.rpm,
        stdPSCurve: scaleCurve(CURVES.diesel.ps, 90),
        stgPSCurve: scaleCurve(CURVES.diesel.ps, 115),
        stdNmCurve: scaleCurve(CURVES.diesel.nm, 202),
        stgNmCurve: scaleCurve(CURVES.diesel.nm, 260)
      },
      specs: {
        fuel: "diesel",
        compression: "19.5 : 1",
        type: "Stage 1",
        displacement: "1896 cc",
        ecu: "Bosch",
        engineCode: "1Z"
      },
      options: ["EGR_OFF","DPF_OFF","DTC_REMOVAL","FLAPS","VMAX","ADBLUE"]
    }
  }
};

////////////////////////////////////////////////////////////
// AUDI A1
////////////////////////////////////////////////////////////
window.DB.Audi.A1 = {
  "8X (2010–2014)": {

    "1.2 TFSI 105hp": {
      display: { title: "Audi A1 1.2 TFSI 105hp" },
      perf: {
        stdPS:105, stgPS:140,
        stdNm:175, stgNm:225,
        rpm: CURVES.petrol.rpm,
        stdPSCurve: scaleCurve(CURVES.petrol.ps,105),
        stgPSCurve: scaleCurve(CURVES.petrol.ps,140),
        stdNmCurve: scaleCurve(CURVES.petrol.nm,175),
        stgNmCurve: scaleCurve(CURVES.petrol.nm,225)
      },
      specs:{
        fuel:"petrol",
        compression:"10.0 : 1",
        type:"Stage 1",
        displacement:"1197 cc",
        ecu:"Simos 10",
        engineCode:"CBZA"
      },
      options:["DTC_REMOVAL","POP_BANG","START_STOP_OFF","DECAT","FLAPS","VMAX"]
    },

    "1.6 TDI CR 90hp": {
      display: { title: "Audi A1 1.6 TDI CR 90hp" },
      perf: {
        stdPS:90, stgPS:140,
        stdNm:230, stgNm:320,
        rpm: CURVES.diesel.rpm,
        stdPSCurve: scaleCurve(CURVES.diesel.ps,90),
        stgPSCurve: scaleCurve(CURVES.diesel.ps,140),
        stdNmCurve: scaleCurve(CURVES.diesel.nm,230),
        stgNmCurve: scaleCurve(CURVES.diesel.nm,320)
      },
      specs:{
        fuel:"diesel",
        compression:"16.5 : 1",
        type:"Stage 1",
        displacement:"1598 cc",
        ecu:"PCR 2.1",
        engineCode:"CAYB"
      },
      options:["EGR_OFF","DPF_OFF","DTC_REMOVAL","START_STOP_OFF","FLAPS","VMAX","ADBLUE"]
    }
  }
};

////////////////////////////////////////////////////////////
// AUDI A3
////////////////////////////////////////////////////////////
window.DB.Audi.A3 = {
  "8P (2003–2008)": {

    "1.6 FSI 115hp": {
      display:{ title:"Audi A3 1.6 FSI 115hp" },
      perf:{
        stdPS:115, stgPS:125,
        stdNm:155, stgNm:170,
        rpm: CURVES.petrol.rpm,
        stdPSCurve: scaleCurve(CURVES.petrol.ps,115),
        stgPSCurve: scaleCurve(CURVES.petrol.ps,125),
        stdNmCurve: scaleCurve(CURVES.petrol.nm,155),
        stgNmCurve: scaleCurve(CURVES.petrol.nm,170)
      },
      specs:{
        fuel:"petrol",
        compression:"12.0 : 1",
        type:"Stage 1",
        displacement:"1598 cc",
        ecu:"Bosch MED9.5.10",
        engineCode:"BLF"
      },
      options:["DTC_REMOVAL","POP_BANG","DECAT","FLAPS","VMAX","ANTILAG"]
    },

    "1.9 TDI 105hp": {
      display:{ title:"Audi A3 1.9 TDI 105hp" },
      perf:{
        stdPS:105, stgPS:140,
        stdNm:250, stgNm:340,
        rpm: CURVES.diesel.rpm,
        stdPSCurve: scaleCurve(CURVES.diesel.ps,105),
        stgPSCurve: scaleCurve(CURVES.diesel.ps,140),
        stdNmCurve: scaleCurve(CURVES.diesel.nm,250),
        stgNmCurve: scaleCurve(CURVES.diesel.nm,340)
      },
      specs:{
        fuel:"diesel",
        compression:"19.0 : 1",
        type:"Stage 1",
        displacement:"1896 cc",
        ecu:"Bosch EDC16U1",
        engineCode:"BKC"
      },
      options:["EGR_OFF","DPF_OFF","DTC_REMOVAL","FLAPS","VMAX","ADBLUE"]
    }

  }
};
