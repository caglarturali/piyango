import { IReportLine } from './IReportLine';

/**
 * Interface definiton of report lines for lottery games.
 * Notice that the winningNumbers field is of type string[]!
 */
export interface LotteryReportLine extends IReportLine {
  winningNumbers: string[];
}
