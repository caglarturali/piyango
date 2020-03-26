import { NowRequest, NowResponse } from '@now/node';
import { HTTPHeader, HTTPMethods } from '../src/models/HTTP';
import { getParserForParam, QueryParam } from './_helpers';

export type CallbackFunction = (params: any, body: any) => void;

/**
 * Generic request handler.
 * @param req NowRequest object
 * @param res NowResponse object
 */
const handler = (req: NowRequest, res: NowResponse) => (
  allowedMethod: HTTPMethods,
  callback: CallbackFunction,
  getParams?: QueryParam[],
  allowedHeader?: HTTPHeader,
) => {
  const { method, query, body, headers } = req;

  switch (method) {
    case allowedMethod: {
      if (allowedHeader) {
        // Validate header.
        const [key, value] = allowedHeader;
        if (headers[key.toLowerCase()] !== value) {
          return res
            .status(400)
            .end(`The header ${key} must be set to ${value}`);
        }
      }

      // Populate params if necessary.
      const params: { [key: string]: any } = {};
      if (getParams) {
        for (const param of getParams) {
          params[param] = getParserForParam(param)(query[param]);
        }
      }

      return callback(params, body);
    }

    default:
      res.setHeader('Allow', [allowedMethod]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default handler;
