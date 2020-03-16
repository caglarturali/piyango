import { GameID } from './Game';

export default interface DrawHistory {
  gameId: GameID;
  draws: string[];
}
