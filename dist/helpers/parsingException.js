"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsingException = parsingException;

function parsingException(parsingType, parsingValue, rowValue) {
  return {
    parsingType: parsingType,
    parsingValue: parsingValue,
    rowValue: rowValue
  };
}

;