//Depending on the sport selected, return the string that the data source requires
const sportUrlTranslator = sport => {
  switch(sport) {
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
}

export {sportUrlTranslator};