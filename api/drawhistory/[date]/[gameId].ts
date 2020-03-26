/**
 * /drawhistory/:date/:gameId
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawHistory } from '../../../src/controllers';
import handler from '../../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'GET',
    async (params) => {
      const { date, gameId } = params;

      const result = await getDrawHistory(date, gameId);
      res.status(result.statusCode).json(result.toResponse());
    },
    ['gameId', 'date'],
  );
};
