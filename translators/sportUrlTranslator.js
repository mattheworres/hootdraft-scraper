//Depending on the sport selected, return the string that the data source requires
const sportUrlTranslator = sport => {
  switch(sport) {
    case 'ncaam':
      return 'collegebasketball';

    case 'nfle':
      return 'nfl';

    default:
      return sport;
  }
}

module.exports = sportUrlTranslator;
