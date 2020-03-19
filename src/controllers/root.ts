import Haikunator from 'haikunator';
import DummyMessage from '../models/DummyMessage';
import ApiResponse from '../models/ApiResponse';

/**
 * Returns a Heroku-like random string.
 */
export const getRootMessage = () => {
  const response = new ApiResponse<DummyMessage>();

  response.addData({
    message: new Haikunator().haikunate(),
  });

  return response;
};
