/**
 * PromiseResult interface.
 */
export default interface PromiseResult {
  data: any;
  error: {
    message: string;
    status: number;
  } | null;
}
