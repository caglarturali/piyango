/**
 * /time
 */
import { NowRequest, NowResponse } from '@now/node';
import { getCurrentTime } from '../../src/controllers';

export default async (req: NowRequest, res: NowResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const time = getCurrentTime();
      res.status(200).json(time);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
