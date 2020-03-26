/**
 * /draws/:gameId/:drawDate
 */
import { NowRequest, NowResponse } from '@now/node';
import {
  getDrawDetails,
  getDrawDetailsForDraws,
} from '../../../src/controllers';
import ApiResponse from '../../../src/models/ApiResponse';
import { DrawDataType } from '../../../src/models/Draw';
import conf from '../../../src/apiconfig';
import { handler } from '../../_utils';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)(
    'GET',
    async (params) => {
      const { gameId, drawDate } = params;

      let result: ApiResponse<DrawDataType>;
      if (drawDate.includes(conf.delimiter)) {
        const drawDates = drawDate.split(conf.delimiter);
        result = await getDrawDetailsForDraws(gameId, drawDates);
      } else {
        result = await getDrawDetails(gameId, drawDate);
      }

      res.status(result.statusCode).json(result.toResponse());
    },
    ['gameId', 'drawDate'],
  );
};
