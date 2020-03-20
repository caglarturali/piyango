import { GAMES } from '../src/constants';
import { GameID } from '../src/models/Game';
import {
  DrawDates,
  DrawDetails,
  getDrawDatesPromise,
  getDrawDetailsPromise,
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
      drawDetailsPromises.push(getDrawDetailsPromise(gameId, drawDate));
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
