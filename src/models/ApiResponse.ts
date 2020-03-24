import _ from 'lodash';

/**
 * Base class for an API response.
 */
export default class ApiResponse<T> {
  statusCode: number;
  data: T[];
  error?: string;

  /**
   * Creates an API response object.
   * @param {Number} statusCode HTTP status code
   */
  constructor(statusCode: number = 200) {
    this.statusCode = statusCode;
    this.data = [];
  }

  /**
   * Adds arbitrary data to results.
   * @param {T} data Data to be added
   * @returns ApiResponse instance.
   */
  addData(data: T) {
    this.data.push(data);
    return this;
  }

  /**
   * Sorts data with the help of a comperator function.
   * @param {Function} comperator Comperator function
   */
  sortData(comperator: (a: T, b: T) => number) {
    this.data.sort(comperator);
  }

  /**
   * Returns true if results data is available, otherwise false.
   */
  hasData() {
    return this.data && this.data.length > 0;
  }

  /**
   * Returns true if item is found in the results, otherwise false.
   * @param item Item to check.
   */
  hasItem(item: T) {
    return this.data.some((d) => _.isEqual(d, item));
  }

  /**
   * "Paginates" results based on limit and skip values.
   * @param limit Limit
   * @param skip Count of entries to skip
   */
  paginate(limit: number, skip: number) {
    this.data = this.data.slice(skip, skip + limit);
  }

  /**
   * Sets up a failed response.
   * @param {String} message Error message
   * @param {String} statusCode HTTP status code
   * @returns ApiResponse instance
   */
  setFailed(message: string, statusCode: number = 500) {
    this.statusCode = statusCode;
    this.error = message;
    this.data = [];
    return this;
  }

  /**
   * Returns the pure object representation
   * of the instance, with minimal info attached to it.
   * @param zip Determines if the results will be "zipped" or not
   */
  toResponse(zip: boolean = true) {
    const { data, error } = this;

    if (error) return { error };

    if (zip) {
      if (data.length === 1) return data[0];
    }

    return data;
  }
}
