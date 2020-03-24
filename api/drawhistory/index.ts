/**
 * /drawhistory
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawHistoryOfToday } from '../../src/controllers';

export default async (req: NowRequest, res: NowResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const result = await getDrawHistoryOfToday();
      res.status(result.statusCode).json(result.toResponse());
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
