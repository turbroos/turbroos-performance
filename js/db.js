/* =========================================================
   db.js  (NUR Datenbank / NUR Konstanten)
   ========================================================= */
const CURVES = {
  petrol: {
    rpm: [800, 1200, 1600, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
    ps:  [0.15, 0.30, 0.55, 0.75, 0.88, 0.95, 1.00, 0.98, 0.90, 0.70],
    nm:  [0.40, 0.75, 0.95, 1.00, 1.00, 0.97, 0.90, 0.80, 0.65, 0.45]
  },
  diesel: {
    rpm: [800, 1200, 1600, 2000, 2500, 3000, 3500, 4000, 4500],
    ps:  [0.10, 0.30, 0.55, 0.75, 0.90, 1.00, 0.98, 0.90, 0.70],
    nm:  [0.55, 0.85, 1.00, 1.00, 0.95, 0.85, 0.70, 0.55, 0.40]
  }
};

function scaleCurve(base, peak) {
  return base.map(v => Math.round(v * peak));
}


window.OPTION_DEFS = {
  EGR_OFF:        "EGR OFF",
  DPF_OFF:        "DPF OFF",
  DTC_REMOVAL:    "DTC Removal",
  START_STOP_OFF: "Start/Stop OFF",
  FLAPS:          "Flaps",
  VMAX:           "Vmax",
  ADBLUE:         "AdBlue",
  // optional später:
  // POP_BANG: "Pop & Bang / Crackle",
  // DECAT: "Decat",
  // ANTILAG: "Anti Lag"
};

DB.Audi = {
  A3: {
    "8P (2003–2008)": {

      "1.6 FSI 115hp": {
        display: { title: "Audi A3 1.6 FSI 115hp" },
        perf: {
          stdPS: 115, stgPS: 125,
          stdNm: 155, stgNm: 170,
          rpm: CURVES.petrol.rpm,
          stdPSCurve: scaleCurve(CURVES.petrol.ps, 115),
          stgPSCurve: scaleCurve(CURVES.petrol.ps, 125),
          stdNmCurve: scaleCurve(CURVES.petrol.nm, 155),
          stgNmCurve: scaleCurve(CURVES.petrol.nm, 170)
        },
        specs: {
          fuel: "petrol",
          compression: "12.0 : 1",
          type: "Stage 1",
          displacement: "1598 cc",
          ecu: "Bosch MED9.5.10",
          engineCode: "BLF"
        },
        options: ["DTC_REMOVAL", "POP_BANG", "DECAT", "FLAPS", "VMAX", "ANTILAG"]
      },

      "1.6i 102hp": {
        display: { title: "Audi A3 1.6i 102hp" },
        perf: {
          stdPS: 102, stgPS: 112,
          stdNm: 148, stgNm: 163,
          rpm: CURVES.petrol.rpm,
          stdPSCurve: scaleCurve(CURVES.petrol.ps, 102),
          stgPSCurve: scaleCurve(CURVES.petrol.ps, 112),
          stdNmCurve: scaleCurve(CURVES.petrol.nm, 148),
          stgNmCurve: scaleCurve(CURVES.petrol.nm, 163)
        },
        specs: {
          fuel: "petrol",
          compression: "10.3 : 1",
          type: "Stage 1",
          displacement: "1595 cc",
          ecu: "Siemens Simos 7.1",
          engineCode: "BSE"
        },
        options: ["DTC_REMOVAL", "DECAT", "FLAPS", "VMAX"]
      },

      "1.8 TFSI 160hp": {
        display: { title: "Audi A3 1.8 TFSI 160hp" },
        perf: {
          stdPS: 160, stgPS: 210,
          stdNm: 280, stgNm: 340,
          rpm: CURVES.petrol.rpm,
          stdPSCurve: scaleCurve(CURVES.petrol.ps, 160),
          stgPSCurve: scaleCurve(CURVES.petrol.ps, 210),
          stdNmCurve: scaleCurve(CURVES.petrol.nm, 280),
          stgNmCurve: scaleCurve(CURVES.petrol.nm, 340)
        },
        specs: {
          fuel: "petrol",
          compression: "9.6 : 1",
          type: "Stage 1",
          displacement: "1798 cc",
          ecu: "Bosch MED17.5",
          engineCode: "BZB"
        },
        options: ["DTC_REMOVAL", "POP_BANG", "START_STOP_OFF", "DECAT", "FLAPS", "VMAX"]
      },

      "2.0 TFSI 200hp": {
        display: { title: "Audi A3 2.0 TFSI 200hp" },
        perf: {
          stdPS: 200, stgPS: 250,
          stdNm: 280, stgNm: 380,
          rpm: CURVES.petrol.rpm,
          stdPSCurve: scaleCurve(CURVES.petrol.ps, 200),
          stgPSCurve: scaleCurve(CURVES.petrol.ps, 250),
          stdNmCurve: scaleCurve(CURVES.petrol.nm, 280),
          stgNmCurve: scaleCurve(CURVES.petrol.nm, 380)
        },
        specs: {
          fuel: "petrol",
          compression: "10.5 : 1",
          type: "Stage 1",
          displacement: "1984 cc",
          ecu: "Bosch MED17.5",
          engineCode: "BWA"
        },
        options: ["DTC_REMOVAL", "POP_BANG", "START_STOP_OFF", "DECAT", "FLAPS", "VMAX"]
      },

      "3.2 V6 250hp": {
        display: { title: "Audi A3 3.2 V6 250hp" },
        perf: {
          stdPS: 250, stgPS: 265,
          stdNm: 320, stgNm: 340,
          rpm: CURVES.petrol.rpm,
          stdPSCurve: scaleCurve(CURVES.petrol.ps, 250),
          stgPSCurve: scaleCurve(CURVES.petrol.ps, 265),
          stdNmCurve: scaleCurve(CURVES.petrol.nm, 320),
          stgNmCurve: scaleCurve(CURVES.petrol.nm, 340)
        },
        specs: {
          fuel: "petrol",
          compression: "11.3 : 1",
          type: "Stage 1",
          displacement: "3189 cc",
          ecu: "Bosch ME7.1.1",
          engineCode: "BMJ"
        },
        options: ["DTC_REMOVAL", "POP_BANG", "DECAT", "FLAPS", "VMAX", "ANTILAG"]
      },

      "1.9 TDI 105hp": {
        display: { title: "Audi A3 1.9 TDI 105hp" },
        perf: {
          stdPS: 105, stgPS: 140,
          stdNm: 250, stgNm: 340,
          rpm: CURVES.diesel.rpm,
          stdPSCurve: scaleCurve(CURVES.diesel.ps, 105),
          stgPSCurve: scaleCurve(CURVES.diesel.ps, 140),
          stdNmCurve: scaleCurve(CURVES.diesel.nm, 250),
          stgNmCurve: scaleCurve(CURVES.diesel.nm, 340)
        },
        specs: {
          fuel: "diesel",
          compression: "19.0 : 1",
          type: "Stage 1",
          displacement: "1896 cc",
          ecu: "Bosch EDC16U1",
          engineCode: "BKC"
        },
        options: ["EGR_OFF", "DPF_OFF", "DTC_REMOVAL", "FLAPS", "VMAX", "ADBLUE"]
      }

      "2.0 TDI 136hp": {
        display: { title: "Audi A3 2.0 TDI 136hp" },
        perf: {
          stdPS: 136, stgPS: 175,
          stdNm: 320, stgNm: 395,
          rpm: CURVES.diesel.rpm,
          stdPSCurve: scaleCurve(CURVES.diesel.ps, 136),
          stgPSCurve: scaleCurve(CURVES.diesel.ps, 175),
          stdNmCurve: scaleCurve(CURVES.diesel.nm, 320),
          stgNmCurve: scaleCurve(CURVES.diesel.nm, 395)
        },
        specs: {
          fuel: "diesel",
          compression: "18.0 : 1",
          type: "Stage 1",
          displacement: "1968 cc",
          ecu: "Bosch EDC16U",
          engineCode: "BMM"
        },
        options: ["EGR_OFF", "DPF_OFF", "DTC_REMOVAL", "START_STOP_OFF", "FLAPS", "VMAX", "ADBLUE"]
      },

      "2.0 TDI DPF 136hp": {
        display: { title: "Audi A3 2.0 TDI DPF 136hp" },
        perf: {
          stdPS: 136, stgPS: 175,
          stdNm: 320, stgNm: 380,
          rpm: CURVES.diesel.rpm,
          stdPSCurve: scaleCurve(CURVES.diesel.ps, 136),
          stgPSCurve: scaleCurve(CURVES.diesel.ps, 175),
          stdNmCurve: scaleCurve(CURVES.diesel.nm, 320),
          stgNmCurve: scaleCurve(CURVES.diesel.nm, 380)
        },
        specs: {
          fuel: "diesel",
          compression: "18.0 : 1",
          type: "Stage 1",
          displacement: "1968 cc",
          ecu: "Bosch EDC16U",
          engineCode: "AZV"
        },
        options: ["EGR_OFF", "DPF_OFF", "DTC_REMOVAL", "START_STOP_OFF", "FLAPS", "VMAX", "ADBLUE"]
      },

      "2.0 TDI DPF 140hp": {
        display: { title: "Audi A3 2.0 TDI DPF 140hp" },
        perf: {
          stdPS: 140, stgPS: 175,
          stdNm: 320, stgNm: 380,
          rpm: CURVES.diesel.rpm,
          stdPSCurve: scaleCurve(CURVES.diesel.ps, 140),
          stgPSCurve: scaleCurve(CURVES.diesel.ps, 175),
          stdNmCurve: scaleCurve(CURVES.diesel.nm, 320),
          stgNmCurve: scaleCurve(CURVES.diesel.nm, 380)
        },
        specs: {
          fuel: "diesel",
          compression: "18.0 : 1",
          type: "Stage 1",
          displacement: "1968 cc",
          ecu: "Bosch EDC16U",
          engineCode: "AZV"
        },
        options: ["EGR_OFF", "DPF_OFF", "DTC_REMOVAL", "START_STOP_OFF", "FLAPS", "VMAX", "ADBLUE"]
      },

      "2.0 TDI DPF 163hp": {
        display: { title: "Audi A3 2.0 TDI DPF 163hp" },
        perf: {
          stdPS: 163, stgPS: 200,
          stdNm: 350, stgNm: 420,
          rpm: CURVES.diesel.rpm,
          stdPSCurve: scaleCurve(CURVES.diesel.ps, 163),
          stgPSCurve: scaleCurve(CURVES.diesel.ps, 200),
          stdNmCurve: scaleCurve(CURVES.diesel.nm, 350),
          stgNmCurve: scaleCurve(CURVES.diesel.nm, 420)
        },
        specs: {
          fuel: "diesel",
          compression: "18.0 : 1",
          type: "Stage 1",
          displacement: "1968 cc",
          ecu: "Bosch EDC17",
          engineCode: "BUY"
        },
        options: ["EGR_OFF", "DPF_OFF", "DTC_REMOVAL", "START_STOP_OFF", "FLAPS", "VMAX", "ADBLUE"]
      },

      "2.0 TDI DPF 170hp": {
        display: { title: "Audi A3 2.0 TDI DPF 170hp" },
        perf: {
          stdPS: 170, stgPS: 200,
          stdNm: 350, stgNm: 420,
          rpm: CURVES.diesel.rpm,
          stdPSCurve: scaleCurve(CURVES.diesel.ps, 170),
          stgPSCurve: scaleCurve(CURVES.diesel.ps, 200),
          stdNmCurve: scaleCurve(CURVES.diesel.nm, 350),
          stgNmCurve: scaleCurve(CURVES.diesel.nm, 420)
        },
        specs: {
          fuel: "diesel",
          compression: "18.0 : 1",
          type: "Stage 1",
          displacement: "1968 cc",
          ecu: "Bosch EDC17",
          engineCode: "BMM / BMN"
        },
        options: ["EGR_OFF", "DPF_OFF", "DTC_REMOVAL", "START_STOP_OFF", "FLAPS", "VMAX", "ADBLUE"]
      }

       
    }
  }
};
