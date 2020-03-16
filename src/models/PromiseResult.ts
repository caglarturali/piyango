/**
 * PromiseResult interface.
 * Used by /controllers/draws.
 */
export default interface PromiseResult {
  data?: any;
  error?: {
    message: string;
    status: number;
  };
}
