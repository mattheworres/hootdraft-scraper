const translatePosition = (sport, positionText) => {
  switch (sport) {
    case "nba":
      return nbaPositions[positionText];

    case "nfl":
      return nflPositions[positionText];

    case "nfle":
      return nflePositions[positionText];

    case "nhl":
      return nhlPositions[positionText];

    case "mlb":
      return mlbPositions[positionText];
  }
};

const getIgnoredPositions = sport => {
  switch(sport) {
    case "nba":
      return ignoredNbaPositions;

    case "nfl":
      return ignoredNflPositions;

    case "nfle":
      return ignoredNflePositions;

    case "nhl":
      return ignoredNhlPositions;

    case "mlb":
      return ignoredMlbPositions;
  }
}

module.exports = {
  translatePosition,
  getIgnoredPositions,
};

const nbaPositions = {
  "PG": "PG",
  "SG": "SG",
  "G": "SG",
  "SF": "SF",
  "F": "SF",
  "PF": "PF",
  "C": "C",
};

const ignoredNbaPositions = [

];

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

const ignoredNflePositions = [
  "P",
  "LS",
  "TQB",
  "ST",
  "D",
];

const nhlPositions = {
  "LW": "LW",
  "C": "C",
  "RW": "RW",
  "D": "D",
  "G": "G",
};

const ignoredNhlPositions = [
  "TG",
];

const mlbPositions = {
  "C": "C",
  "1B": "1B",
  "2B": "2B",
  "3B": "3B",
  "SS": "SS",
  "OF": "OF",
  "CF": "OF",
  "LF": "OF",
  "RF": "OF",
  "UTIL": "UTIL",
  "DH": "UTIL",
  "SP": "SP",
  "RP": "RP",
  "P": "RP",
};

const ignoredMlbPositions = [
  "PS",
];
