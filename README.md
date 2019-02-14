# Hoot Draft Prosports Playerdata Scraper

Automatic data scraper for [Hoot Draft](https://github.com/mattheworres/phpdraft)'s CSV player data. Support for NFL, NFL Extended, MLB, NBA and NHL player data, outputs a useable CSV file in the base directory of the script.

### Prerequisites

Here's what you'll need locally:

* Yarn installed globally
* Node installed globally
* Working internet connection

### Installing

1. Install packages from NPM:

```
yarn
```

## Scraping

1. Run the scraper by providing the league code you want player data for (`nfl`, `nfle`, `nba`, `nhl`, `mlb`, `ncaabb`, `ncaafb`, `ncaafbe`) as the only argument:

```
yarn scrape nba
```

If completed successfully, a `[nfl|nfle|nba|nhl|mlb|ncaabb|ncaafb|ncaafbe]_players.csv` file now exists in the base directory.

## Leagues
* NFL (`nfl`)
* NFL Extended (including linemen, defensive backs, etc.) (`nfle`)
* NBA (`nba`)
* NHL (`nhl`)
* MLB (`mlb`)
* NCAA Mens Basketball (`ncaabb`)
* NCAA Mens Football (`ncaafb`)
* NCAA Mens Football Extended (including linemen, defensive backs, etc.) (`ncaafbe`)

## Built With

* request-promise
* limiter
* cheerio
* csv-writer
* lodash

## Authors

* **Matthew Orres** - [mattheworres](https://github.com/mattheworres)

## License

Code released under the GNU v3 license.
