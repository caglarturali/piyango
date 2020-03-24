/**
 * /time
 */
import { NowRequest, NowResponse } from '@now/node';
import { getCurrentTime } from '../../src/controllers';

export default (req: NowRequest, res: NowResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const response = getCurrentTime();
      res.status(response.statusCode).json(response.toResponse());
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
