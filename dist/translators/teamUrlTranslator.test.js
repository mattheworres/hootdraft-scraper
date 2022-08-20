"use strict";

var _teams = require("../teams");

var _teamUrlTranslator = require("./teamUrlTranslator");

test('sausage cases string for url', function () {
  expect((0, _teamUrlTranslator.sausageCaseForUrl)('A Very Fine String')).toBe('a-very-fine-string');
  expect((0, _teamUrlTranslator.sausageCaseForUrl)('Well, what did you expect?')).toBe('well,-what-did-you-expect?');
  expect((0, _teamUrlTranslator.sausageCaseForUrl)('St. Louis Blues')).toBe('st-louis-blues');
  expect((0, _teamUrlTranslator.sausageCaseForUrl)('Texas A&M Aggies')).toBe('texas-am-aggies');
  expect((0, _teamUrlTranslator.sausageCaseForUrl)('Louisiana-Monroe Warhawks')).toBe('louisianamonroe-warhawks');
  expect((0, _teamUrlTranslator.sausageCaseForUrl)('Miami (FL) Hurricanes')).toBe('miami-fl-hurricanes');
  expect((0, _teamUrlTranslator.sausageCaseForUrl)('Louisiana Ragin\' Cajuns')).toBe('louisiana-ragin-cajuns');
});
test('gets abbreviation replacements for url', function () {
  expect((0, _teamUrlTranslator.getAbbreviationReplacements)('GNB', _teams.nflTeamUrlAbbreviations)).toBe('GB');
});
test('translates teams into team URLs', function () {
  var result = (0, _teamUrlTranslator.translateTeamUrls)('nfl');
  var cardinalsResult = result[0];
  var cardinalsUrl = Object.values(cardinalsResult)[0];
  var chiefsResult = result[15];
  var chiefsUrl = Object.values(chiefsResult)[0];
  expect(cardinalsUrl.indexOf('nfl')).toBe(26);
  expect(cardinalsUrl.indexOf('ARI')).toBe(36);
  expect(cardinalsUrl.indexOf('arizona-cardinals')).toBe(40);
  expect(chiefsUrl.indexOf('nfl')).toBe(26);
  expect(chiefsUrl.indexOf('KC')).toBe(36);
  expect(chiefsUrl.indexOf('kansas-city-chiefs')).toBe(39);
});