import { getCommentCountFor } from '../comments';
import { GameID } from '@caglarturali/piyango-common';

describe('/comments', () => {
  test('should get comments count for given draw', async () => {
    const {
      statusCode,
      data: [count],
      error,
    } = await getCommentCountFor(GameID.sayisal, '20200411');
    expect(statusCode).toBe(200);
    expect(error).toBeUndefined();
    expect(typeof count).toBe('number');
  });
});
