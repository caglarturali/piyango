/**
 * /luckhistory
 */
import { NowRequest, NowResponse } from '@now/node';
import momentTZ from 'moment-timezone';
import { getLuckHistory } from '../../src/controllers';
import { DATE_FORMAT } from '../../src/constants';

export default async (req: NowRequest, res: NowResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const today = momentTZ()
        .tz('Europe/Istanbul')
        .format(DATE_FORMAT);

      const result = await getLuckHistory(today);
      res.status(result.statusCode).json(result.toObject());
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
