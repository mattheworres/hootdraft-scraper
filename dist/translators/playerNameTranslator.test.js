"use strict";

var _playerNameTranslator = require("./playerNameTranslator");

test('translates names into last comma first', function () {
  expect((0, _playerNameTranslator.translatePlayerName)('Jim Bob')).toBe('Bob, Jim');
  expect((0, _playerNameTranslator.translatePlayerName)('Early Cuyler III')).toBe('Cuyler III, Early');
  expect((0, _playerNameTranslator.translatePlayerName)('Reginald Earthwaite Jr.')).toBe('Earthwaite Jr., Reginald');
  expect((0, _playerNameTranslator.translatePlayerName)('Bryan De La Cruz')).toBe('De La Cruz, Bryan');
});