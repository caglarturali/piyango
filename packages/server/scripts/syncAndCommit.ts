/**
 * Based on https://stackoverflow.com/a/55494338
 */
import { execCommandsAndCommit } from './_utils';

const msg = 'SYNC: ' + (process.argv[2] || new Date().toLocaleString());
const commands = [
  'npm run sync:draws',
  'npm run sync:stats',
  'git add src/db/data/',
];

execCommandsAndCommit(commands, msg);
