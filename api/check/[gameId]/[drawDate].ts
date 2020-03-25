/**
 * /check/:gameId/:drawDate
 */
import { NowRequest, NowResponse } from '@now/node';
import { checkNumbers } from '../../../src/controllers';
import { GameID } from '../../../src/models/Game';
import CheckBody from '../../../src/models/CheckBody';
import handler from '../../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'POST',
    async (query, body) => {
      const { gameId, drawDate } = query;

      const gameArg = gameId.toString().toLowerCase() as GameID;
      const dateArg = drawDate.toString();

      const checkBody = body as CheckBody;

      const result = await checkNumbers(gameArg, dateArg, checkBody);
      res.status(result.statusCode).json(result.toResponse(false));
    },
    ['content-type', 'application/json'],
  );
};
