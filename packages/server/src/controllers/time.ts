/**
 * Time controller.
 */
import momentTZ, { MomentObjectOutput } from 'moment-timezone';
import ApiResponse from '../models/ApiResponse';

/**
 * Returns current time as a moment object.
 */
export const getCurrentTime = () => {
  const apiResponse = new ApiResponse<MomentObjectOutput>();

  const now = momentTZ().tz('Europe/Istanbul').toObject();

  apiResponse.addData(now);

  return apiResponse;
};
