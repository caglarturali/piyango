import {
  DateFormat,
  DrawDate,
  GameID,
  GAMES,
} from '@caglarturali/piyango-common';
import { MessageType, printMsg } from './_utils';
import { getDrawDates, getDrawDetailsForDraw } from '../src/controllers';
import { DateUtils } from '@caglarturali/piyango-utils';
import db from '../src/db';

/**
 * Syncs draws for given game.
 * @param gameId Game ID
 */
const syncDrawsForGame = (gameId: GameID): Promise<any> => {
  return new Promise(async (resolve, _reject) => {
    printMsg(`Syncing draws for ${gameId}`);

    // Checks DB for draw record.
    const isDrawFound = (drawDate: DrawDate, index: number): boolean => {
      db[gameId].findOne(
        {
          cekilisTarihi: DateUtils.convert(
            drawDate,
            DateFormat.API,
            DateFormat.FRIENDLY,
          ),
        },
        (_err, doc) => {
          if (doc) return true;
          return false;
        },
      );
      return false;
    };

    printMsg(`Fetching draw dates for ${gameId}`);
    const { data: drawDates } = await getDrawDates(gameId, -1);

    printMsg(`Fetching draw details for ${gameId}`);
    const drawDetailsResults = await Promise.all(
      drawDates.filter(isDrawFound).map(async (drawDate) => {
        const {
          error,
          data: [drawDetails],
        } = await getDrawDetailsForDraw(gameId, drawDate);
        return {
          drawDate,
          drawDetails,
          error,
        };
      }),
    );

    if (drawDetailsResults.length === 0) {
      printMsg(`Records are up to date: ${gameId}!`, MessageType.SUCCESS);
      return resolve();
    }

    // Write data into disk (if any)
    drawDetailsResults.forEach(({ drawDate, drawDetails, error }) => {
      if (error) {
        printMsg(`${error}-${gameId}-${drawDate}`, MessageType.ERROR);
        return;
      }

      if (drawDetails) {
        // Insert data to db.
        db[gameId].insert(drawDetails, (err, _docs) => {
          if (err) {
            printMsg(err.message, MessageType.ERROR);
            return;
          }
          printMsg(
            `Record added for: ${gameId}-${drawDate}`,
            MessageType.SUCCESS,
          );
        });
      }
    });

    printMsg('Done!', MessageType.SUCCESS);
    return resolve();
  });
};

/**
 * Syncs static draw data with remote records.
 */
const syncDraws = () => {
  Promise.all(GAMES.map(async ({ id }) => await syncDrawsForGame(id)));
};

syncDraws();
