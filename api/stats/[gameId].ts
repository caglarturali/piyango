/**
 * /stats
 */
import { NowRequest, NowResponse } from '@now/node';
import { getStatsForGame } from '../../src/controllers';
import { GameID } from '../../src/models/Game';
import handler from '../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', async (query) => {
    const { gameId } = query;

    const gameArg = gameId.toString().toLowerCase() as GameID;

    const result = await getStatsForGame(gameArg);
    res.status(result.statusCode).json(result.toResponse());
  });
};
