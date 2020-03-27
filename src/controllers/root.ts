/**
 * Root controller.
 */
import Haikunator from 'haikunator';
import ApiResponse from '../models/ApiResponse';

/**
 * Returns a Heroku-like random string.
 */
export const getRootMessage = () => {
  const response = new ApiResponse<{ message: string }>();

  response.addData({
    message: new Haikunator().haikunate(),
  });

  return response;
};

/**
 * Returns a not found message.
 */
export const getNotFoundMessage = () => {
  return new ApiResponse().setFailed('There is nothing here for you', 404);
};
