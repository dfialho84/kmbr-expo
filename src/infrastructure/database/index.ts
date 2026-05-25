import * as SQLite from 'expo-sqlite';
import { migration001CreateSmokeItem } from './migrations/001-create-smoke-item';

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!database) {
    database = await SQLite.openDatabaseAsync('kmbr.db');
    await database.execAsync('PRAGMA foreign_keys = ON');
  }
  return database;
}

export async function initializeDatabase(): Promise<void> {
  const db = await getDatabase();
  await migration001CreateSmokeItem(db);
}

export { SQLite };
