import { GAMES } from '../src/constants';
import { GameID } from '../src/models/Game';
import { getDrawDates, getDrawDetails } from '../src/controllers';
import { SortOrder } from '../src/models/SortOrder';
import ApiResponse from '../src/models/ApiResponse';
import {
  DrawDates,
  DrawDetails,
  getDrawDatesPromise,
} from './_utils';
import DrawUtils from '../src/utils/DrawUtils';
import RegularDraw from '../src/models/RegularDraw';

// tslint:disable: no-console

/**
 * Calculates stats for regular games.
 */
const calculateStats = async () => {
  // Get all draw dates for all games, except piyango.
  const drawDatesPromises: Promise<DrawDates>[] = [];
  GAMES.filter((g) => g.id !== GameID.piyango).forEach((game) => {
    drawDatesPromises.push(getDrawDatesPromise(game.id, 0, 0));
  });
  const drawDatesResult = await Promise.all(drawDatesPromises);

  // Get draw details for all draws collected above.
  const drawDetailsPromises: Promise<any>[] = [];
  drawDatesResult.forEach(({ gameId, drawDates }) => {
    drawDates?.forEach((drawDate) => {
      drawDetailsPromises.push(
        (() =>
          new Promise(async (resolve) => {
            const { data } = await getDrawDetails(gameId, drawDate);
            resolve({
              gameId,
              drawDate,
              drawDetails: data[0],
            });
          }))(),
      );
    });
  });
  const drawDetailsResults: DrawDetails[] = await Promise.all(
    drawDetailsPromises,
  );

  drawDetailsResults.forEach(({ gameId, drawDetails }) => {
    const nums = DrawUtils.getWinningNumbers(
      gameId,
      drawDetails as RegularDraw,
    );
    console.log(gameId, nums);
  });

  // console.log(drawDetailsResults);
};

calculateStats();
