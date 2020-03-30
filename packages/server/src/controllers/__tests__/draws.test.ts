import moment from 'moment';
import {
  DATE_FORMAT,
  DATE_FORMAT_FRIENDLY,
  GameID,
  GAMES,
  RegularDrawData,
  RegularDrawType,
} from '@caglarturali/piyango-common';
import {
  getDrawDetailsForDraw,
  getDrawDetailsForDraws,
  getDrawDetailsForLastDraw,
  getDrawDetailsForLatestDraws,
} from '../draws';

test('should get draw details for latest draws', async () => {
  const { statusCode, data } = await getDrawDetailsForLatestDraws();

  expect(statusCode).toBe(200);
  expect(data).toHaveLength(GAMES.length);
});

test('should get draw details for the last draw for given game', async () => {
  const { statusCode, data, error } = await getDrawDetailsForLastDraw(
    GameID.superloto,
  );
  const drawDetails = data[0] as RegularDrawData;

  expect(statusCode).toBe(200);
  expect(error).toBeUndefined();
  expect(data).toBeDefined();
  expect(data).toHaveLength(1);
  expect(drawDetails.cekilisTuru).toBe(RegularDrawType.SUPER_LOTO);
});

test('should get draw details for given game and dates', async () => {
  const dates = ['20200311', '20200314'];
  const { statusCode, data, error } = await getDrawDetailsForDraws(
    GameID.sayisal,
    dates,
  );

  expect(statusCode).toBe(200);
  expect(error).toBeUndefined();
  expect(data).toBeDefined();
  expect(data).toHaveLength(dates.length);
});

test('should get draw details for given game and date', async () => {
  const dateStr = '20200312';
  const { statusCode, data, error } = await getDrawDetailsForDraw(
    GameID.superloto,
    dateStr,
  );
  const drawDetails = data[0] as RegularDrawData;

  expect(statusCode).toBe(200);
  expect(error).toBeUndefined();
  expect(data).toBeDefined();
  expect(data).toHaveLength(1);
  expect(drawDetails.cekilisTuru).toBe(RegularDrawType.SUPER_LOTO);
  expect(drawDetails.cekilisTarihi).toBe(
    moment(dateStr, DATE_FORMAT).format(DATE_FORMAT_FRIENDLY),
  );
});

test('should not get draw details for invalid game', async () => {
  const dateStr = '20200312';
  const { statusCode, data, error } = await getDrawDetailsForDraw(
    'not-a-valid-game' as GameID,
    dateStr,
  );

  expect(statusCode).not.toBe(200);
  expect(error).toBeDefined();
  expect(data).toHaveLength(0);
});

test('should not get draw details for invalid date', async () => {
  const dateStr = '20200312XX';
  const { statusCode, data, error } = await getDrawDetailsForDraw(
    GameID.superloto,
    dateStr,
  );

  expect(statusCode).not.toBe(200);
  expect(error).toBeDefined();
  expect(data).toHaveLength(0);
});
