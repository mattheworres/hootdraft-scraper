import { nflePositions } from "../positions/nfl";
import { nflTeamNames } from "../teams/nfl";

//For now, just doing NFL+NFLE together. Might need split later? hope not.
export const translate = (positionText, teamText, nameText) => {
  switch (positionText) {
    case nflePositions.DEF:
      return nflTeamNames[teamText];

    default:
      return nameText;
  }
};
