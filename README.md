# Hoot Draft Prosports Playerdata Scraper

Automatic data scraper for [Hoot Draft](https://github.com/mattheworres/phpdraft)'s CSV player data. Support for NFL, NFL Extended, MLB, NBA and NHL player data (as well as NCAA mens basketball, football+extended -- these were all available from the same source so it was a easy add. I can add more upon request!), outputs a useable CSV file in the base directory of the script.

### Prerequisites

Here's what you'll need locally:

- Yarn (or NPM) installed globally
- Node installed globally
- Working internet connection

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

If you get a message about parsing exceptions (which a small number occur for most scrapes normally), you can enable logging by passing a second parameter that ends up being _truthy_ by Node standards, like so:

```
yarn scrape nba logging
```

## Leagues

- NFL (`nfl`)
- NFL Extended (including linemen, defensive backs, etc.) (`nfle`)
- NBA (`nba`)
- NHL (`nhl`)
- MLB (`mlb`)
- NCAA Mens Basketball (`ncaabb`)
- NCAA Mens Football (`ncaafb`)
- NCAA Mens Football Extended (including linemen, defensive backs, etc.) (`ncaafbe`)

## Development

Starting with 0.0.2, the project is transpiled using [Babel](https://babeljs.io). By default, the `scrape` script automatically runs the pre-transpiled code that is checked into the repository. Because this Javascript is transpiled to allow the largest targeted amount of browsers to run the code. In this instance, this allows me to write ES6 Javascript, while still running against the tried and true CommonJS that NodeJS understands (soon enough, I'll likely skip this transpilation step altogether, but ah well).

Use Babel to run the ES6 "directly", as it transpiles it on the fly by using the `dev-scrape` script just as you would the normal `scrape` script.

Once your changes are complete, run the `build` script to transpile your changes into the `/dist` folder, and then commit the changes in Git. Hooray!

## Built With

- request-promise
- limiter
- cheerio
- csv-writer
- lodash
- Babel

## Authors

- **Matthew Orres** - [mattheworres](https://github.com/mattheworres)

## License

Code released under the GNU v3 license.
