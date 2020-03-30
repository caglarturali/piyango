/**
 * /embed/:gameId/:drawDate
 */
import { NowRequest, NowResponse } from '@now/node';
import { getEmbeddableStream } from '../../../src/controllers';
import { handler } from '../../_utils';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'GET',
    async (params) => {
      const { gameId, drawDate } = params;

      const { status, contents, error, header } = await getEmbeddableStream(
        gameId,
        drawDate,
      );

      if (error) return res.status(status).end(error);

      if (header) res.setHeader(...header);
      res.status(status).end(contents);
    },
    ['gameId', 'drawDate'],
  );
};
