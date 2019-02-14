//Depending on the sport selected, return the string that the data source requires
const sportUrlTranslator = sport => {
  switch(sport) {
    case 'ncaabb':
      return 'collegebasketball';

    case 'ncaafbe':
    case 'ncaafb':
      return 'collegefootball';

    case 'nfle':
      return 'nfl';

    default:
      return sport;
  }
}

module.exports = sportUrlTranslator;
