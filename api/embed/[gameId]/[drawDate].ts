/**
 * /embed/:gameId/:drawDate
 */
import { NowRequest, NowResponse } from '@now/node';
import { getEmbeddableStream } from '../../../src/controllers';
import { GameID } from '../../../src/models/Game';
import handler from '../../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', async (query) => {
    const { gameId, drawDate } = query;

    const gameArg = gameId.toString().toLowerCase() as GameID;
    const dateArg = drawDate.toString();

    const { status, contents, error, header } = await getEmbeddableStream(
      gameArg,
      dateArg,
    );

    if (error) return res.status(status).end(error);

    if (header) res.setHeader(...header);
    res.status(status).end(contents);
  });
};
