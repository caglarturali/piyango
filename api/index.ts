import { NowRequest, NowResponse } from '@now/node';
import { DRAWS_DATA_PATH } from '../src/constants';

export default (req: NowRequest, res: NowResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      res.status(200).json({
        name: 'John',
        email: 'john@example.com',
        dataPath: DRAWS_DATA_PATH,
      });
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
