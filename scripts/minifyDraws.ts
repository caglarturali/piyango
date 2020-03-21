import fs from 'fs';
import path from 'path';
import { DRAWS_DIR_PATH } from '../src/constants';

fs.readdirSync(DRAWS_DIR_PATH).forEach((gameId) => {
  fs.readdirSync(path.join(DRAWS_DIR_PATH, gameId)).forEach((fileName) => {
    // Build full path.
    const fullPath = path.join(DRAWS_DIR_PATH, gameId, fileName);

    if (fs.existsSync(fullPath)) {
      const { data } = require(fullPath);
      if (data) {
        fs.writeFileSync(fullPath, JSON.stringify(data));
      }
    }
  });
});
