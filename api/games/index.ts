/**
 * /games
 */
import { NowRequest, NowResponse } from '@now/node';
import { getGames } from '../../src/controllers';

export default (req: NowRequest, res: NowResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const result = getGames();
      res.status(result.statusCode).json(result.toObject());
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
