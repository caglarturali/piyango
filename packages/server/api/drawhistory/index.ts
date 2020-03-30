/**
 * /drawhistory
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawHistoryOfToday } from '../../src/controllers';
import { handler } from '../_utils';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', async () => {
    const result = await getDrawHistoryOfToday();
    res.status(result.statusCode).json(result.toResponse());
  });
};
