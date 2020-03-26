import fs from 'fs';
import { PathUtils } from '../src/utils';
import { MessageType, printMsg } from './_utils';
import { GAMES } from '../src/constants';
import { getDrawDates, getDrawDetails } from '../src/controllers';

/**
 * Syncs static draw data with remote records.
 */
const syncDraws = async () => {
  printMsg('Fetching draw dates');
  const drawDatesResults = await Promise.all(
    GAMES.map(async (game) => {
      const { data } = await getDrawDates(game.id, -1);
      return {
        gameId: game.id,
        drawDates: data,
      };
    }),
  );

  printMsg('Fetching draw details');
  const drawDetailsResults = await Promise.all(
    drawDatesResults.map(({ gameId, drawDates }) => {
      return Promise.all(
        drawDates
          .filter((drawDate) => {
            // Filter out records that are already found.
            const resourcePath = PathUtils.drawResourcePath(gameId, drawDate);
            return !fs.existsSync(resourcePath);
          })
          .map(async (drawDate) => {
            const {
              error,
              data: [drawDetails],
            } = await getDrawDetails(gameId, drawDate);
            return {
              gameId,
              drawDate,
              drawDetails,
              error,
            };
          }),
      );
    }),
  );

  printMsg('Writing data into disk (if any)');
  drawDetailsResults.forEach((games) => {
    games.forEach(({ gameId, drawDate, drawDetails, error }) => {
      if (error)
        return printMsg(`${gameId}-${drawDate}-${error}`, MessageType.ERROR);

      if (drawDetails) {
        // Write file to disk.
        printMsg(
          `Record added for: ${gameId} - ${drawDate}`,
          MessageType.SUCCESS,
        );
        const filePath = PathUtils.drawResourcePath(gameId, drawDate);
        fs.writeFileSync(filePath, JSON.stringify(drawDetails));
      }
    });
  });

  printMsg('Done!', MessageType.SUCCESS);
};

syncDraws();
