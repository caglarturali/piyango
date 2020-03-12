import _ from 'lodash';

/**
 * Base class for an API response.
 */
export default class ApiResponse<T> {
  statusCode: number;
  success: boolean;
  data: {
    count: number;
    results: T[];
  } | null;
  error: { message: string } | null;

  /**
   * Creates an API response object.
   * @param {Number} statusCode HTTP status code
   * @param {Boolean} success Successful or not
   */
  constructor(statusCode: number = 200, success: boolean = true) {
    this.statusCode = statusCode;
    this.success = success;
    this.data = {
      count: 0,
      results: [],
    };
    this.error = null;
  }

  /**
   * Adds arbitrary data to results.
   * @param {T} data Data to be added
   */
  addData(data: T) {
    if (this.data) {
      this.data.results.push(data);
      this.data.count += 1;
    }
  }

  /**
   * Sorts data with the help of a comperator function.
   * @param {Function} comperator Comperator function
   */
  sortData(comperator: (a: T, b: T) => number) {
    if (this.data) this.data.results.sort(comperator);
  }

  /**
   * Returns true if results data is available, otherwise false.
   */
  hasData() {
    return this.data && this.data.count > 0;
  }

  /**
   * Returns true if item is found in the results, otherwise false.
   * @param item Item to check.
   */
  hasItem(item: T) {
    if (!this.data) {
      return false;
    }
    return this.data.results.some((d) => _.isEqual(d, item));
  }

  /**
   * "Paginates" results based on limit and skip values.
   * @param limit Limit
   * @param skip Count of entries to skip
   */
  paginate(limit: number, skip: number) {
    if (this.data) {
      this.data.results = this.data.results.slice(skip, skip + limit);
      this.data.count = this.data.results.length;
    }
  }

  /**
   * Sets up a failed response.
   * @param {String} message Error message
   * @param {String} statusCode HTTP status code
   */
  setFailed(message: string, statusCode: number) {
    this.statusCode = statusCode || 500;
    this.success = false;
    this.error = {
      message,
    };
    this.data = null;
  }
}
