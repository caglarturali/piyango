/**
 * Based on https://stackoverflow.com/a/55494338
 */
import { execSync } from 'child_process';
const msg = 'SYNC: ' + (process.argv[2] || new Date().toLocaleString());
execSync(
  `npm run sync:draws && npm run sync:stats && git add static/ && git commit -m "${msg}"`,
  {
    stdio: [0, 1, 2],
  },
);
