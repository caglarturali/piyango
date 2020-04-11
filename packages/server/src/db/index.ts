import path from 'path';
import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { DrawDataType, GAMES } from '@caglarturali/piyango-common';
import { NumFrequency } from '../models/Stats/NumFrequency';

type Schema = {
  draws: DrawDataType[];
  stats: NumFrequency[];
};

const db: { [key: string]: LowdbSync<Schema> } = {};

// Initialize db.
GAMES.forEach(({ id }) => {
  const adapter = new FileSync<Schema>(
    path.join(__dirname, 'draws', `${id}.db`),
  );

  const lowDb = lowdb(adapter);

  if (!lowDb.has('draws').value()) {
    lowDb
      .defaults<Schema>({ draws: [], stats: [] })
      .write();
  }

  // Attach to db.
  db[id] = lowDb;
});

export default db;
