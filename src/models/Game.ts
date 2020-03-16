export enum GameID {
  sayisal = 'sayisal',
  sanstopu = 'sanstopu',
  onnumara = 'onnumara',
  superloto = 'superloto',
  piyango = 'piyango',
}

export interface NumbersPool {
  select: number;
  from: number;
}

export interface GameDrawDate {
  weekday: number;
  since: string;
}

export default interface Game {
  id: GameID;
  name: string;
  embedSlug?: string;
  columns?: number;
  pool?: NumbersPool[];
  drawDates?: GameDrawDate[];
  lottery?: boolean;
}
