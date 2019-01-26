const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const limiter = require('limiter').RateLimiter;
const parsePlayer = require('./playerParser');
const writeToCsv = require('./csvWriter');

const scrapePlayers = sport => {
  const urlSport = sport === 'nfle' ? 'nfl' : sport;
  const getUrl = letter => `https://www.cbssports.com/${urlSport}/playersearch?last_name_begins=${letter}&print_rows=9999`;
  const urls = letters.map(getUrl);
  let players = [];
  const failedUrls = [];
  const finishedUrls = [];
  const playerExceptions = [];
  const scraperLimeter = new limiter(1, 700);

  //console.log(`Preparing to scrape ${urls.length} URLs for ${sport}: `);
  process.stdout.write(`Preparing to scrape ${urls.length} URLs for ${sport}: `);
  urls.forEach((url, index) => {
    scraperLimeter.removeTokens(1, () => {
      //console.log(`Scraping URL ${index + 1}...`);
      process.stdout.write(`${index + 1} `);
      requestPromise(url).then(html => {
        cheerio('table[class="data"] tbody tr.row1, table[class="data"] tbody tr.row2', html).each((index, element) => {
          try {
            const newPlayer = parsePlayer(sport, element);
            if (newPlayer !== null) players.push(newPlayer);
          } catch(e) {
            playerExceptions.push(e);
          }
        });

        finishedUrls.push(url);

        if (finishedUrls.length === urls.length) {
          if (playerExceptions.length > 0) {
            console.log(`\n\nLooks like there were ${playerExceptions.length} parsing exceptions:\n`);

            playerExceptions.forEach(exception => {
              console.warn(exception);
            });
          }

          console.log(`\n\nScraping complete. Writing ${players.length} players to file...`);

          writeToCsv(sport, players).then(() => {
            console.log(`\n\nDone! Checkout ${sport}_players.csv\n`);
            return;
          });
        }
      }).catch(error => {
        console.warn('\n\nUh oh, failure: ', url, error);
        failedUrls.push(url);
      });
    });
  });
};

module.exports = scrapePlayers;

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
