const ncaafbPositions = {
  "QB": "QB",
  "RB": "RB",
  "FB": "RB",
  "WR": "WR",
  "TE": "TE",
  "DEF": "DEF",
  "DST": "DEF",
  "K": "K",
};

const ignoredNcaafbPositions = [
  "DL",
  "DT",
  "DE",
  "LB",
  "OLB",
  "ILB",
  "MLB",
  "DB",
  "CB",
  "S",
  "SS",
  "FS",
  "SAF",
  "OL",
  "T",
  "NT",
  "C",
  "G",
  "P",
  "LS",
  "TQB",
  "ST",
  "D",
]

const ncaafbePositions = {
  "QB": "QB",
  "RB": "RB",
  "FB": "RB",
  "WR": "WR",
  "TE": "TE",
  "DEF": "DEF",
  "DST": "DEF",
  "K": "K",
  "DL": "DL",
  "DT": "DL",
  "DE": "DL",
  "NT": "DL",
  "LB": "LB",
  "OLB": "LB",
  "ILB": "LB",
  "MLB": "LB",
  "DB": "DB",
  "CB": "DB",
  "S": "DB",
  "SS": "DB",
  "SAF": "DB",
  "FS": "DB",
  "OL": "OL",
  "T": "OL",
  "C": "OL",
  "G": "OL",
};

const ignoredNcaafbePositions = ["P", "LS", "TQB", "ST", "D"];

const ncaafbPositionsRequiringNameTranslation = [];
const ncaafbePositionsRequiringNameTranslation = [];

export {
  ncaafbPositions,
  ignoredNcaafbPositions,
  ncaafbePositions,
  ignoredNcaafbePositions,
  ncaafbPositionsRequiringNameTranslation,
  ncaafbePositionsRequiringNameTranslation
};
