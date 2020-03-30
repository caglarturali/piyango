/**
 * 404.
 */
import { NowRequest, NowResponse } from '@now/node';
import { getNotFoundMessage } from '../src/controllers';
import { handler } from './_utils';

export default (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', () => {
    const response = getNotFoundMessage();
    res.status(response.statusCode).json(response.toResponse());
  });
};
