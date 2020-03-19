import { getGames } from '../games';
import { GAMES } from '../../constants';

test('should succesfully get the list of games', () => {
  const { data } = getGames();
  expect(data).toHaveLength(GAMES.length);
  data.forEach(({ id, name }) => {
    expect(id).toBeDefined();
    expect(name).toBeDefined();
  });
});
