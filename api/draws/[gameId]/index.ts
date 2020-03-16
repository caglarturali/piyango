/**
 * /draws/:gameId
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawDetailsForLastDraw } from '../../../src/controllers';
import { GameID } from '../../../src/models/Game';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { gameId },
  } = req;

  const gameArg = gameId.toString().toLowerCase() as GameID;

  switch (method) {
    case 'GET': {
      const result = await getDrawDetailsForLastDraw(gameArg);
      res.status(result.statusCode).json(result.toObject());
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
