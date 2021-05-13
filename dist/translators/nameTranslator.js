"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateName = void 0;

var _index = require("../positions/index");

var _nflNameTranslator = require("./nflNameTranslator");

var translateName = function translateName(sport, positionText, teamText, nameText) {
  var translatedPositions = getListOfTranslatedPositions(sport);
  if (!translatedPositions || translatedPositions.indexOf(positionText) === -1) return nameText;

  switch (sport) {
    case "nfl":
    case "nfle":
      return (0, _nflNameTranslator.nflNameTranslator)(positionText, teamText, nameText);

    default:
      return nameText;
  }
};

exports.translateName = translateName;

var getListOfTranslatedPositions = function getListOfTranslatedPositions(sport) {
  switch (sport) {
    case "nba":
      return _index.nbaPositionsRequiringNameTranslation;

    case "nfl":
      return _index.nflPositionsRequiringNameTranslation;

    case "nfle":
      return _index.nflePositionsRequiringNameTranslation;

    case "nhl":
      return _index.nhlPositionsRequiringNameTranslation;

    case "mlb":
      return _index.mlbPositionsRequiringNameTranslation;

    case "ncaabb":
      return _index.ncaabbPositionsRequiringNameTranslation;

    case "ncaafb":
      return _index.ncaafbPositionsRequiringNameTranslation;

    case "ncaafbe":
      return _index.ncaaFbePositionsRequiringNameTranslation;
  }
};