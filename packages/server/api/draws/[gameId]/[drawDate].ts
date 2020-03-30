/**
 * /draws/:gameId/:drawDate
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawDetails } from '../../../src/controllers';
import { handler } from '../../_utils';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'GET',
    async (params) => {
      const { gameId, drawDate } = params;

      const result = await getDrawDetails(gameId, drawDate);
      res.status(result.statusCode).json(result.toResponse());
    },
    ['gameId', 'drawDate'],
  );
};
