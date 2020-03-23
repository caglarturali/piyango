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
import { RegularDraw } from '../../../src/models/Regular';
import { LotteryDraw } from '../../../src/models/Lottery';
import conf from '../../../src/apiconfig';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    method,
    query: { gameId, drawDate },
  } = req;

  const gameArg = gameId.toString().toLowerCase() as GameID;
  const dateArg = drawDate.toString();

  switch (method) {
    case 'GET': {
      let result: ApiResponse<RegularDraw | LotteryDraw>;
      if (dateArg.includes(conf.draws.delimiter)) {
        const drawDates = dateArg.split(conf.draws.delimiter);
        result = await getDrawDetailsForDraws(gameArg, drawDates);
      } else {
        result = await getDrawDetails(gameArg, dateArg);
      }

      res.status(result.statusCode).json(result.toObject());
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
