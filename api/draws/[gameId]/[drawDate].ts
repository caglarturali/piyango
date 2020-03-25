/**
 * /draws/:gameId/:drawDate
 */
import { NowRequest, NowResponse } from '@now/node';
import {
  getDrawDetails,
  getDrawDetailsForDraws,
} from '../../../src/controllers';
import { GameID } from '../../../src/models/Game';
import ApiResponse from '../../../src/models/ApiResponse';
import { DrawDataType } from '../../../src/models/Draw';
import conf from '../../../src/apiconfig';
import handler from '../../_handler';

export default async (req: NowRequest, res: NowResponse) => {
  handler(req, res)('GET', async (query) => {
    const { gameId, drawDate } = query;

    const gameArg = gameId.toString().toLowerCase() as GameID;
    const dateArg = drawDate.toString();

    let result: ApiResponse<DrawDataType>;
    if (dateArg.includes(conf.draws.delimiter)) {
      const drawDates = dateArg.split(conf.draws.delimiter);
      result = await getDrawDetailsForDraws(gameArg, drawDates);
    } else {
      result = await getDrawDetails(gameArg, dateArg);
    }

    res.status(result.statusCode).json(result.toResponse());
  });
};
