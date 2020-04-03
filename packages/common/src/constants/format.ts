/**
 * Date formats used throughout the project.
 */
export enum DateFormat {
  /**
   * API date format.
   */
  API = 'YYYYMMDD',
  /**
   * Date format in hyphenated string form.
   */
  URL = 'DD-MM-YYYY',
  /**
   * Date format in human-readable form.
   */
  FRIENDLY = 'DD/MM/YYYY',
  /**
   * Format string for embeddable stream resources.
   */
  EMBED = 'DD_MM_YYYY',
  /**
   * Date format used for drawhistory endpoint.
   */
  SHORT = 'MMDD',
}
