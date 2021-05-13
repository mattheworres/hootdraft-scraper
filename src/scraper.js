import lodash from 'lodash';
import {scrapePlayers} from './playerScraper';

const validSports = ['nba', 'mlb', 'nfle', 'nfl', 'nhl', 'ncaabb', 'ncaafb', 'ncaafbe'];
const sport = process.argv.slice(2)[0];
const debugVal = process.argv.slice(3)[0];
const debugEnabled = (!!debugVal);

if (sport === undefined || sport.length === 0 || lodash.includes(validSports, sport.toLowerCase()) === false) {
  console.warn(`Can't scrape - need a valid sport value to scrape for (${sport}), like ${validSports.join(', ')} - OK?`);
} else {
  scrapePlayers(sport, debugEnabled);
}

