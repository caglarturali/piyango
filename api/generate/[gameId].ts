/**
 * /generate
 */
import { NowRequest, NowResponse } from '@now/node';
import { generateGuesses } from '../../src/controllers';
import { GameID } from '../../src/models/Game';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { gameId, col },
  } = req;

  const gameArg = gameId.toString().toLowerCase() as GameID;
  const colsArg = col ? parseInt(col.toString(), 10) : undefined;

  switch (method) {
    case 'GET': {
      const result = await generateGuesses(gameArg, colsArg);
      res.status(result.statusCode).json(result.toResponse(false));
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
