import moment from 'moment';
import { DATE_FORMAT } from '../constants';

/**
 * Checks to see if the date is valid or not.
 * @param {String} date Date string.
 * @param {String} format Date format. YYYYMMDD by default
 */
export const isDateValid = (
  date: string,
  format: string = DATE_FORMAT,
): boolean => {
  return moment(date, format, true).isValid();
};
