import moment from 'moment';
import { DrawDate } from '../DrawDates/DrawDate';
import { IDrawHistory } from './IDrawHistory';
import { GameID } from '../Game';
import { IHistoryResponse } from '.';
import DrawDates from '../DrawDates';
import { DATE_FORMAT, DATE_FORMAT_SHORT, GAMES } from '../../constants';

export default class DrawHistory {
  private date: DrawDate;

  constructor(date: DrawDate) {
    this.date = date;
  }

  /**
   * Returns draw history of the date for all games.
   */
  async historyForGames(): Promise<IHistoryResponse> {
    const result = {
      history: [],
    } as IHistoryResponse;

    const results = await Promise.all(
      GAMES.map(async (game) => {
        const { gameId, draws, error } = await this.historyForGame(game.id);
        return {
          gameId,
          draws,
          error,
        };
      }),
    );

    results.forEach(({ gameId, draws }) => {
      result.history.push({ gameId, draws });
    });

    return result;
  }

  /**
   * Returns draw history of the date for given game.
   * @param gameId Game ID
   */
  async historyForGame(gameId: GameID): Promise<IDrawHistory> {
    const drawHistory = {
      gameId,
      draws: [],
    } as IDrawHistory;

    const refDate = moment(this.date, DATE_FORMAT).format(DATE_FORMAT_SHORT);

    const drawDates = new DrawDates(gameId, 0);
    await drawDates.collectData();

    if (drawDates.error) {
      drawHistory.error = drawDates.error;
      return drawHistory;
    }

    drawHistory.draws = drawDates.drawDates.filter((t) => {
      return refDate === moment(t, DATE_FORMAT).format(DATE_FORMAT_SHORT);
    });

    return drawHistory;
  }
}
