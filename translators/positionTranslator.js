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
  ncaamPositions,
  ignoredNcaamPositions,
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

    case "ncaam":
      return ncaamPositions[positionText];
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

    case "ncaam":
      return ignoredNcaamPositions;
  }
}

module.exports = {
  translatePosition,
  getIgnoredPositions,
};
