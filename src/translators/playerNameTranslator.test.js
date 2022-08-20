import { translatePlayerName } from "./playerNameTranslator";

test('translates names into last comma first', () => {
  expect(translatePlayerName('Jim Bob')).toBe('Bob, Jim');
  expect(translatePlayerName('Early Cuyler III')).toBe('Cuyler III, Early');
  expect(translatePlayerName('Reginald Earthwaite Jr.')).toBe('Earthwaite Jr., Reginald');
  expect(translatePlayerName('Bryan De La Cruz')).toBe('De La Cruz, Bryan');
});