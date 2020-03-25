/**
 * /drawhistory/:date
 */
import { NowRequest, NowResponse } from '@now/node';
import { getDrawHistory } from '../../../src/controllers';
import handler from '../../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', async (query) => {
    const { date } = query;

    const dateArg = date.toString();

    const result = await getDrawHistory(dateArg);
    res.status(result.statusCode).json(result.toResponse());
  });
};
