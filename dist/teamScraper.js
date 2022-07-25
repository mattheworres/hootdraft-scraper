"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapeTeams = scrapeTeams;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var cheerio = _interopRequireWildcard(require("cheerio"));

var _limiter = require("limiter");

var _playerParser = require("./playerParser");

var _csvWriter = require("./csvWriter");

var _teamUrlTranslator = require("./translators/teamUrlTranslator");

var _index = require("./translators/index");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Written as playerScraper replacement in 2022 - site format changed from alphabetical to team
function scrapeTeams(sport) {
  var debugEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var urls = (0, _teamUrlTranslator.translateTeamUrls)(sport);
  var players = [];
  var failedUrls = [];
  var finishedUrls = [];
  var nameExceptions = new Set();
  var positionExceptions = new Set();
  var teamExceptions = new Set();
  var scraperLimiter = new _limiter.RateLimiter(1, 1700);
  var isNflLeague = sport === 'nfl' || sport === 'nfle';
  var DEF = 'DEF';
  console.info("Preparing to scrape ".concat(urls.length, " URLs for ").concat(sport, ": "));
  urls.forEach(function (teamUrlObject, index) {
    var _loop = function _loop() {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          teamAbbrev = _Object$entries$_i[0],
          teamUrl = _Object$entries$_i[1];

      scraperLimiter.removeTokens(1, function () {
        console.info("".concat(index + 1, " "));
        (0, _requestPromise["default"])(teamUrl).then(function (html) {
          var $ = cheerio.load(html);
          $('table[class="TableBase-table"] tbody tr.TableBase-bodyTr').each(function (index, element) {
            try {
              var newPlayer = (0, _playerParser.parsePlayer)(sport, element, teamAbbrev);
              if (newPlayer !== null) players.push(newPlayer);
            } catch (e) {
              switch (e.parsingType) {
                case "name":
                  nameExceptions.add(e);
                  break;

                case "position":
                  positionExceptions.add(e);
                  break;

                case "team":
                  teamExceptions.add(e);
                  break;

                default:
                  console.error(e);
              }
            }
          });

          if (isNflLeague) {
            players.push({
              player: (0, _index.translateName)(sport, DEF, teamAbbrev, teamAbbrev),
              position: DEF,
              team: teamAbbrev
            });
          }

          finishedUrls.push(teamUrl);

          if (finishedUrls.length === urls.length) {
            var nameExceptionCount = nameExceptions.size || 0;
            var positionExceptionCount = positionExceptions.size || 0;
            var teamExceptionCount = teamExceptions.size || 0;
            var totalExceptions = nameExceptionCount + positionExceptionCount + teamExceptionCount;

            if (totalExceptions > 0) {
              console.log("\n\nLooks like there were ".concat(totalExceptions, " unique parsing exceptions (").concat(nameExceptionCount, " name, ").concat(positionExceptionCount, " pos, ").concat(teamExceptionCount, " team):\n"));

              var outputExceptions = function outputExceptions(type, exceptions) {
                exceptions.forEach(function (exception) {
                  console.warn("Type: ".concat(exception.parsingType, " | Element text: ").concat(exception.parsingValue, " | Row value: ").concat(exception.rowValue));
                });
              };

              if (debugEnabled) {
                outputExceptions("name", nameExceptions);
                outputExceptions("position", positionExceptions);
                outputExceptions("team", teamExceptions);
              }
            }

            console.log("\n\nScraping complete. Writing ".concat(players.length, " players to file..."));
            (0, _csvWriter.writeToCsv)(sport, players).then(function () {
              console.log("\n\nDone! Checkout ".concat(sport, "_players.csv\n"));
              return;
            });
          }
        })["catch"](function (error) {
          console.warn("\n\nUh oh, failure: ", teamUrl, error);
          failedUrls.push(teamUrl);
        });
      });
    };

    // Object is {"K.C": "https://url-here"}
    for (var _i = 0, _Object$entries = Object.entries(teamUrlObject); _i < _Object$entries.length; _i++) {
      _loop();
    }

    ;
  });
}

;