import { NowRequest, NowResponse } from '@now/node';
import { getRootMessage } from '../src/controllers';

export default (req: NowRequest, res: NowResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const response = getRootMessage();
      res.status(response.statusCode).json(response.toObject());
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
