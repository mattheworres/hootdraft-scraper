const cheerio = require('cheerio');
const positionHelpers = require('./positionTranslator');
const translateTeam = require('./teamTranslator');
const lodash = require('lodash');

const parsePlayer = (sport, playerRowElement) => {
  let player = {};
  const ignoredPositions = positionHelpers.getIgnoredPositions(sport);

  cheerio(playerRowElement).children('td').each((index, element) => {
    const $element = cheerio(element);
    if (index === 0) {
      const playerName = $element.find('a').text();

      if (playerName === undefined || playerName.length === 0) throw `Name undefined: ${cheerio(playerRowElement).text()}`;
      player.player = playerName;
    } else if (index === 1) {
      const translatedSport = positionHelpers.translatePosition(sport, $element.text());
      const positionIsNotIgnored = !lodash.includes(ignoredPositions, $element.text());
      if (translatedSport === undefined && positionIsNotIgnored) throw `Position undefined: ${cheerio(playerRowElement).text()}`;
      player.position = translatedSport;
    } else {
      const translatedTeam = translateTeam(sport, $element.text());
      if (translatedTeam === undefined) throw `Team undefined: ${cheerio(playerRowElement).text()}`;
      player.team = translatedTeam;
    }
  });

  //If the position is undefined, this is a player type we do not support or need, so skip them
  return player.position === undefined || player.team === undefined ? null : player;
};

module.exports = parsePlayer;
