import requestPromise from "request-promise";
import cheerio from "cheerio";
import {RateLimiter} from "limiter";
import {parsePlayer} from "./playerParser";
import {writeToCsv} from "./csvWriter";
import {sportUrlTranslator} from "./translators/sportUrlTranslator";

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export function scrapePlayers(sport, debugEnabled = false) {
  const urlSport = sportUrlTranslator(sport);
  const getUrl = (letter) =>
    `https://www.cbssports.com/${urlSport}/playersearch?last_name_begins=${letter}&print_rows=9999`;
  const urls = letters.map(getUrl);
  let players = [];
  const failedUrls = [];
  const finishedUrls = [];
  const nameExceptions = new Set();
  const positionExceptions = new Set();
  const teamExceptions = new Set();
  const scraperLimeter = new RateLimiter(1, 700);

  process.stdout.write(
    `Preparing to scrape ${urls.length} URLs for ${sport}: `
  );
  urls.forEach((url, index) => {
    scraperLimeter.removeTokens(1, () => {
      process.stdout.write(`${index + 1} `);
      requestPromise(url)
        .then((html) => {
          cheerio(
            'table[class="data"] tbody tr.row1, table[class="data"] tbody tr.row2',
            html
          ).each((index, element) => {
            try {
              const newPlayer = parsePlayer(sport, element);
              if (newPlayer !== null) players.push(newPlayer);
            } catch (e) {
              switch (e.parsingType) {
                case "name":
                  nameExceptions.add(e);
                  break;

                case "position":
                  positionExceptions.add(e);
                  break;

                case "team":
                  teamExceptions.add(e);
                  break;
              }
            }
          });

          finishedUrls.push(url);

          if (finishedUrls.length === urls.length) {
            const nameExceptionCount = nameExceptions.size || 0;
            const positionExceptionCount = positionExceptions.size || 0;
            const teamExceptionCount = teamExceptions.size || 0;
            const totalExceptions =
              nameExceptionCount + positionExceptionCount + teamExceptionCount;

            if (totalExceptions > 0) {
              console.log(
                `\n\nLooks like there were ${totalExceptions} unique parsing exceptions (${nameExceptionCount} name, ${positionExceptionCount} pos, ${teamExceptionCount} team):\n`
              );

              const outputExceptions = (type, exceptions) => {
                exceptions.forEach((exception) => {
                  console.warn(`Type: ${exception.parsingType} | Element text: ${exception.parsingValue} | Row value: ${exception.rowValue}`);
                });
              };

              if (debugEnabled) {
                outputExceptions("name", nameExceptions);
                outputExceptions("position", positionExceptions);
                outputExceptions("team", teamExceptions);
              }
            }

            console.log(
              `\n\nScraping complete. Writing ${players.length} players to file...`
            );

            writeToCsv(sport, players).then(() => {
              console.log(`\n\nDone! Checkout ${sport}_players.csv\n`);
              return;
            });
          }
        })
        .catch((error) => {
          console.warn("\n\nUh oh, failure: ", url, error);
          failedUrls.push(url);
        });
    });
  });
};
