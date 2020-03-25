/**
 * /random
 */
import { NowRequest, NowResponse } from '@now/node';
import { generateRandomGuesses } from '../../src/controllers';
import { GameID } from '../../src/models/Game';
import handler from '../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', async (query) => {
    const { gameId, col } = query;

    const gameArg = gameId.toString().toLowerCase() as GameID;
    const colsArg = col ? parseInt(col.toString(), 10) : undefined;

    const result = await generateRandomGuesses(gameArg, colsArg);
    res.status(result.statusCode).json(result.toResponse(false));
  });
};
