import { getRootMessage } from '../root';

test('should return an object with message field', () => {
  const { statusCode, data, error } = getRootMessage();

  const [msg] = data;

  expect(statusCode).toBe(200);
  expect(error).toBeUndefined();
  expect(typeof msg.message).toBe('string');
});
