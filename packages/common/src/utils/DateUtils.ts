import moment from 'moment';
import { DateFormat } from '../constants';

export class DateUtils {
  /**
   * Checks to see if the date is valid or not.
   * @param date Date string.
   * @param format Date format. YYYYMMDD by default.
   */
  static isDateValid(
    date: string,
    format: DateFormat = DateFormat.API,
  ): boolean {
    return moment(date, format, true).isValid();
  }

  /**
   * Compares two date strings and returns true
   * if a is greater than b.
   * @param a Date string
   * @param b Date string
   * @param format Date format. YYYYMMDD by default.
   */
  static isGreaterThan(
    a: string,
    b: string,
    format: DateFormat = DateFormat.API,
  ): boolean {
    return moment(a, format).isAfter(moment(b, format));
  }

  /**
   * Compares two date strings and returns true
   * if a is less than b.
   * @param a Date string
   * @param b Date string
   * @param format Date format. YYYYMMDD by default.
   */
  static isLessThan(
    a: string,
    b: string,
    format: DateFormat = DateFormat.API,
  ): boolean {
    return moment(a, format).isBefore(moment(b, format));
  }

  /**
   * Converts between formats.
   * @param date Date string
   * @param srcFormat Format of the source
   * @param destFormat Destination format
   */
  static convert(
    date: string,
    srcFormat: DateFormat,
    destFormat: DateFormat,
  ): string {
    return moment(date, srcFormat).format(destFormat);
  }
}
