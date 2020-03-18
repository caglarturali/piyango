import { SortOrder } from './models/SortOrder';

/**
 * Base configuration for endpoints.
 */
export default {
  drawdates: {
    limit: 52,
    skip: 0,
    sort: SortOrder.DESC,
  },
};
