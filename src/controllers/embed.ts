/**
 * Embed controller.
 */
import Embed, { EmbedResponse } from '../models/Embed';
import { DrawDate } from '../models/DrawDates';
import { GameID } from '../models/Game';

/**
 * Returns an embeddable stream of the draw (if found).
 * Otherwise returns dummy stream.
 * @param gameId Game ID
 * @param drawDate Draw date string
 */
export const getEmbeddableStream = async (
  gameId: GameID,
  drawDate: DrawDate,
): Promise<EmbedResponse> => {
  const embed = new Embed(gameId, drawDate);
  return await embed.getStream();
};
