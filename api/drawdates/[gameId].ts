/**
 * /drawdates
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawDates } from '../../src/controllers';
import { GameID } from '../../src/models/Game';
import { SortOrder } from '../../src/models/SortOrder';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { gameId, limit, skip, sort },
  } = req;

  const gameArg = gameId.toString().toLowerCase() as GameID;
  const limitArg = limit ? parseInt(limit.toString(), 10) : undefined;
  const skipArg = skip ? parseInt(skip.toString(), 10) : undefined;
  const sortArg = sort
    ? (sort.toString().toLowerCase() as SortOrder)
    : undefined;

  switch (method) {
    case 'GET': {
      const result = await getDrawDates(gameArg, limitArg, skipArg, sortArg);
      res.status(result.statusCode).json(result.toResponse(false));
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
