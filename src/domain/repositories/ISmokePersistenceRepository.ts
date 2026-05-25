import type { SmokeItem } from '@domain/entities/SmokeItem';
import type { SmokeItemDto } from '@application/dtos/SmokeItemDto';

export interface ISmokePersistenceRepository {
  save(dto: SmokeItemDto): Promise<SmokeItem>;
  findById(id: number): Promise<SmokeItem | null>;
}
