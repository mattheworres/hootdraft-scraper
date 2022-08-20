import requestPromise from "request-promise";
import * as cheerio from "cheerio";
import {RateLimiter} from "limiter";
import {parsePlayer} from "./playerParser";
import {writeToCsv} from "./csvWriter";
import {translateTeamUrls} from "./translators/teamUrlTranslator";
import { translateName } from "./translators/index";

// Written as playerScraper replacement in 2022 - site format changed from alphabetical to team
export function scrapeTeams(sport, debugEnabled = false) {
  const urls = translateTeamUrls(sport);
  let players = [];
  const failedUrls = [];
  const finishedUrls = [];
  const nameExceptions = new Set();
  const positionExceptions = new Set();
  const teamExceptions = new Set();
  const scraperLimiter = new RateLimiter(1, 1700);
  const isNflLeague = sport === 'nfl' || sport === 'nfle';
  const DEF = 'DEF';

  console.info(
    `Preparing to scrape ${urls.length} URLs for ${sport}: `
  );
  
  urls.forEach((teamUrlObject, index) => {
    // Object is {"K.C": "https://url-here"}
    for(const [teamAbbrev, teamUrl] of Object.entries(teamUrlObject)) {
      scraperLimiter.removeTokens(1, () => {
        console.info(`${index + 1} `);
        try {
          requestPromise(teamUrl)
            .then((html) => {
              const $ = cheerio.load(html);
              $('table[class="TableBase-table"] tbody tr.TableBase-bodyTr')
              .each((index, element) => {
                try {
                  const newPlayer = parsePlayer(sport, element, teamAbbrev);
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
                    default:
                      console.error(e);
                  }
                }
              });

              if (isNflLeague) {
                players.push({
                  player: translateName(sport, DEF, teamAbbrev, teamAbbrev),
                  position: DEF,
                  team: teamAbbrev
                });
              }

              finishedUrls.push(teamUrl);

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
              const interesting = error && error.response && error.response.request.href;
              console.warn("Uh oh, failure: ", interesting ? interesting : Object.keys(error.response));
              failedUrls.push(teamUrl);
            });
        } catch (error) {
          console.warn(`Aw naw, error: ${Object.keys(error)}`);
        };
      });
    };
  });
};
