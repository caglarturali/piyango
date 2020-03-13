import { NowRequest, NowResponse } from '@now/node';
import { getDrawDetails } from '../../src/controllers';
import { GameID } from '../../src/models/GameID';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { game, date },
  } = req;

  const gameArg = game.toString().toLowerCase() as GameID;
  const dateArg = date.toString();

  switch (method) {
    case 'GET': {
      const result = await getDrawDetails(gameArg, dateArg);
      res.status(result.statusCode).json(result);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
