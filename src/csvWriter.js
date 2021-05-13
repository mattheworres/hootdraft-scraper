import {createObjectCsvWriter} from 'csv-writer';

export const writeToCsv = (sport, players) => {
  const csvWriter = createObjectCsvWriter({
    path: `${sport}_players.csv`,
    fieldDelimiter: ';',
    header: [
      {id: 'player', title: 'Player'},
      {id: 'position', title: 'Position'},
      {id: 'team', title: 'Team'},
    ],
  });

  return csvWriter.writeRecords(players);
};
