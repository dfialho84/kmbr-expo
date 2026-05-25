import { SmokeSQLiteRepository } from '../SmokeSQLiteRepository';
import { createTestDatabase } from '@mocks/test-helpers/createTestDatabase';

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS SmokeItem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );
`;

describe('SmokeSQLiteRepository (IT-1, IT-2)', () => {
  let db: ReturnType<typeof createTestDatabase>;
  let repo: SmokeSQLiteRepository;

  beforeEach(async () => {
    db = createTestDatabase();
    await db.execAsync(CREATE_TABLE_SQL);
    repo = new SmokeSQLiteRepository(db as never);
  });

  // IT-1: save() returns SmokeItem with generated id and findById returns same item
  it('IT-1: save() returns SmokeItem with numeric id and all fields; findById returns matching item', async () => {
    const dto = { label: 'integration-test', value: 'test-value' };
    const saved = await repo.save(dto);

    expect(typeof saved.id).toBe('number');
    expect(saved.id).toBeGreaterThan(0);
    expect(saved.label).toBe(dto.label);
    expect(saved.value).toBe(dto.value);
    expect(saved.createdAt).toBeTruthy();
    expect(() => new Date(saved.createdAt)).not.toThrow();

    const found = await repo.findById(saved.id);
    expect(found).not.toBeNull();
    expect(found?.id).toBe(saved.id);
    expect(found?.label).toBe(saved.label);
    expect(found?.value).toBe(saved.value);
    expect(found?.createdAt).toBe(saved.createdAt);
  });

  // IT-2a: findById with existing id returns correct item
  it('IT-2a: findById() with existing id returns correct SmokeItem', async () => {
    // Pre-populate via SQL directly
    db._raw.prepare(
      "INSERT INTO SmokeItem (label, value, createdAt) VALUES ('direct-label', 'direct-value', '2024-01-01T00:00:00.000Z')"
    ).run();
    const insertedId = Number(db._raw.prepare('SELECT last_insert_rowid() as id').get() as { id: number } | undefined ? (db._raw.prepare('SELECT last_insert_rowid() as id').get() as { id: number }).id : 1);

    const found = await repo.findById(insertedId);
    expect(found).not.toBeNull();
    expect(found?.label).toBe('direct-label');
    expect(found?.value).toBe('direct-value');
    expect(found?.createdAt).toBe('2024-01-01T00:00:00.000Z');
  });

  // IT-2b: findById with non-existing id returns null
  it('IT-2b: findById() with non-existing id (999) returns null', async () => {
    const found = await repo.findById(999);
    expect(found).toBeNull();
  });
});
