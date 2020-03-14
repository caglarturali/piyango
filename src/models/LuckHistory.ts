import { GameID } from './GameID';

export default interface LuckHistory {
  gameId: GameID;
  draws: string[];
}
