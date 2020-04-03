import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../shared';
import {
  DrawDataType,
  DrawDate,
  DrawsItem,
  GameID,
} from '@caglarturali/piyango-common';

export default class API {
  /**
   * Returns latest draws.
   */
  static async getLatestDraws(): Promise<DrawsItem[]> {
    const res = await fetch(`${API_BASE}/draws`);
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
    const res = await fetch(`${API_BASE}/draws/${gameId}/${drawDate}`);
    return (await res.json()) as DrawDataType;
  }

  /**
   * Returns url of the HLS stream of the draw.
   * @param gameId Game ID
   * @param drawDate Draw date
   */
  static getEmbedUrl(gameId: GameID, drawDate: DrawDate): string {
    return `${API_BASE}/embed/${gameId}/${drawDate}`;
  }
}
