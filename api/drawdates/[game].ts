import { NowRequest, NowResponse } from '@now/node';
import { getDrawDates } from '../../src/controllers';
import apiconfig from '../../src/apiconfig';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { game, limit },
  } = req;

  switch (method) {
    case 'GET': {
      const result = await getDrawDates(
        game.toString().toLowerCase(),
        // tslint:disable-next-line: radix
        limit ? parseInt(limit.toString()) : apiconfig.limits.drawdates,
      );
      res.status(result.statusCode).json(result);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
