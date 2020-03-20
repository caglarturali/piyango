/**
 * Downloads missing draw results for each game
 * and saves them into /draws.
 */

import fs from 'fs';
import { buildStaticResourcePath } from '../src/utils';
import {
  DrawDates,
  DrawDetails,
  getDrawDatesPromise,
  getDrawDetailsPromise,
  printMsg,
} from './_utils';
import { GAMES } from '../src/constants';
import { GameID } from '../src/models/Game';

/**
 * Sync static draw data with remote assets.
 */
const syncDraws = async () => {
  printMsg('Building draw dates promises array');
  const drawDatesPromises: Promise<DrawDates>[] = [];
  GAMES.forEach((game) => {
    const gameId = game.id as GameID;
    drawDatesPromises.push(getDrawDatesPromise(gameId));
  });

  printMsg('Waiting for draw dates promises array to resolve');
  const drawDatesResults = await Promise.all(drawDatesPromises);

  printMsg('Building draw details promises array');
  const drawDetailsPromises: Promise<DrawDetails>[] = [];
  drawDatesResults.forEach(({ gameId, drawDates, error }) => {
    if (error) {
      return printMsg(error, true);
    }
    if (!drawDates) {
      return printMsg('Error while fetching draw dates', true);
    }

    drawDates.forEach((date) => {
      drawDetailsPromises.push(getDrawDetailsPromise(gameId, date, true));
    });
  });

  printMsg('Waiting for draw details promises array to resolve');
  const drawDetailsResults = await Promise.all(drawDetailsPromises);

  printMsg('Writing data into disk (if any)');

  drawDetailsResults.forEach(({ gameId, drawDate, drawDetails, error }) => {
    if (error) return printMsg(`${gameId}-${drawDate}-${error}`, true);

    if (drawDetails) {
      // Write file to disk.
      printMsg(`Record added for: ${gameId} - ${drawDate}`);
      const filePath = buildStaticResourcePath(gameId, drawDate);
      fs.writeFileSync(filePath, JSON.stringify(drawDetails));
    }
  });

  printMsg('Done!');
};

syncDraws();
