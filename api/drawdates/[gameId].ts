import { NowRequest, NowResponse } from '@now/node';
import { getDrawDates } from '../../src/controllers';
import { GameID } from '../../src/models/GameID';
import { SortOrder } from '../../src/models/SortOrder';
import apiconfig from '../../src/apiconfig';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { gameId, limit, skip, sort },
  } = req;

  const { limit: apiLimit, skip: apiSkip, sort: apiSort } = apiconfig.drawdates;

  // tslint:disable: radix
  const gameArg = gameId.toString().toLowerCase() as GameID;
  const limitArg = limit ? parseInt(limit.toString()) : apiLimit;
  const skipArg = skip ? parseInt(skip.toString()) : apiSkip;
  const sortArg = (sort ? sort.toString().toLowerCase() : apiSort) as SortOrder;
  // tslint:ensable: radix

  switch (method) {
    case 'GET': {
      const result = await getDrawDates(gameArg, limitArg, skipArg, sortArg);
      res.status(result.statusCode).json(result);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
