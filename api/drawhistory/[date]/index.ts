/**
 * /drawhistory/:date
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawHistory } from '../../../src/controllers';
import { handler } from '../../_utils';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'GET',
    async (params) => {
      const { date } = params;

      const result = await getDrawHistory(date);
      res.status(result.statusCode).json(result.toResponse());
    },
    ['date'],
  );
};
