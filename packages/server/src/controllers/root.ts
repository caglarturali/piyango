/**
 * Root controller.
 */
import Haikunator from 'haikunator';
import ApiResponse from '../models/ApiResponse';
import { messages } from '../constants';

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
  return new ApiResponse().setFailed(messages.notFound(), 404);
};
