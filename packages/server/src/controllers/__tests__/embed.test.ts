import { GameID } from '@caglarturali/piyango-common';
import { getEmbeddableStream } from '../embed';
import { STREAM_URL } from '../../constants';

test('should successfully return embeddable stream for valid draw', async () => {
  const { status, contents, error } = await getEmbeddableStream(
    GameID.sanstopu,
    '20200311',
  );
  expect(status).toBe(200);
  expect(contents).toBeDefined();
  expect(contents).toContain(STREAM_URL.base.url);
  expect(error).toBeUndefined();
});

test('should successfully return dummy stream for invalid draw', async () => {
  const { status, contents, error } = await getEmbeddableStream(
    GameID.sanstopu,
    '20200312',
  );
  expect(status).toBe(200);
  expect(contents).toBeDefined();
  expect(contents).toContain(STREAM_URL.dummy.url);
  expect(error).toBeUndefined();
});
