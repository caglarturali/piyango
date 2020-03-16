/**
 * Downloads missing draw results for each game
 * and saves them into /draws.
 */

import fs from 'fs';
import {
  buildStaticResourcePath,
  DrawDatesPromise,
  DrawDetailsPromise,
  getDrawDatesPromise,
  getDrawDetailsPromise,
} from '../src/utils';
import { GAMES } from '../src/constants';
import { GameID } from '../src/models/Game';

/**
 * Prints beautified text.
 * @param {String} text Raw text
 * @param {Boolean} isError Is error message or not
 */
const printMsg = (text: string, isError: boolean = false) => {
  // tslint:disable: no-console
  if (isError) return console.error(`*** ${text} ***`);
  console.log(`=== ${text} ===`);
  // tslint:enable: no-console
};

printMsg('Building draw dates promises array');
const drawDatesPromises: Promise<DrawDatesPromise>[] = [];
GAMES.forEach((game) => {
  const gameId = game.id as GameID;
  drawDatesPromises.push(getDrawDatesPromise(gameId));
});

printMsg('Waiting for draw dates promises array to resolve');
Promise.all(drawDatesPromises)
  .then((drawDatesResults) => {
    printMsg('Building draw details promises array');
    const drawDetailsPromises: Promise<DrawDetailsPromise>[] = [];

    drawDatesResults.forEach(({ gameId, drawDates, error }) => {
      if (error) {
        return printMsg(error, true);
      }
      if (!drawDates) {
        return printMsg('Error while fetching draw dates', true);
      }

      drawDates.forEach(({ tarih }) => {
        drawDetailsPromises.push(getDrawDetailsPromise(gameId, tarih, true));
      });
    });

    return drawDetailsPromises;
  })
  .then((drawDetailsPromises) => {
    printMsg('Waiting for draw details promises array to resolve');
    return Promise.all(drawDetailsPromises).then(
      (drawDetailsResults) => drawDetailsResults,
    );
  })
  .then((drawDetailsResults) => {
    printMsg('Writing data into disk');

    drawDetailsResults.forEach(({ gameId, drawDate, drawDetails, error }) => {
      if (error) return printMsg(`${gameId}-${drawDate}-${error}`, true);

      if (drawDetails) {
        // Write file to disk.
        const filePath = buildStaticResourcePath(gameId, drawDate);
        fs.writeFileSync(filePath, JSON.stringify(drawDetails));
      }
    });

    printMsg('Done!');
  })
  .catch((error) => {
    printMsg(error, true);
  });
