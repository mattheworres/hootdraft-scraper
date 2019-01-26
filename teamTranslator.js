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
  }
};

module.exports = translateTeam;

const nbaTeams = {
  "Atlanta Hawks": "ATL",
  "Brooklyn Nets": "BKN",
  "Boston Celtics": "BOS",
  "Chicago Bulls": "CHI",
  "Charlotte Hornets": "CHA",
  "Cleveland Cavaliers": "CLE",
  "Dallas Mavericks": "DAL",
  "Denver Nuggets": "DEN",
  "Detroit Pistons": "DET",
  "Golden State Warriors": "GSW",
  "Houston Rockets": "HOU",
  "Indiana Pacers": "IND",
  "Los Angeles Clippers": "LAC",
  "Los Angeles Lakers": "LAL",
  "Milwaukee Bucks": "MIL",
  "New York Knicks": "NYK",
  "Philadelphia 76ers": "PHI",
  "Phoenix Suns": "PHO",
  "Portland Trail Blazers": "POR",
  "Sacramento Kings": "SAC",
  "San Antonio Spurs": "SAS",
  "Oklahoma City Thunder": "OKC",
  "Utah Jazz": "UTH",
  "Washington Wizards": "WAS",
  "New Orleans Pelicans": "NOR",
  "Miami Heat": "MIA",
  "Minnesota Timberwolves": "MIN",
  "Orlando Magic": "ORL",
  "Toronto Raptors": "TOR",
  "Memphis Grizzlies": "MEM",
};

const nflTeams = {
  "Arizona Cardinals": "ARI",
  "Atlanta Falcons": "ATL",
  "Baltimore Ravens": "BAL",
  "Buffalo Bills": "BUF",
  "Carolina Panthers": "CAR",
  "Chicago Bears": "CHI",
  "Cincinnati Bengals": "CIN",
  "Cleveland Browns": "CLE",
  "Dallas Cowboys": "DAL",
  "Denver Broncos": "DEN",
  "Detroit Lions": "DET",
  "Green Bay Packers": "GNB",
  "Houston Texans": "HOU",
  "Indianapolis Colts": "IND",
  "Jacksonville Jaguars": "JAC",
  "Kansas City Chiefs": "K.C",
  "Los Angeles Chargers": "LAC",
  "Los Angeles Rams": "LAR",
  "Miami Dolphins": "MIA",
  "Minnesota Vikings": "MIN",
  "New England Patriots": "NWE",
  "New Orleans Saints": "NOR",
  "New York Giants": "NYG",
  "New York Jets": "NYJ",
  "Oakland Raiders": "OAK",
  "Philadelphia Eagles": "PHI",
  "Pittsburgh Steelers": "PIT",
  "San Francisco 49ers": "SFO",
  "Seattle Seahawks": "SEA",
  "Tampa Bay Buccaneers": "TAM",
  "Tennessee Titans": "TEN",
  "Washington Redskins": "WAS",
};

const nhlTeams = {
  "Anaheim Ducks": "ANA",
  "Boston Bruins": "BOS",
  "Buffalo Sabres": "BUF",
  "Calgary Flames": "CGY",
  "Carolina Hurricanes": "CAR",
  "Chicago Blackhawks": "CHI",
  "Colorado Avalanche": "COL",
  "Columbus Blue Jackets": "CBS",
  "Dallas Stars": "DAL",
  "Detroit Red Wings": "DET",
  "Edmonton Oilers": "EDM",
  "Florida Panthers": "FLA",
  "Los Angeles Kings": "LAK",
  "Minnesota Wild": "MIN",
  "Montreal Canadiens": "MTL",
  "Nashville Predators": "NSH",
  "New Jersey Devils": "NJD",
  "New York Islanders": "NYI",
  "New York Rangers": "NYR",
  "Ottawa Senators": "OTT",
  "Philadelphia Flyers": "PHI",
  "Arizona Coyotes": "ARI",
  "Pittsburgh Penguins": "PIT",
  "San Jose Sharks": "SJS",
  "St. Louis Blues": "STL",
  "Tampa Bay Lightning": "TAM",
  "Toronto Maple Leafs": "TOR",
  "Vancouver Canucks": "VAN",
  "Vegas Golden Knights": "VGK",
  "Washington Capitals": "WAS",
  "Winnipeg Jets": "WPG",
};

const mlbTeams = {
  "Arizona Diamondbacks": "ARI",
  "Atlanta Braves": "ATL",
  "Baltimore Orioles": "BAL",
  "Boston Red Sox": "BOS",
  "Chicago Cubs": "CHC",
  "Chicago White Sox": "CWS",
  "Cincinnati Reds": "CIN",
  "Cleveland Indians": "CLE",
  "Colorado Rockies": "COL",
  "Detroit Tigers": "DET",
  "Houston Astros": "HOU",
  "Kansas City Royals": "K.C",
  "Los Angeles Angels": "LAA",
  "Los Angeles Dodgers": "LAD",
  "Miami Marlins": "MIA",
  "Milwaukee Brewers": "MIL",
  "Minnesota Twins": "MIN",
  "New York Mets": "NYM",
  "New York Yankees": "NYY",
  "Oakland Athletics": "OAK",
  "Philadelphia Phillies": "PHI",
  "Pittsburgh Pirates": "PIT",
  "San Diego Padres": "SDG",
  "San Francisco Giants": "SFO",
  "Seattle Mariners": "SEA",
  "St. Louis Cardinals": "STL",
  "Tampa Bay Rays": "TAM",
  "Texas Rangers": "TEX",
  "Toronto Blue Jays": "TOR",
  "Washington Nationals": "WAS",
};
