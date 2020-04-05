/**
 * Base definiton for check result.
 */
export interface CheckResult {
  [key: string]: any;
  type: any;
  prize: number;
  match?: any;
  digits?: any;
}
