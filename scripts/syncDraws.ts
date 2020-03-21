import fs from 'fs';
import PathUtils from '../src/utils/PathUtils';
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
 * Syncs static draw data with remote records.
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
      // Skip if record is already found.
      const resourcePath = PathUtils.drawResourcePath(gameId, date);
      if (!fs.existsSync(resourcePath)) {
        drawDetailsPromises.push(getDrawDetailsPromise(gameId, date));
      }
    });
  });

  if (!drawDetailsPromises.length) {
    return printMsg('All records are up to date!');
  }

  printMsg('Waiting for draw details promises array to resolve');
  const drawDetailsResults = await Promise.all(drawDetailsPromises);

  printMsg('Writing data into disk (if any)');
  drawDetailsResults.forEach(({ gameId, drawDate, drawDetails, error }) => {
    if (error) return printMsg(`${gameId}-${drawDate}-${error}`, true);

    if (drawDetails) {
      // Write file to disk.
      printMsg(`Record added for: ${gameId} - ${drawDate}`);
      const filePath = PathUtils.drawResourcePath(gameId, drawDate);
      fs.writeFileSync(filePath, JSON.stringify(drawDetails));
    }
  });

  printMsg('Done!');
};

syncDraws();
