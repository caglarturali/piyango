import { MatchText } from '../Match';

/**
 * Base definiton for check result.
 */
export interface CheckResult {
  [key: string]: any;
  type: MatchText | null;
  prize: number;
  match?: any;
  digits?: any;
}
