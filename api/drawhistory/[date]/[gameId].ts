/**
 * /drawhistory/:date/:gameId
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawHistory } from '../../../src/controllers';
import { GameID } from '../../../src/models/Game';
import handler from '../../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', async (query) => {
    const { date, gameId } = query;

    const gameArg = gameId.toString().toLowerCase() as GameID;
    const dateArg = date.toString();

    const result = await getDrawHistory(dateArg, gameArg);
    res.status(result.statusCode).json(result.toResponse());
  });
};
