import fetch from 'isomorphic-unfetch';
import {
  DateUtils,
  DrawDataType,
  DrawDate,
  DrawsItem,
  GameID,
} from '@caglarturali/piyango-common';
import { API_BASE } from '../shared';

export default class API {
  /**
   * Returns latest draws.
   */
  static async getLatestDraws(): Promise<DrawsItem[]> {
    const res = await fetch(`${API_BASE}/api/draws`);
    return (await res.json()) as DrawsItem[];
  }

  /**
   * Returns draw details for given game and date.
   * @param gameId Game ID
   * @param drawDate Draw date
   */
  static async getDrawDetails(
    gameId: GameID,
    drawDate: DrawDate,
  ): Promise<DrawDataType> {
    const subDir = DateUtils.isLessThan(drawDate, '20200101')
      ? 'static'
      : 'api';
    const res = await fetch(
      `${API_BASE}/${subDir}/draws/${gameId}/${drawDate}`,
    );
    return (await res.json()) as DrawDataType;
  }

  /**
   * Returns draw dates for given game.
   * @param gameId Game ID
   */
  static async getDrawDates(gameId: GameID): Promise<DrawDate[]> {
    const res = await fetch(`${API_BASE}/api/drawdates/${gameId}`);
    return (await res.json()) as DrawDate[];
  }

  /**
   * Returns url of the HLS stream of the draw.
   * @param gameId Game ID
   * @param drawDate Draw date
   */
  static getEmbedUrl(gameId: GameID, drawDate: DrawDate): string {
    return `${API_BASE}/api/embed/${gameId}/${drawDate}`;
  }
}
