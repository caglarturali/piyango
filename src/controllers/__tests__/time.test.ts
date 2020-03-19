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

  const time = getCurrentTime();

  expect(time).toBeDefined();
  keys.forEach((key) => {
    expect(time).toHaveProperty(key);
  });
});
