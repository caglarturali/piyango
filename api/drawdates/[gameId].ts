/**
 * /drawdates
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawDates } from '../../src/controllers';
import { handler } from '../_utils';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'GET',
    async (params) => {
      const { gameId, limit, skip, sort } = params;

      const result = await getDrawDates(gameId, limit, skip, sort);
      res.status(result.statusCode).json(result.toResponse(false));
    },
    ['gameId', 'limit', 'skip', 'sort'],
  );
};
