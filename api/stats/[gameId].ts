/**
 * /stats
 */
import { NowRequest, NowResponse } from '@now/node';
import { getStatsForGame } from '../../src/controllers';
import { GameID } from '../../src/models/Game';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { gameId },
  } = req;

  const gameArg = gameId.toString().toLowerCase() as GameID;

  switch (method) {
    case 'GET': {
      const result = await getStatsForGame(gameArg);
      res.status(result.statusCode).json(result.toResponse());
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
