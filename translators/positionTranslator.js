const {
  nbaPositions,
  ignoredNbaPositions,
  mlbPositions,
  ignoredMlbPositions,
  nflPositions,
  ignoredNflPositions,
  nflePositions,
  ignoredNflePositions,
  nhlPositions,
  ignoredNhlPositions,
  ncaabbPositions,
  ignoredncaabbPositions,
  ncaafbPositions,
  ncaafbePositions,
  ignoredNcaafbPositions,
  ignoredNcaafbEPositions,
} = require('../positions/index');

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

    case "ncaabb":
      return ncaabbPositions[positionText];

    case "ncaafb":
      return ncaafbPositions[positionText];

    case "ncaafbe":
      return ncaafbePositions[positionText];
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

    case "ncaabb":
      return ignoredncaabbPositions;

    case "ncaafb":
      return ignoredNcaafbPositions;

    case "ncaafbe":
      return ignoredNcaafbEPositions;
  }
}

module.exports = {
  translatePosition,
  getIgnoredPositions,
};
