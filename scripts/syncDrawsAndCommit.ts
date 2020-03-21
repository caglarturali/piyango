/**
 * Based on https://stackoverflow.com/a/55494338
 */
import { execSync } from 'child_process';
const msg = 'SYNC: ' + (process.argv[2] || new Date().toLocaleString());
execSync(
  `npm run sync:draws && git add static/draws && git commit -m "${msg}"`,
  {
    stdio: [0, 1, 2],
  },
);
