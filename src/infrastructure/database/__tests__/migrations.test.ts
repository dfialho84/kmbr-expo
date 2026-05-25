import { migration001CreateSmokeItem } from '../migrations/001-create-smoke-item';
import { createTestDatabase } from '@mocks/test-helpers/createTestDatabase';

describe('infrastructure/database migrations (IT-3)', () => {
  // IT-3: migration is idempotent — runs twice without error and creates correct table
  it('IT-3: running migration twice on same DB does not throw and creates SmokeItem table', async () => {
    const db = createTestDatabase();

    // First run
    await expect(migration001CreateSmokeItem(db as never)).resolves.not.toThrow();

    // Verify table and columns via PRAGMA
    const columns = db._raw.pragma('table_info(SmokeItem)') as Array<{
      name: string;
      type: string;
      notnull: number;
      pk: number;
    }>;

    const columnNames = columns.map((c) => c.name);
    expect(columnNames).toContain('id');
    expect(columnNames).toContain('label');
    expect(columnNames).toContain('value');
    expect(columnNames).toContain('createdAt');

    const idCol = columns.find((c) => c.name === 'id');
    expect(idCol?.pk).toBe(1);

    const labelCol = columns.find((c) => c.name === 'label');
    expect(labelCol?.notnull).toBe(1);

    // Second run — must not throw (CREATE TABLE IF NOT EXISTS)
    await expect(migration001CreateSmokeItem(db as never)).resolves.not.toThrow();
  });
});
