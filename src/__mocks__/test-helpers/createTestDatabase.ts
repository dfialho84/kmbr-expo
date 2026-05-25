import Database from 'better-sqlite3';

/**
 * Creates an in-memory SQLite database that implements the expo-sqlite
 * SQLiteDatabase interface (async API subset used by this project).
 * Only for use in tests — never in production code.
 */
export function createTestDatabase(): ExpoSQLiteCompatibleDb {
  const db = new Database(':memory:');
  return {
    execAsync(sql: string): Promise<void> {
      db.exec(sql);
      return Promise.resolve();
    },
    runAsync(
      sql: string,
      params: (string | number | null)[]
    ): Promise<{ lastInsertRowId: number; changes: number }> {
      const stmt = db.prepare(sql);
      const result = stmt.run(...params);
      return Promise.resolve({
        lastInsertRowId: Number(result.lastInsertRowid),
        changes: result.changes,
      });
    },
    getFirstAsync<T>(
      sql: string,
      params: (string | number | null)[]
    ): Promise<T | null> {
      const stmt = db.prepare(sql);
      const row = stmt.get(...params) as T | undefined;
      return Promise.resolve(row ?? null);
    },
    getAllAsync<T>(
      sql: string,
      params: (string | number | null)[]
    ): Promise<T[]> {
      const stmt = db.prepare(sql);
      const rows = stmt.all(...params) as T[];
      return Promise.resolve(rows);
    },
    /** Direct access to better-sqlite3 for test setup/teardown */
    _raw: db,
  };
}

export interface ExpoSQLiteCompatibleDb {
  execAsync(sql: string): Promise<void>;
  runAsync(
    sql: string,
    params: (string | number | null)[]
  ): Promise<{ lastInsertRowId: number; changes: number }>;
  getFirstAsync<T>(sql: string, params: (string | number | null)[]): Promise<T | null>;
  getAllAsync<T>(sql: string, params: (string | number | null)[]): Promise<T[]>;
  _raw: Database.Database;
}
