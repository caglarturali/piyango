import { CheckResult } from '@caglarturali/piyango-common';

/**
 * Base interface for check utility classes.
 */
export interface ICheckNumbers {
  results: CheckResult[];
  validate(): boolean;
  process(): any;
}
