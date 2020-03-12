/**
 * Base configuration for endpoints.
 */
import { SortOrder } from './models/SortOrder';

export default {
  limits: {
    drawdates: 104,
  },
  order: {
    drawdates: SortOrder.DESC,
  },
};
