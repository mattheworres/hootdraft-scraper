"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapePlayers = scrapePlayers;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _limiter = require("limiter");

var _playerParser = require("./playerParser");

var _csvWriter = require("./csvWriter");

var _sportUrlTranslator = require("./translators/sportUrlTranslator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function scrapePlayers(sport) {
  var debugEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var urlSport = (0, _sportUrlTranslator.sportUrlTranslator)(sport);

  var getUrl = function getUrl(letter) {
    return "https://www.cbssports.com/".concat(urlSport, "/playersearch?last_name_begins=").concat(letter, "&print_rows=9999");
  };

  var urls = letters.map(getUrl);
  var players = [];
  var failedUrls = [];
  var finishedUrls = [];
  var nameExceptions = new Set();
  var positionExceptions = new Set();
  var teamExceptions = new Set();
  var scraperLimeter = new _limiter.RateLimiter(1, 700);
  process.stdout.write("Preparing to scrape ".concat(urls.length, " URLs for ").concat(sport, ": "));
  urls.forEach(function (url, index) {
    scraperLimeter.removeTokens(1, function () {
      process.stdout.write("".concat(index + 1, " "));
      (0, _requestPromise["default"])(url).then(function (html) {
        (0, _cheerio["default"])('table[class="data"] tbody tr.row1, table[class="data"] tbody tr.row2', html).each(function (index, element) {
          try {
            var newPlayer = (0, _playerParser.parsePlayer)(sport, element);
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
            }
          }
        });
        finishedUrls.push(url);

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
        console.warn("\n\nUh oh, failure: ", url, error);
        failedUrls.push(url);
      });
    });
  });
}

;