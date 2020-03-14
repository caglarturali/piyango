/**
 * Downloads missing draw results for each game
 * and saves them into /draws.
 */

import fs from 'fs';
import { getDrawDates, getDrawDetails } from '../src/controllers';
import { buildStaticResourcePath } from '../src/utils';
import { GAMES } from '../src/constants';
import { GameID } from '../src/models/GameID';
import DrawListing from '../src/models/DrawListing';
import { SortOrder } from '../src/models/SortOrder';
import apiconfig from '../src/apiconfig';

interface DrawDatesPromise {
  gameId: GameID;
  drawDates: DrawListing[] | null | undefined;
  error: string | null;
}

interface DrawDetailsPromise {
  gameId: GameID;
  drawDate: string;
  drawDetails: any;
  message: string | null;
  error: string | null;
  skip: boolean;
}

/**
 * Prints beautified text.
 * @param {String} text Raw text
 * @param {Boolean} isError Is error message or not
 */
const printInfoLine = (text: string, isError: boolean = false) => {
  // tslint:disable: no-console
  if (isError) return console.error(`*** ${text} ***`);
  console.log(`=== ${text} ===`);
  // tslint:enable: no-console
};

/**
 * Fetches draw dates for given game.
 * @param {GameID} gameId Game ID
 * @returns {Promise<Object>} Draw dates promise
 */
const getDrawDatesPromise = (gameId: GameID): Promise<DrawDatesPromise> => {
  const { limit, skip } = apiconfig.drawdates;

  return new Promise((resolve, reject) => {
    getDrawDates(gameId, limit, skip, SortOrder.DESC).then((response) => {
      if (response.error) {
        return resolve({
          gameId,
          drawDates: null,
          error: response.error.message,
        });
      }
      resolve({
        gameId,
        drawDates: response.data?.results,
        error: null,
      });
    });
  });
};

/**
 * Fetches draw details based on given credentials.
 * @param {GameID} gameId Game ID
 * @param {String} drawDate Draw date
 * @returns {Promise<Object>} Draw details
 */
const getDrawDetailsPromise = (
  gameId: GameID,
  drawDate: string,
): Promise<DrawDetailsPromise> => {
  return new Promise((resolve, reject) => {
    // Check if record already found or not.
    const resourcePath = buildStaticResourcePath(gameId, drawDate);
    if (fs.existsSync(resourcePath)) {
      return resolve({
        gameId,
        drawDate,
        drawDetails: null,
        error: null,
        message: null,
        skip: true,
      });
    }

    getDrawDetails(gameId, drawDate).then((response) => {
      if (response.error) {
        return resolve({
          gameId,
          drawDate,
          drawDetails: null,
          error: response.error.message,
          message: null,
          skip: true,
        });
      }

      resolve({
        gameId,
        drawDate,
        drawDetails: response.data?.results[0],
        message: `Record added for: ${gameId} - ${drawDate}`,
        error: null,
        skip: false,
      });
    });
  });
};

printInfoLine('Building draw dates promises array');
const drawDatesPromises: Promise<DrawDatesPromise>[] = [];
GAMES.forEach((game) => {
  const gameId = game as GameID;
  drawDatesPromises.push(getDrawDatesPromise(gameId));
});

printInfoLine('Waiting for draw dates promises array to resolve');
Promise.all(drawDatesPromises)
  .then((drawDatesResults) => {
    printInfoLine('Building draw details promises array');
    const drawDetailsPromises: Promise<DrawDetailsPromise>[] = [];

    drawDatesResults.forEach((result) => {
      const { gameId, drawDates, error } = result;
      if (error) {
        return printInfoLine(error, true);
      }
      if (!drawDates) {
        return printInfoLine('Error while fetching draw dates', true);
      }

      drawDates.forEach(({ tarih }) => {
        drawDetailsPromises.push(getDrawDetailsPromise(gameId, tarih));
      });
    });

    return drawDetailsPromises;
  })
  .then((drawDetailsPromises) => {
    printInfoLine('Waiting for draw details promises array to resolve');
    return Promise.all(drawDetailsPromises).then(
      (drawDetailsResults) => drawDetailsResults,
    );
  })
  .then((drawDetailsResults) => {
    printInfoLine('Writing data into disk');

    drawDetailsResults.forEach((result) => {
      const { gameId, drawDate, drawDetails, message, skip, error } = result;

      if (message) printInfoLine(message);
      if (error) return printInfoLine(`${gameId}-${drawDate}-${error}`, true);
      if (skip) return true;

      // Write file to disk.
      const filePath = buildStaticResourcePath(gameId, drawDate);
      fs.writeFileSync(filePath, JSON.stringify(drawDetails));
    });

    printInfoLine('Done!');
  })
  .catch((error) => {
    printInfoLine(error, true);
  });
