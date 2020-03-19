import { checkNumbers } from '../check';
import { GameID } from '../../models/Game';
import CheckBody from '../../models/CheckBody';
import { RegularCheckResult } from '../../models/RegularDraw';
import { LotteryCheckResult } from '../../models/LotteryDraw';

test('should check numbers successfully for a regular draw', async () => {
  const body: CheckBody = {
    numbers: ['05#20#24#25#32#34', '07#24#25#08#10#51'],
  };

  const { statusCode, data } = await checkNumbers(
    GameID.superloto,
    '20200312',
    body,
  );

  expect(statusCode).toBe(200);
  expect(data).toHaveLength(body.numbers.length);
  data.forEach((res) => {
    const result = res as RegularCheckResult;
    expect(typeof result.prize).toBe('number');
  });
});

test('should check numbers successfully for a lottery draw', async () => {
  const body: CheckBody = {
    numbers: ['501222', '511222', '123180', '221384', '123450'],
  };

  const { statusCode, data } = await checkNumbers(
    GameID.piyango,
    '20200309',
    body,
  );

  expect(statusCode).toBe(200);
  expect(data).toHaveLength(body.numbers.length);
  data.forEach((res) => {
    const result = res as LotteryCheckResult;
    expect(typeof result.prize).toBe('number');
  });
});

test('should respond with an error if length of the numbers are not correct', async () => {
  const body: CheckBody = {
    numbers: ['05#20#24#25#32#34#12#23'],
  };

  const { statusCode, error } = await checkNumbers(
    GameID.superloto,
    '20200312',
    body,
  );

  expect(statusCode).not.toBe(200);
  expect(error).toBeDefined();
});
