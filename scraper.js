const lodash = require('lodash');
const scrapePlayers = require('./playerScraper');

const validSports = ['nba', 'mlb', 'nfle', 'nfl', 'nhl', 'ncaam'];
const sport = process.argv.slice(2)[0];

if (sport === undefined || sport.length === 0 || lodash.includes(validSports, sport.toLowerCase()) === false) {
  console.warn(`Can't scrape - need a valid sport value to scrape for (${sport}), like ${validSports.join(', ')} - OK?`);
  return;
}

scrapePlayers(sport);

