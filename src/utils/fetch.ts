import { Response } from 'node-fetch';

/**
 * Resolve handler.
 * @param {Response} response Response object
 */
export const resolveHandler = (response: Response) => {
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response;
};

/**
 * Reject handler.
 * @param {Response} response Response object
 */
export const rejectHandler = (response: Response) => {
  throw new Error(`Error ${response.status}: ${response.statusText}`);
};
