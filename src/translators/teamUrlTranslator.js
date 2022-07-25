import {
  nbaTeams,
  nbaTeamUrlAbbreviations,
  nflTeams,
  nflTeamUrlAbbreviations,
  nhlTeams,
  nhlTeamUrlAbbreviations,
  mlbTeams,
  mlbTeamUrlAbbreviations,
  ncaabbTeams,
  ncaafbTeams
} from "../teams/index";

import { sportUrlTranslator } from "./sportUrlTranslator";

export const sausageCaseForUrl = string => {
  let result = string.toLowerCase();

  //Convert spaces to dashes
  while (result.indexOf(' ') !== -1) {
    result = result.replace(' ', '-');
  }

  //Remove periods from URL
  while (result.indexOf('.') !== -1) {
    result = result.replace('.', '');
  }

  return result;
}

export const getAbbreviationReplacements = (teamAbbreviation, abbrevReplacements) => {
  return abbrevReplacements[teamAbbreviation] ?? teamAbbreviation;
}

const getUrl = (urlSport, teamName, teamAbbreviation) => {
  const urlTeamName = sausageCaseForUrl(teamName);

  return `https://www.cbssports.com/${urlSport}/teams/${teamAbbreviation}/${urlTeamName}/roster/`;
}

export const translateTeamUrls = sport => {
  let teams, abbreviationReplacements;

  //TODO: fill out the rest of these sports

  switch (sport) {
    case 'nba':
      teams = nbaTeams;
      abbreviationReplacements = nbaTeamUrlAbbreviations;
      break;

    case 'nfl':
    case 'nfle':
      teams = nflTeams;
      abbreviationReplacements = nflTeamUrlAbbreviations;
      break;

    case 'nhl':
      teams = nhlTeams;
      abbreviationReplacements = nhlTeamUrlAbbreviations;
      break;

    case 'mlb':
      teams = mlbTeams;
      abbreviationReplacements = mlbTeamUrlAbbreviations;
      break;

    case 'ncaabb':
      teams = ncaabbTeams;
      break;

    case 'ncaafb':
    case 'ncaafbe':
      teams = ncaafbTeams;
      break;
  };

  const urlSport = sportUrlTranslator(sport);
  const urls = [];

  for(const [teamName, teamAbbrev] of Object.entries(teams)) {
    const urlTeamAbbreviation = getAbbreviationReplacements(teamAbbrev, abbreviationReplacements);
    urls.push({[teamAbbrev]: getUrl(urlSport, teamName, urlTeamAbbreviation)});
  }

  return urls;
};
