import path from 'path';
import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { DrawDataType, GameID, GAMES } from '@caglarturali/piyango-common';
import { IStats } from '../models/Stats/IStats';

type Schema = {
  draws: DrawDataType[];
  stats: IStats | null;
};

const db: { [key: string]: LowdbSync<Schema> } = {};

// Initialize db.
GAMES.forEach(({ id }) => {
  const adapter = new FileSync<Schema>(
    path.join(__dirname, 'data', `${id}.db`),
  );

  const lowDb = lowdb(adapter);

  if (!lowDb.has('draws').value()) {
    lowDb
      .defaults<Schema>({
        draws: [],
        stats:
          id !== GameID.piyango
            ? {
                lastDraw: '',
                numbers: {},
              }
            : null,
      })
      .write();
  }

  // Attach to db.
  db[id] = lowDb;
});

export default db;
