import { NowRequest, NowResponse } from '@now/node';
import momentTZ from 'moment-timezone';

export default async (req: NowRequest, res: NowResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const momentDate = momentTZ()
        .tz('Europe/Istanbul')
        .toObject();
      res.status(200).json(momentDate);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
