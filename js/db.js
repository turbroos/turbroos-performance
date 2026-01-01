/* =========================================================
   db.js  (NUR Datenbank / NUR Konstanten)
   ========================================================= */

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

window.DB = {
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
            compression: "18.00 : 1",
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
