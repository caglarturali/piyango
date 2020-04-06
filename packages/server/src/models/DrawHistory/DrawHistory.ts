import {
  DateFormat,
  DateUtils,
  DrawDate,
  GameID,
  GAMES,
} from '@caglarturali/piyango-common';
import { DrawHistoryData } from './DrawHistoryData';
import { HistoryResponse } from '.';
import DrawDates from '../DrawDates';

export default class DrawHistory {
  private date: DrawDate;

  constructor(date: DrawDate) {
    this.date = date;
  }

  /**
   * Returns draw history of the date for all games.
   */
  async historyForGames(): Promise<HistoryResponse> {
    const result =
      {
        history: [],
      } as HistoryResponse;

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
  async historyForGame(gameId: GameID): Promise<DrawHistoryData> {
    const drawHistory =
      {
        gameId,
        draws: [],
      } as DrawHistoryData;

    const refDate = DateUtils.convert(
      this.date,
      DateFormat.API,
      DateFormat.SHORT,
    );

    const drawDates = new DrawDates(gameId, -1);
    await drawDates.collectData();

    if (drawDates.error) {
      drawHistory.error = drawDates.error;
      return drawHistory;
    }

    drawHistory.draws = drawDates.drawDates.filter((t) => {
      return refDate === DateUtils.convert(t, DateFormat.API, DateFormat.SHORT);
    });

    return drawHistory;
  }
}
