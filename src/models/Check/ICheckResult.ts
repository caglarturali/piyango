/**
 * Base definiton for check result.
 */
export interface ICheckResult {
  [key: string]: any;
  type: any;
  prize: number;
  match?: any;
  digits?: any;
}
