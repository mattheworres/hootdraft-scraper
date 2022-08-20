"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateTeamUrls = exports.sausageCaseForUrl = exports.getAbbreviationReplacements = void 0;

var _index = require("../teams/index");

var _sportUrlTranslator = require("./sportUrlTranslator");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sausageCaseForUrl = function sausageCaseForUrl(string) {
  var result = string.toLowerCase(); //Remove existing dashes (order is important)

  while (result.indexOf('-') !== -1) {
    result = result.replace('-', '');
  } //Convert spaces to dashes


  while (result.indexOf(' ') !== -1) {
    result = result.replace(' ', '-');
  } //Remove periods from URL


  while (result.indexOf('.') !== -1) {
    result = result.replace('.', '');
  } //Remove open & close parens


  while (result.indexOf('(') !== -1) {
    result = result.replace('(', '');
  }

  while (result.indexOf(')') !== -1) {
    result = result.replace(')', '');
  } //Remove apostraphes


  while (result.indexOf('\'') !== -1) {
    result = result.replace('\'', '');
  } //Remove ampersands


  while (result.indexOf('&') !== -1) {
    result = result.replace('&', '');
  }

  return result;
};

exports.sausageCaseForUrl = sausageCaseForUrl;

var getAbbreviationReplacements = function getAbbreviationReplacements(teamAbbreviation, abbrevReplacements) {
  var _abbrevReplacements$t;

  return (_abbrevReplacements$t = abbrevReplacements[teamAbbreviation]) !== null && _abbrevReplacements$t !== void 0 ? _abbrevReplacements$t : teamAbbreviation;
};

exports.getAbbreviationReplacements = getAbbreviationReplacements;

var getUrl = function getUrl(urlSport, teamName, teamAbbreviation) {
  var urlTeamName = sausageCaseForUrl(teamName);
  return "https://www.cbssports.com/".concat(urlSport, "/teams/").concat(teamAbbreviation, "/").concat(urlTeamName, "/roster/");
};

var translateTeamUrls = function translateTeamUrls(sport) {
  var teams, abbreviationReplacements;

  switch (sport) {
    case 'nba':
      teams = _index.nbaTeams;
      abbreviationReplacements = _index.nbaTeamUrlAbbreviations;
      break;

    case 'nfl':
    case 'nfle':
      teams = _index.nflTeams;
      abbreviationReplacements = _index.nflTeamUrlAbbreviations;
      break;

    case 'nhl':
      teams = _index.nhlTeams;
      abbreviationReplacements = _index.nhlTeamUrlAbbreviations;
      break;

    case 'mlb':
      teams = _index.mlbTeams;
      abbreviationReplacements = _index.mlbTeamUrlAbbreviations;
      break;

    case 'ncaabb':
      teams = _index.ncaabbTeams;
      abbreviationReplacements = _index.ncaaBbTeamUrlAbbreviations;
      break;

    case 'ncaafb':
    case 'ncaafbe':
      teams = _index.ncaafbTeams;
      abbreviationReplacements = _index.ncaaFbTeamUrlAbbreviations;
      break;
  }

  ;
  var urlSport = (0, _sportUrlTranslator.sportUrlTranslator)(sport);
  var urls = [];

  for (var _i = 0, _Object$entries = Object.entries(teams); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        teamName = _Object$entries$_i[0],
        teamAbbrev = _Object$entries$_i[1];

    var urlTeamAbbreviation = getAbbreviationReplacements(teamAbbrev, abbreviationReplacements);
    urls.push(_defineProperty({}, teamAbbrev, getUrl(urlSport, teamName, urlTeamAbbreviation)));
  }

  return urls;
};

exports.translateTeamUrls = translateTeamUrls;