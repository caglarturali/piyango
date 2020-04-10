/**
 * Root.
 */
import { NowRequest, NowResponse } from '@now/node';
import { getRootMessage } from '../src/controllers';
import { handler } from '../api/_utils';

export default (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', () => {
    const response = getRootMessage();
    res.status(response.statusCode).json(response.toResponse());
  });
};
