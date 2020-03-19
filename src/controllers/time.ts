import momentTZ from 'moment-timezone';

/**
 * Returns current time as a moment object.
 */
export const getCurrentTime = () => {
  return momentTZ()
    .tz('Europe/Istanbul')
    .toObject();
};
