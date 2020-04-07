export interface Column {
  main: number[];
  plus?: number[];
}

export type ColumnKeys = keyof Column;
