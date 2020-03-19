import moment from 'moment';
import { getDrawDates } from '../drawdates';
import { GameID } from '../../models/Game';
import { SortOrder } from '../../models/SortOrder';
import { DATE_FORMAT } from '../../constants';
import { isDateValid } from '../../utils';

test('should successfully get draw dates for given game', async () => {
  const limit = 10;
  const { success, statusCode, data, error } = await getDrawDates(
    GameID.sayisal,
    limit,
    0,
    SortOrder.DESC,
  );
  expect(statusCode).toBe(200);
  expect(success).toBeTruthy();
  expect(data).toBeDefined();
  expect(data).toHaveLength(limit);
  data.forEach(({ tarih }) => {
    expect(isDateValid(tarih)).toBeTruthy();
  });
  expect(error).toBeUndefined();
});

test('should respond with error when invalid gameId is given', async () => {
  const fakeGameId = 'sayisalx' as GameID;
  const { statusCode, success, error } = await getDrawDates(
    fakeGameId,
    10,
    0,
    SortOrder.DESC,
  );
  expect(success).toBeFalsy();
  expect(statusCode).not.toBe(200);
  expect(error).toBeDefined();
});

test('should sort results in specified order', async () => {
  const { data } = await getDrawDates(GameID.onnumara, 2, 0, SortOrder.ASC);
  const [first, second] = data;
  const firstMoment = moment(first.tarih, DATE_FORMAT).unix();
  const secondMoment = moment(second.tarih, DATE_FORMAT).unix();
  expect(firstMoment).toBeLessThan(secondMoment);
});
