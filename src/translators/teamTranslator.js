import {
  nbaTeams,
  nflTeams,
  nhlTeams,
  mlbTeams,
  ncaabbTeams,
  ncaafbTeams
} from "../teams/index";

export const translateTeam = (sport, teamText) => {
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

    case "ncaabb":
      return ncaabbTeams[teamText];

    case "ncaafb":
    case "ncaafbe":
      return ncaafbTeams[teamText];
  }
};