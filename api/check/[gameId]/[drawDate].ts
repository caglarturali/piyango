/**
 * /check/:gameId/:drawDate
 */
import { NowRequest, NowResponse } from '@now/node';
import { checkNumbers } from '../../../src/controllers';
import CheckBody from '../../../src/models/CheckBody';
import handler from '../../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'POST',
    async (params, body) => {
      const { gameId, drawDate } = params;

      const checkBody = body as CheckBody;

      const result = await checkNumbers(gameId, drawDate, checkBody);
      res.status(result.statusCode).json(result.toResponse(false));
    },
    ['gameId', 'drawDate'],
    ['content-type', 'application/json'],
  );
};
