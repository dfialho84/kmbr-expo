import * as SQLite from 'expo-sqlite';

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!database) {
    database = SQLite.openDatabase('kmbr.db');
    await database.execAsync('PRAGMA foreign_keys = ON');
  }
  return database;
}

export async function initializeDatabase(): Promise<void> {
  const db = await getDatabase();
  // Migrations will be added here as features are created
}

export { SQLite };
