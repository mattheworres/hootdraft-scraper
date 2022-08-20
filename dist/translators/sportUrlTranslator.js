"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sportUrlTranslator = void 0;

//Depending on the sport selected, return the string that the data source requires
var sportUrlTranslator = function sportUrlTranslator(sport) {
  switch (sport) {
    case 'ncaabb':
      return 'college-basketball';

    case 'ncaafbe':
    case 'ncaafb':
      return 'college-football';

    case 'nfle':
      return 'nfl';

    default:
      return sport;
  }
};

exports.sportUrlTranslator = sportUrlTranslator;