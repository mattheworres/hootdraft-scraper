const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const limiter = require('limiter').RateLimiter;
const parsePlayer = require('./playerParser');
const writeToCsv = require('./csvWriter');
const sportUrlTranslator = require('./translators/sportUrlTranslator');

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const scrapePlayers = sport => {
  const urlSport = sportUrlTranslator(sport);
  const getUrl = letter => `https://www.cbssports.com/${urlSport}/playersearch?last_name_begins=${letter}&print_rows=9999`;
  const urls = letters.map(getUrl);
  let players = [];
  const failedUrls = [];
  const finishedUrls = [];
  const nameExceptions = new Set();
  const positionExceptions = new Set();
  const teamExceptions = new Set();
  const scraperLimeter = new limiter(1, 700);

  process.stdout.write(`Preparing to scrape ${urls.length} URLs for ${sport}: `);
  urls.forEach((url, index) => {
    scraperLimeter.removeTokens(1, () => {
      process.stdout.write(`${index + 1} `);
      requestPromise(url).then(html => {
        cheerio('table[class="data"] tbody tr.row1, table[class="data"] tbody tr.row2', html).each((index, element) => {
          try {
            const newPlayer = parsePlayer(sport, element);
            if (newPlayer !== null) players.push(newPlayer);
          } catch(e) {
            switch (e.parsingType) {
              case 'name':
                nameExceptions.add(e.parsingValue);
                break;

              case 'position':
                positionExceptions.add(e.parsingValue);
                break;

              case 'team':
                teamExceptions.add(e.parsingValue);
                break;
            }
          }
        });

        finishedUrls.push(url);

        if (finishedUrls.length === urls.length) {
          const nameExceptionCount = nameExceptions.size || 0;
          const positionExceptionCount = positionExceptions.size || 0;
          const teamExceptionCount = teamExceptions.size || 0;
          const totalExceptions = nameExceptionCount + positionExceptionCount + teamExceptionCount;

          if (totalExceptions > 0) {
            console.log(`\n\nLooks like there were ${totalExceptions} unique parsing exceptions (${nameExceptionCount} name, ${positionExceptionCount} pos, ${teamExceptionCount} team):\n`);

            const outputExceptions = (type, exceptions) => {
              exceptions.forEach(exception => {
                console.warn(`${type}: ${exception}`);
              })
            }

            console.log('(comment out lines below this one in playerScraper.js to see details)');
            //outputExceptions('name', nameExceptions);
            //outputExceptions('position', positionExceptions);
            //outputExceptions('team', teamExceptions);
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
