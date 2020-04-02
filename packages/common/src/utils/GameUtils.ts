import { Game, GameID } from '../models/Game';
import { GAMES } from '../constants';

export class GameUtils {
  /**
   * Returns corresponding Game object for id.
   * @param gameId Game ID
   */
  static getGameById(gameId: GameID): Game {
    return GAMES.find((g) => g.id === gameId) as Game;
  }
}
