/**
 * /drawdates
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawDates } from '../../src/controllers';
import { GameID } from '../../src/models/Game';
import { SortOrder } from '../../src/models/SortOrder';
import apiconfig from '../../src/apiconfig';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { gameId, limit, skip, sort },
  } = req;

  const { limit: apiLimit, skip: apiSkip, sort: apiSort } = apiconfig.drawdates;

  const gameArg = gameId.toString().toLowerCase() as GameID;
  const limitArg = limit ? parseInt(limit.toString(), 10) : apiLimit;
  const skipArg = skip ? parseInt(skip.toString(), 10) : apiSkip;
  const sortArg = (sort ? sort.toString().toLowerCase() : apiSort) as SortOrder;

  switch (method) {
    case 'GET': {
      const result = await getDrawDates(gameArg, limitArg, skipArg, sortArg);
      res.status(result.statusCode).json(result.toObject(false));
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
