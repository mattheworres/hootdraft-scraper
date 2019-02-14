const {nbaPositions, ignoredNbaPositions} = require('./nba');
const {nhlPositions, ignoredNhlPositions} = require('./nhl');
const {mlbPositions, ignoredMlbPositions} = require('./mlb');
const {ncaabbPositions, ignoredncaabbPositions} = require('./ncaabb');
const {
  nflPositions,
  ignoredNflPositions,
  nflePositions,
  ignoredNflePositions,
} = require('./nfl');
const {
  ncaafbPositions,
  ignoredNcaafbPositions,
  ncaafbePositions,
  ignoredNcaafbEPositions,
} = require('./ncaafb');

module.exports = {
  nbaPositions,
  ignoredNbaPositions,
  nflPositions,
  ignoredNflPositions,
  nflePositions,
  ignoredNflePositions,
  nhlPositions,
  ignoredNhlPositions,
  mlbPositions,
  ignoredMlbPositions,
  ncaabbPositions,
  ignoredncaabbPositions,
  ncaafbPositions,
  ignoredNcaafbPositions,
  ncaafbePositions,
  ignoredNcaafbEPositions,
};
