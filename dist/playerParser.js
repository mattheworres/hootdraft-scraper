"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePlayer = void 0;

var cheerio = _interopRequireWildcard(require("cheerio"));

var _index = require("./translators/index");

var _lodash = _interopRequireDefault(require("lodash"));

var _playerNameTranslator = require("./translators/playerNameTranslator");

var _parsingException = require("./helpers/parsingException");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var parsePlayer = function parsePlayer(sport, playerRowElement, team) {
  var player = {};
  var ignoredPositions = (0, _index.getIgnoredPositions)(sport);
  var $playerCells = cheerio.load(playerRowElement)("td");
  $playerCells.toArray().forEach(function (element, index) {
    var $element = cheerio.load(element);
    var rowText = cheerio.load(playerRowElement).text();
    var elementText = $element.text();

    if (index === 1) {
      var playerName = $element("span.CellPlayerName--long span a").text();

      if (playerName === undefined || playerName.length === 0) {
        throw new _parsingException.parsingException("name", playerName, rowText);
      }

      player.player = (0, _playerNameTranslator.translatePlayerName)(playerName);
    } else if (index === 2) {
      var trimmedValue = elementText === null || elementText === void 0 ? void 0 : elementText.trim();
      var translatedPosition = (0, _index.translatePosition)(sport, trimmedValue);
      var positionIsNotIgnored = !_lodash["default"].includes(ignoredPositions, trimmedValue);

      if (translatedPosition === undefined && positionIsNotIgnored) {
        throw new _parsingException.parsingException("position", elementText, rowText);
      }

      player.position = translatedPosition;
    }
  });
  player.team = team; //For everything except NFL, this is just a passthrough. Needed a way to re-write DEF names, but can be used
  //to format other names based on team or position in the future

  player.player = (0, _index.translateName)(sport, player.position, player.team, player.player); //If the position is undefined, this is a player type we do not support or need, so skip them

  return player.position === undefined || player.team === undefined ? null : player;
};

exports.parsePlayer = parsePlayer;