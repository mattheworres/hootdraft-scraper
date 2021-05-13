"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePlayer = void 0;

var _cheerio = _interopRequireDefault(require("cheerio"));

var _index = require("./translators/index");

var _lodash = _interopRequireDefault(require("lodash"));

var _parsingException = require("./helpers/parsingException");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var parsePlayer = function parsePlayer(sport, playerRowElement) {
  var player = {};
  var ignoredPositions = (0, _index.getIgnoredPositions)(sport);
  (0, _cheerio["default"])(playerRowElement).children("td").each(function (index, element) {
    var $element = (0, _cheerio["default"])(element);
    var rowText = (0, _cheerio["default"])(playerRowElement).text();
    var elementText = $element.text();

    if (index === 0) {
      var playerName = $element.find("a").text();

      if (playerName === undefined || playerName.length === 0) {
        throw new _parsingException.parsingException("name", playerName, rowText);
      }

      player.player = playerName;
    } else if (index === 1) {
      var translatedPosition = (0, _index.translatePosition)(sport, elementText);
      var positionIsNotIgnored = !_lodash["default"].includes(ignoredPositions, elementText);

      if (translatedPosition === undefined && positionIsNotIgnored) {
        throw new _parsingException.parsingException("position", elementText, rowText);
      }

      player.position = translatedPosition;
    } else {
      var translatedTeam = (0, _index.translateTeam)(sport, elementText);

      if (translatedTeam === undefined) {
        throw new _parsingException.parsingException("team", elementText, rowText);
      }

      player.team = translatedTeam;
    }
  }); //For everything except NFL, this is just a passthrough. Needed a way to re-write DEF names, but can be used
  //to format other names based on team or position in the future

  player.player = (0, _index.translateName)(sport, player.position, player.team, player.player); //If the position is undefined, this is a player type we do not support or need, so skip them

  return player.position === undefined || player.team === undefined ? null : player;
};

exports.parsePlayer = parsePlayer;