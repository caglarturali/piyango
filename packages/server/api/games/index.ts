/**
 * /games
 */
import { NowRequest, NowResponse } from '@now/node';
import { getGames } from '../../src/controllers';
import { handler } from '../_utils';

export default (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', () => {
    const result = getGames();
    res.status(result.statusCode).json(result.toResponse());
  });
};
