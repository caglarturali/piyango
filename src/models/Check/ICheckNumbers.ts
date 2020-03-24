import { ICheckResult } from '.';

/**
 * Base interface for check utility classes.
 */
export interface ICheckNumbers {
  results: ICheckResult[];
  validate(): boolean;
  process(): any;
}
