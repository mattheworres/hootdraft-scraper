"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateTeam = void 0;

var _index = require("../teams/index");

var translateTeam = function translateTeam(sport, teamText) {
  switch (sport) {
    case "nba":
      return _index.nbaTeams[teamText];

    case "nfl":
    case "nfle":
      return _index.nflTeams[teamText];

    case "nhl":
      return _index.nhlTeams[teamText];

    case "mlb":
      return _index.mlbTeams[teamText];

    case "ncaabb":
      return _index.ncaabbTeams[teamText];

    case "ncaafb":
    case "ncaafbe":
      return _index.ncaafbTeams[teamText];
  }
};

exports.translateTeam = translateTeam;