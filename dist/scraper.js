"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _teamScraper = require("./teamScraper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validSports = ['nba', 'mlb', 'nfle', 'nfl', 'nhl', 'ncaabb', 'ncaafb', 'ncaafbe'];
var sport = process.argv.slice(2)[0];
var debugVal = process.argv.slice(3)[0];
var debugEnabled = !!debugVal;
1;

if (sport === undefined || sport.length === 0 || _lodash["default"].includes(validSports, sport.toLowerCase()) === false) {
  console.warn("Can't scrape - need a valid sport value to scrape for (".concat(sport, "), like ").concat(validSports.join(', '), " - OK?"));
} else {
  (0, _teamScraper.scrapeTeams)(sport, debugEnabled);
}