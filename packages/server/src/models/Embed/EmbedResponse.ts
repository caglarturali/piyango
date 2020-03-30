import Response from '../Response';
import { HTTPHeader } from '../HTTP';

export interface EmbedResponse extends Response {
  status: number;
  contents?: string;
  header?: HTTPHeader;
}
