import moment from 'moment';
import { getDrawDates } from '../drawdates';
import { GameID } from '../../models/Game';
import { SortOrder } from '../../models/SortOrder';
import { DATE_FORMAT } from '../../constants';
import DateUtils from '../../utils/DateUtils';

test('should successfully get draw dates for given game', async () => {
  const limit = 10;
  const { statusCode, data, error } = await getDrawDates(
    GameID.sayisal,
    limit,
    0,
    SortOrder.DESC,
  );
  expect(statusCode).toBe(200);
  expect(data).toBeDefined();
  expect(data).toHaveLength(limit);
  data.forEach((date) => {
    expect(DateUtils.isDateValid(date)).toBeTruthy();
  });
  expect(error).toBeUndefined();
});

// test('should respond with error when invalid gameId is given', async () => {
//   const fakeGameId = 'sayisalx' as GameID;
//   const { statusCode, error } = await getDrawDates(
//     fakeGameId,
//     10,
//     0,
//     SortOrder.DESC,
//   );
//   expect(statusCode).not.toBe(200);
//   expect(error).toBeDefined();
// });

test('should sort results in specified order', async () => {
  const { data } = await getDrawDates(GameID.onnumara, 2, 0, SortOrder.ASC);
  const [first, second] = data;
  const firstMoment = moment(first, DATE_FORMAT).unix();
  const secondMoment = moment(second, DATE_FORMAT).unix();
  expect(firstMoment).toBeLessThan(secondMoment);
});
