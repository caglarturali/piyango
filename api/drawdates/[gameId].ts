/**
 * /drawdates
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawDates } from '../../src/controllers';
import handler from '../_handler';
import { parseParam } from '../_helpers';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', async (query) => {
    const { gameId, limit, skip, sort } = query;

    const gameArg = parseParam.gameId(gameId);
    const limitArg = parseParam.num(limit);
    const skipArg = parseParam.num(skip);
    const sortArg = parseParam.sort(sort);

    const result = await getDrawDates(gameArg, limitArg, skipArg, sortArg);
    res.status(result.statusCode).json(result.toResponse(false));
  });
};
