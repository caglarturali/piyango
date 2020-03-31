import { GameColumn } from '../Game';

export interface IProcessDraw {
  winningNumbers(): GameColumn;
  jackpot(): number;
}
