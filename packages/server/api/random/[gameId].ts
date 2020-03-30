/**
 * /random/:gameId
 */
import { NowRequest, NowResponse } from '@now/node';
import { generateRandomGuesses } from '../../src/controllers';
import { handler } from '../_utils';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'GET',
    async (params) => {
      const { gameId, col } = params;

      const result = await generateRandomGuesses(gameId, col);
      res.status(result.statusCode).json(result.toResponse(false));
    },
    ['gameId', 'col'],
  );
};
