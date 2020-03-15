/**
 * /drawhistory/:date
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawHistory } from '../../../src/controllers';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { date },
  } = req;

  const dateArg = date.toString();

  switch (method) {
    case 'GET': {
      const result = await getDrawHistory(dateArg);
      res.status(result.statusCode).json(result.toObject());
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
