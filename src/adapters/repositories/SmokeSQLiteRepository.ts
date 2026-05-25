import type * as SQLite from 'expo-sqlite';
import type { SmokeItem } from '@domain/entities/SmokeItem';
import type { SmokeItemDto } from '@application/dtos/SmokeItemDto';
import type { ISmokePersistenceRepository } from '@domain/repositories/ISmokePersistenceRepository';

export class SmokeSQLiteRepository implements ISmokePersistenceRepository {
  constructor(private readonly db: SQLite.SQLiteDatabase) {}

  async save(dto: SmokeItemDto): Promise<SmokeItem> {
    const createdAt = new Date().toISOString();
    const result = await this.db.runAsync(
      'INSERT INTO SmokeItem (label, value, createdAt) VALUES (?, ?, ?)',
      [dto.label, dto.value, createdAt]
    );
    return {
      id: result.lastInsertRowId,
      label: dto.label,
      value: dto.value,
      createdAt,
    };
  }

  async findById(id: number): Promise<SmokeItem | null> {
    const row = await this.db.getFirstAsync<{
      id: number;
      label: string;
      value: string;
      createdAt: string;
    }>('SELECT id, label, value, createdAt FROM SmokeItem WHERE id = ?', [id]);

    if (!row) return null;

    return {
      id: row.id,
      label: row.label,
      value: row.value,
      createdAt: row.createdAt,
    };
  }
}
