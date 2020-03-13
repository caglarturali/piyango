import { NowRequest, NowResponse } from '@now/node';
import { getDrawDates } from '../../src/controllers';
import { SortOrder } from '../../src/models/SortOrder';
import apiconfig from '../../src/apiconfig';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { gameId, limit, skip, sort },
  } = req;

  const gameArg = gameId.toString().toLowerCase();
  const limitArg = limit
    ? parseInt(limit.toString()) // tslint:disable-line: radix
    : apiconfig.drawdates.limit;
  const skipArg = skip
    ? parseInt(skip.toString()) // tslint:disable-line: radix
    : apiconfig.drawdates.skip;
  const sortArg = (sort
    ? sort.toString().toLowerCase()
    : apiconfig.drawdates.sort) as SortOrder;

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
