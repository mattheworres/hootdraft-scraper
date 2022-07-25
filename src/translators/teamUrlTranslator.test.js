import { nflTeamUrlAbbreviations } from "../teams";
import { translateTeamUrls, sausageCaseForUrl, getAbbreviationReplacements } from "./teamUrlTranslator";

test('sausage cases string for url', () => {
  expect(sausageCaseForUrl('A Very Fine String')).toBe('a-very-fine-string');
  expect(sausageCaseForUrl('Well, what did you expect?')).toBe('well,-what-did-you-expect?');
  expect(sausageCaseForUrl('St. Louis Blues')).toBe('st-louis-blues');
});

test('gets abbreviation replacements for url', () => {
  expect(getAbbreviationReplacements('GNB', nflTeamUrlAbbreviations)).toBe('GB');
});

test('translates teams into team URLs', () => {
  const result = translateTeamUrls('nfl');
  const cardinalsResult = result[0];
  const cardinalsUrl = Object.values(cardinalsResult)[0];
  const chiefsResult = result[15];
  const chiefsUrl = Object.values(chiefsResult)[0];

  expect(cardinalsUrl.indexOf('nfl')).toBe(26);
  expect(cardinalsUrl.indexOf('ARI')).toBe(36);
  expect(cardinalsUrl.indexOf('arizona-cardinals')).toBe(40);

  expect(chiefsUrl.indexOf('nfl')).toBe(26);
  expect(chiefsUrl.indexOf('KC')).toBe(36);
  expect(chiefsUrl.indexOf('kansas-city-chiefs')).toBe(39);
});