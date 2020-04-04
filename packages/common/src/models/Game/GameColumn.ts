export interface GameColumn {
  main: number[];
  plus?: number[];
}

export type GameColumnKeys = keyof GameColumn;
