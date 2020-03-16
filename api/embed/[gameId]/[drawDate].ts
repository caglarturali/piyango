/**
 * /embed/:gameId/:drawDate
 */
import { NowRequest, NowResponse } from '@now/node';
import { getEmbeddableStream } from '../../../src/controllers';
import { GameID } from '../../../src/models/Game';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { gameId, drawDate },
  } = req;

  const gameArg = gameId.toString().toLowerCase() as GameID;
  const dateArg = drawDate.toString();

  switch (method) {
    case 'GET': {
      const { status, contents, error } = await getEmbeddableStream(
        gameArg,
        dateArg,
      );

      if (error) {
        return res.status(status).end(error);
      }

      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
      res.status(status).end(contents);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
