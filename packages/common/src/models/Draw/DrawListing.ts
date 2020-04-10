import { DrawDate } from './DrawDate';

/**
 * Interface that defines the response object
 * returning from MPI web service.
 */
export interface DrawListing {
  tarih: DrawDate;
  tarihView: string;
}
