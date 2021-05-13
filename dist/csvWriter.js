"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeToCsv = void 0;

var _csvWriter = require("csv-writer");

var writeToCsv = function writeToCsv(sport, players) {
  var csvWriter = (0, _csvWriter.createObjectCsvWriter)({
    path: "".concat(sport, "_players.csv"),
    fieldDelimiter: ';',
    header: [{
      id: 'player',
      title: 'Player'
    }, {
      id: 'position',
      title: 'Position'
    }, {
      id: 'team',
      title: 'Team'
    }]
  });
  return csvWriter.writeRecords(players);
};

exports.writeToCsv = writeToCsv;