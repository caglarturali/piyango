import { NowRequest, NowResponse } from '@now/node';
import { getDrawDates } from '../../src/controllers';
import { SortOrder } from '../../src/models/SortOrder';
import apiconfig from '../../src/apiconfig';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { game, limit, order },
  } = req;

  const gameArg = game.toString().toLowerCase();
  const limitArg = limit
    ? parseInt(limit.toString()) // tslint:disable-line: radix
    : apiconfig.limits.drawdates;
  const orderArg = (order
    ? order.toString().toLowerCase()
    : apiconfig.order.drawdates) as SortOrder;

  switch (method) {
    case 'GET': {
      const result = await getDrawDates(gameArg, limitArg, orderArg);
      res.status(result.statusCode).json(result);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
