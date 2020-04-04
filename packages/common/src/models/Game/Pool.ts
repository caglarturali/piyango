import { NumbersPool } from '../Game';

export interface Pool {
  main: NumbersPool;
  plus?: NumbersPool;
}

export type PoolKeys = keyof Pool;
