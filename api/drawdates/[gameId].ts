/**
 * /drawdates
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawDates } from '../../src/controllers';
import { GameID } from '../../src/models/Game';
import { SortOrder } from '../../src/models/SortOrder';
import handler from '../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', async (query) => {
    const { gameId, limit, skip, sort } = query;

    const gameArg = gameId.toString().toLowerCase() as GameID;
    const limitArg = limit ? parseInt(limit.toString(), 10) : undefined;
    const skipArg = skip ? parseInt(skip.toString(), 10) : undefined;
    const sortArg = sort
      ? (sort.toString().toLowerCase() as SortOrder)
      : undefined;

    const result = await getDrawDates(gameArg, limitArg, skipArg, sortArg);
    res.status(result.statusCode).json(result.toResponse(false));
  });
};
