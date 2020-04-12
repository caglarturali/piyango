import { DrawDate, NumFrequency } from '@caglarturali/piyango-common';

export interface IStats {
  lastDraw: DrawDate;
  numbers: {
    [num: string]: NumFrequency;
  };
}
