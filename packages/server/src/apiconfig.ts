import { SortOrder } from './models/SortOrder';

/**
 * Base configuration for endpoints.
 */
export default {
  drawdates: {
    limit: 25,
    skip: 0,
    sort: SortOrder.DESC,
  },
  delimiter: ',',
};
