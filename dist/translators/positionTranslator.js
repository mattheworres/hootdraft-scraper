"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translatePosition = exports.getIgnoredPositions = void 0;

var _positions = require("../positions");

var translatePosition = function translatePosition(sport, positionText) {
  switch (sport) {
    case "nba":
      return _positions.nbaPositions[positionText];

    case "nfl":
      return _positions.nflPositions[positionText];

    case "nfle":
      return _positions.nflePositions[positionText];

    case "nhl":
      return _positions.nhlPositions[positionText];

    case "mlb":
      return _positions.mlbPositions[positionText];

    case "ncaabb":
      return _positions.ncaabbPositions[positionText];

    case "ncaafb":
      return _positions.ncaafbPositions[positionText];

    case "ncaafbe":
      return _positions.ncaafbePositions[positionText];
  }
};

exports.translatePosition = translatePosition;

var getIgnoredPositions = function getIgnoredPositions(sport) {
  switch (sport) {
    case "nba":
      return _positions.ignoredNbaPositions;

    case "nfl":
      return _positions.ignoredNflPositions;

    case "nfle":
      return _positions.ignoredNflePositions;

    case "nhl":
      return _positions.ignoredNhlPositions;

    case "mlb":
      return _positions.ignoredMlbPositions;

    case "ncaabb":
      return _positions.ignoredncaabbPositions;

    case "ncaafb":
      return _positions.ignoredNcaafbPositions;

    case "ncaafbe":
      return _positions.ignoredNcaafbEPositions;
  }
};

exports.getIgnoredPositions = getIgnoredPositions;