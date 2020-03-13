import fs from 'fs';
import path from 'path';
import { STATIC_DATA_PATH } from '../src/constants';

fs.readdirSync(STATIC_DATA_PATH).forEach((gameId) => {
  fs.readdirSync(path.join(STATIC_DATA_PATH, gameId)).forEach((fileName) => {
    // Build full path.
    const fullPath = path.join(STATIC_DATA_PATH, gameId, fileName);

    if (fs.existsSync(fullPath)) {
      const { data } = require(fullPath);
      if (data) {
        fs.writeFileSync(fullPath, JSON.stringify(data));
      }
    }
  });
});
