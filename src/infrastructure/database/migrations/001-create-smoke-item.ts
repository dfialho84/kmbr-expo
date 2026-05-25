import type * as SQLite from 'expo-sqlite';

export async function migration001CreateSmokeItem(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS SmokeItem (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      value TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
}
