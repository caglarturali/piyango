import { NowRequest, NowRequestQuery, NowResponse } from '@now/node';
import { HTTPMethods } from '../src/models/HTTPMethods';
import { Header } from '../src/models/Header';

export type CallbackFunction = (query: NowRequestQuery, body: any) => void;

/**
 * Generic request handler.
 * @param req NowRequest object
 * @param res NowResponse object
 */
const handler = (req: NowRequest, res: NowResponse) => (
  allowedMethod: HTTPMethods,
  callback: CallbackFunction,
  allowedHeader?: Header,
) => {
  const { method, query, body, headers } = req;

  switch (method) {
    case allowedMethod: {
      if (allowedHeader) {
        const [key, value] = allowedHeader;
        if (headers[key.toLowerCase()] !== value.toString().toLowerCase()) {
          return res
            .status(400)
            .end(`The header ${key} must be set to ${value}`);
        }
      }

      return callback(query, body);
    }

    default:
      res.setHeader('Allow', [allowedMethod]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default handler;
