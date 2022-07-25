"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translatePlayerName = void 0;

var translatePlayerName = function translatePlayerName(nameText) {
  var parts = nameText.split(' ');

  if (parts.length === 2) {
    return "".concat(parts[1], ", ").concat(parts[0]);
  } else if (parts.length > 2) {
    var first = parts[0];
    var last = parts.slice(1).join(' ');
    return "".concat(last, ", ").concat(first);
  }
};

exports.translatePlayerName = translatePlayerName;