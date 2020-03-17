/**
 * /check/:gameId/:drawDate
 */
import { NowRequest, NowResponse } from '@now/node';
import { checkNumbers } from '../../../src/controllers';
import { GameID } from '../../../src/models/Game';
import CheckBody from '../../../src/models/CheckBody';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { gameId, drawDate },
    body,
  }: NowRequest = req;

  const { numbers } = body as CheckBody;

  const gameArg = gameId.toString().toLowerCase() as GameID;
  const dateArg = drawDate.toString();

  switch (method) {
    case 'POST': {
      const result = await checkNumbers(gameArg, dateArg, numbers);
      res.status(result.statusCode).json(result.toObject());
      break;
    }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
