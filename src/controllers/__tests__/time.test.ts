import { getCurrentTime } from '../time';

test('should return current time as a moment object', () => {
  const keys = [
    'years',
    'months',
    'date',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
  ];

  const { statusCode, data } = getCurrentTime();

  const [time] = data;

  expect(statusCode).toBe(200);
  expect(time).toBeDefined();
  keys.forEach((key) => {
    expect(time).toHaveProperty(key);
  });
});
