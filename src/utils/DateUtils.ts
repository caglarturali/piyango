import moment from 'moment';
import { DATE_FORMAT } from '../constants';

export default class DateUtils {
  /**
   * Checks to see if the date is valid or not.
   * @param {String} date Date string.
   * @param {String} format Date format. YYYYMMDD by default
   */
  static isDateValid(date: string, format: string = DATE_FORMAT): boolean {
    return moment(date, format, true).isValid();
  }

  /**
   * Compares two date strings and returns true
   * if a is greater than b.
   * @param a Date string
   * @param b Date string
   */
  static isGreaterThan(a: string, b: string): boolean {
    return moment(a, DATE_FORMAT).isAfter(moment(b, DATE_FORMAT));
  }

  /**
   * Compares two date strings and returns true
   * if a is less than b.
   * @param a Date string
   * @param b Date string
   */
  static isLessThan(a: string, b: string): boolean {
    return moment(a, DATE_FORMAT).isBefore(moment(b, DATE_FORMAT));
  }
}
