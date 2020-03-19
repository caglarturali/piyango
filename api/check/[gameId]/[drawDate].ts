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
    headers: { 'content-type': contentType },
  }: NowRequest = req;

  const gameArg = gameId.toString().toLowerCase() as GameID;
  const dateArg = drawDate.toString();

  const checkBody = body as CheckBody;

  if (!(contentType && contentType === 'application/json')) {
    return res
      .status(400)
      .end('Content-Type header must be set to application/json');
  }

  switch (method) {
    case 'POST': {
      const result = await checkNumbers(gameArg, dateArg, checkBody);
      res.status(result.statusCode).json(result.toObject(false));
      break;
    }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
