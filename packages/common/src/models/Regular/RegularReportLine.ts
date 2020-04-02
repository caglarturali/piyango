import { IReportLine } from '../ProcessDraw';

/**
 * Interface definiton of report lines for regular games.
 */
export interface RegularReportLine extends IReportLine {
  winnersCount: number;
}
