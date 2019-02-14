const {nbaTeams, nflTeams, nhlTeams, mlbTeams, ncaamTeams} = require('../teams/index');

const translateTeam = (sport, teamText) => {
  switch (sport) {
    case "nba":
      return nbaTeams[teamText];

    case "nfl":
    case "nfle":
      return nflTeams[teamText];

    case "nhl":
      return nhlTeams[teamText];

    case "mlb":
      return mlbTeams[teamText];

    case "ncaam":
      return ncaamTeams[teamText];
  }
};

module.exports = translateTeam;
