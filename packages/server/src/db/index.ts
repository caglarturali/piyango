import path from 'path';
import Datastore from 'nedb';
import { DrawDataType, GAMES } from '@caglarturali/piyango-common';
import { DRAWS_DIR_PATH } from '../constants';

const db: { [key: string]: Datastore<DrawDataType> } = {};

// Initialize db.
GAMES.forEach(({ id }) => {
  db[id] = new Datastore<DrawDataType>({
    filename: path.join(DRAWS_DIR_PATH, `${id}.db`),
    autoload: true,
  });
});

export default db;
