const { nflePositions } = require("../positions/nfl");
const { nflTeamNames } = require("../teams/nfl");

//For now, just doing NFL+NFLE together. Might need split later? hope not.
const translate = (positionText, teamText, nameText) => {
  switch (positionText) {
    case nflePositions.DEF:
      return nflTeamNames[teamText];

    default:
      return nameText;
  }
};

module.exports = translate;
