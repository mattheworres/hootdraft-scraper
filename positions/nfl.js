const nflPositions = {
  "QB": "QB",
  "RB": "RB",
  "FB": "RB",
  "WR": "WR",
  "TE": "TE",
  "DEF": "DEF",
  "DST": "DEF",
  "K": "K",
};

const ignoredNflPositions = [
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

const nflePositions = {
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

const ignoredNflePositions = ["P", "LS", "TQB", "ST", "D"];

const nflPositionsRequiringNameTranslation = ["DEF"];
const nflePositionsRequiringNameTranslation = ["DEF"];

module.exports = {
  nflPositions,
  ignoredNflPositions,
  nflePositions,
  ignoredNflePositions,
  nflPositionsRequiringNameTranslation,
  nflePositionsRequiringNameTranslation
};
