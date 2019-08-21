const {
  mlbPositionsRequiringNameTranslation,
  nbaPositionsRequiringNameTranslation,
  ncaabbPositionsRequiringNameTranslation,
  ncaafbPositionsRequiringNameTranslation,
  ncaaFbePositionsRequiringNameTranslation,
  nflPositionsRequiringNameTranslation,
  nflePositionsRequiringNameTranslation,
  nhlPositionsRequiringNameTranslation
} = require("../positions/index");

const nflNameTranslator = require("./nflNameTranslator");

const translateName = (sport, positionText, teamText, nameText) => {
  const translatedPositions = getListOfTranslatedPositions(sport);

  if (!translatedPositions || translatedPositions.indexOf(positionText) === -1)
    return nameText;

  switch (sport) {
    case "nfl":
    case "nfle":
      return nflNameTranslator(positionText, teamText, nameText);

    default:
      return nameText;
  }
};

const getListOfTranslatedPositions = sport => {
  switch (sport) {
    case "nba":
      return nbaPositionsRequiringNameTranslation;

    case "nfl":
      return nflPositionsRequiringNameTranslation;

    case "nfle":
      return nflePositionsRequiringNameTranslation;

    case "nhl":
      return nhlPositionsRequiringNameTranslation;

    case "mlb":
      return mlbPositionsRequiringNameTranslation;

    case "ncaabb":
      return ncaabbPositionsRequiringNameTranslation;

    case "ncaafb":
      return ncaafbPositionsRequiringNameTranslation;

    case "ncaafbe":
      return ncaaFbePositionsRequiringNameTranslation;
  }
};

module.exports = translateName;
