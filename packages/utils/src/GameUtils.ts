import { Game, GameID, GAMES } from '@caglarturali/piyango-common';

export class GameUtils {
  /**
   * Returns corresponding Game object for id.
   * @param gameId Game ID
   */
  static getGameById(gameId: GameID): Game {
    return GAMES.find((g) => g.id === gameId) as Game;
  }
}
