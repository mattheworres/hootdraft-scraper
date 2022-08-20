import * as cheerio from "cheerio";
import {
  getIgnoredPositions,
  translatePosition,
  translateName
} from "./translators/index";
import lodash from "lodash";
import { translatePlayerName } from "./translators/playerNameTranslator";
import {parsingException} from "./helpers/parsingException";

export const parsePlayer = (sport, playerRowElement, team) => {
  let player = {};
  const ignoredPositions = getIgnoredPositions(sport);

  const $playerCells = cheerio.load(playerRowElement)("td");
  $playerCells.toArray()
    .forEach((element, index) => {

      const $element = cheerio.load(element);
      const rowText = cheerio.load(playerRowElement).text();
      const elementText = $element.text();

      if (index === 1) {
        const playerName = $element("span.CellPlayerName--long span a").text();

        if (playerName === undefined || playerName.length === 0) {
          throw new parsingException("name", playerName, rowText);
        }

        player.player = translatePlayerName(playerName);
      } else if (index === 2) {
        const trimmedValue = elementText?.trim();
        const translatedPosition = translatePosition(
          sport,
          trimmedValue
        );
        const positionIsNotIgnored = !lodash.includes(
          ignoredPositions,
          trimmedValue
        );

        if (translatedPosition === undefined && positionIsNotIgnored) {
          throw new parsingException("position", elementText, rowText);
        }

        player.position = translatedPosition;
      }
    });

    player.team = team;

  //For everything except NFL, this is just a passthrough. Needed a way to re-write DEF names, but can be used
  //to format other names based on team or position in the future
  player.player = translateName(
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
