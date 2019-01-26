const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writeToCsv = (sport, players) => {
  const csvWriter = createCsvWriter({
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

module.exports = writeToCsv;
