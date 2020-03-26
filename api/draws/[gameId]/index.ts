/**
 * /draws/:gameId
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawDetailsForLastDraw } from '../../../src/controllers';
import handler from '../../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'GET',
    async (params) => {
      const { gameId } = params;

      const result = await getDrawDetailsForLastDraw(gameId);
      res.status(result.statusCode).json(result.toResponse());
    },
    ['gameId'],
  );
};
