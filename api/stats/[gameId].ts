/**
 * /stats
 */
import { NowRequest, NowResponse } from '@now/node';
import { getStatsForGame } from '../../src/controllers';
import { handler } from '../_utils';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'GET',
    async (params) => {
      const { gameId } = params;

      const result = await getStatsForGame(gameId);
      res.status(result.statusCode).json(result.toResponse());
    },
    ['gameId'],
  );
};
