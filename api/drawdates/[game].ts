import { NowRequest, NowResponse } from '@now/node';
import { getDrawDates } from '../../src/controllers';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { game },
  } = req;

  switch (method) {
    case 'GET': {
      const result = await getDrawDates(game.toString().toLowerCase());
      res.status(result.statusCode).json(result);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
