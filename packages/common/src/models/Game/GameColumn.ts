export interface GameColumn {
  [index: string]: number[] | undefined;
  main: number[];
  plus?: number[];
}
