const cheerio = require("cheerio");
const {
  positionTranslator,
  teamTranslator,
  nameTranslator
} = require("./translators/index");
const lodash = require("lodash");
const parsingException = require("./helpers/parsingException");

const parsePlayer = (sport, playerRowElement) => {
  let player = {};
  const ignoredPositions = positionTranslator.getIgnoredPositions(sport);

  cheerio(playerRowElement)
    .children("td")
    .each((index, element) => {
      const $element = cheerio(element);
      const rowText = cheerio(playerRowElement).text();
      const elementText = $element.text();
      if (index === 0) {
        const playerName = $element.find("a").text();

        if (playerName === undefined || playerName.length === 0)
          throw new parsingException("name", playerName, rowText);
        player.player = playerName;
      } else if (index === 1) {
        const translatedPosition = positionTranslator.translatePosition(
          sport,
          elementText
        );
        const positionIsNotIgnored = !lodash.includes(
          ignoredPositions,
          elementText
        );
        if (translatedPosition === undefined && positionIsNotIgnored)
          throw new parsingException("position", elementText, rowText);
        player.position = translatedPosition;
      } else {
        const translatedTeam = teamTranslator(sport, elementText);
        if (translatedTeam === undefined)
          throw new parsingException("team", elementText, rowText);
        player.team = translatedTeam;
      }
    });

  //For everything except NFL, this is just a passthrough. Needed a way to re-write DEF names, but can be used
  //to format other names based on team or position in the future
  player.player = nameTranslator(
    sport,
    player.position,
    player.team,
    player.player
  );

  //If the position is undefined, this is a player type we do not support or need, so skip them
  return player.position === undefined || player.team === undefined
    ? null
    : player;
};

module.exports = parsePlayer;
