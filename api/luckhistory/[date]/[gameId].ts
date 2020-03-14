/**
 * /luckhistory/:date/:gameId
 */
import { NowRequest, NowResponse } from '@now/node';
import { getLuckHistoryForGame } from '../../../src/controllers';
import { GameID } from '../../../src/models/GameID';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { date, gameId },
  } = req;

  const gameArg = gameId.toString().toLowerCase() as GameID;
  const dateArg = date.toString();

  switch (method) {
    case 'GET': {
      const result = await getLuckHistoryForGame(dateArg, gameArg);
      res.status(result.statusCode).json(result);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
