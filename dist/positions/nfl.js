"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nflePositionsRequiringNameTranslation = exports.nflePositions = exports.nflPositionsRequiringNameTranslation = exports.nflPositions = exports.ignoredNflePositions = exports.ignoredNflPositions = void 0;
var nflPositions = {
  "QB": "QB",
  "RB": "RB",
  "FB": "RB",
  "WR": "WR",
  "TE": "TE",
  "DEF": "DEF",
  "DST": "DEF",
  "K": "K"
};
exports.nflPositions = nflPositions;
var ignoredNflPositions = ["DL", "DT", "DE", "LB", "OLB", "ILB", "MLB", "DB", "CB", "S", "SS", "FS", "SAF", "OL", "T", "NT", "C", "G", "P", "LS", "TQB", "ST", "D", "OT", "OG"];
exports.ignoredNflPositions = ignoredNflPositions;
var nflePositions = {
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
  "OT": "OL",
  "OG": "OL"
};
exports.nflePositions = nflePositions;
var ignoredNflePositions = ["P", "LS", "TQB", "ST", "D"];
exports.ignoredNflePositions = ignoredNflePositions;
var nflPositionsRequiringNameTranslation = ["DEF"];
exports.nflPositionsRequiringNameTranslation = nflPositionsRequiringNameTranslation;
var nflePositionsRequiringNameTranslation = ["DEF"];
exports.nflePositionsRequiringNameTranslation = nflePositionsRequiringNameTranslation;