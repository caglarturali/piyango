/**
 * Predefined message builders.
 */
export const messages = {
  error: (v: any) => buildMsg('Error', v),
  unexpected: (e?: any) => buildMsg('Unexpected error', e),
  resNotFound: (v?: any) => buildMsg('Resource not found', v),
  notFound: () => buildMsg('There is nothing here for you'),
  notSupported: (v: any) => buildMsg('Not supported', v),
  invalidGameId: () => buildMsg('Game ID is not valid'),
  invalidDate: (v?: any) => buildMsg('Date is not valid', v),
  invalidNumber: (v?: any) => buildMsg('Number is not valid', v),
  invalidSort: (v?: any) => buildMsg('Sorting order is not valid', v),
  invalidTicket: () => buildMsg('Invalid ticket number'),
  invalidSelection: () => buildMsg('Incorrect column size'),
  missingHeader: (v: any) => buildMsg('Missing header', v),
  notAllowedMethod: (v: any) => buildMsg('Method not allowed', v),
};

const buildMsg = (text: string, param?: any) => {
  if (param) return `${text}: ${param}`;
  return text;
};
