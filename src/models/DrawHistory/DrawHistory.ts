import moment from 'moment';
import { DrawDate } from '../DrawDate';
import { IDrawHistory } from './IDrawHistory';
import { GameID } from '../Game';
import { DATE_FORMAT, DATE_FORMAT_SHORT, GAMES } from '../../constants';
import DrawDates from '../DrawDates';
import IResponse from '../IResponse';

export interface IHistoryForGame extends IResponse {
  history: DrawDate[];
}

export interface IHistoryForGames extends IResponse {
  history: IDrawHistory[];
}

export interface IHistoryForDate extends IResponse {
  history: IDrawHistory[];
}

export default class DrawHistory {
  private date: DrawDate;

  constructor(date: DrawDate) {
    this.date = date;
  }

  /**
   * Returns draw history of the date for all games.
   * @param date Date (optional)
   */
  async historyForGames(date?: DrawDate): Promise<IHistoryForGames> {
    const result = {
      history: [],
    } as IHistoryForGames;

    const results = await Promise.all(
      GAMES.map(async (game) => {
        const { history, error } = await this.historyForGame(game.id, date);
        return {
          gameId: game.id,
          draws: error ? [] : history,
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
   * @param date Date (optional)
   */
  async historyForGame(
    gameId: GameID,
    date?: DrawDate,
  ): Promise<IHistoryForGame> {
    const result = {
      history: [],
    } as IHistoryForGame;

    const refDate = moment(date || this.date, DATE_FORMAT).format(
      DATE_FORMAT_SHORT,
    );

    const drawDates = new DrawDates(gameId, 0);
    await drawDates.collectData();

    if (drawDates.error) {
      result.error = drawDates.error;
      return result;
    }

    drawDates.drawDates.forEach((t) => {
      if (refDate === moment(t, DATE_FORMAT).format(DATE_FORMAT_SHORT)) {
        result.history.push(t);
      }
    });

    return result;
  }
}
