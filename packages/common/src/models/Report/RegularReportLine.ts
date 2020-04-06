import { IReportLine } from './';

/**
 * Interface definiton of report lines for regular games.
 */
export interface RegularReportLine extends IReportLine {
  winnersCount: number;
}
