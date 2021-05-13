"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translate = void 0;

var _nfl = require("../positions/nfl");

var _nfl2 = require("../teams/nfl");

//For now, just doing NFL+NFLE together. Might need split later? hope not.
var translate = function translate(positionText, teamText, nameText) {
  switch (positionText) {
    case _nfl.nflePositions.DEF:
      return _nfl2.nflTeamNames[teamText];

    default:
      return nameText;
  }
};

exports.translate = translate;