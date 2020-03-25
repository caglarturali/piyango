/**
 * /draws
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawDetailsForLatestDraws } from '../../src/controllers';
import handler from '../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', async () => {
    const result = await getDrawDetailsForLatestDraws();
    res.status(result.statusCode).json(result.toResponse());
  });
};
