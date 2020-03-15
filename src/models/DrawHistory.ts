import { GameID } from './GameID';

export default interface DrawHistory {
  gameId: GameID;
  draws: string[];
}
