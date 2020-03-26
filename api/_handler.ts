import { NowRequest, NowResponse } from '@now/node';
import { HTTPHeader, HTTPMethods } from '../src/models/HTTP';
import { getParamKit, QueryParam } from './_helpers';

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

      // Populate and validate params if necessary.
      const params: { [key: string]: any } = {};
      if (getParams) {
        for (const rawParam of getParams) {
          const { parser, validator, error, status } = getParamKit(rawParam);
          const param = parser(query[rawParam]);

          // Short-circuit if it's not valid.
          if (!validator(param)) {
            return res.status(status || 400).json({ error });
          }

          // Valid. Append it to params.
          params[rawParam] = param;
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
