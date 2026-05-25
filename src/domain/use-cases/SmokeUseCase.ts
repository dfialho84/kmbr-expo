import { parseSmokeItemDto, type SmokeItemDto } from '@application/dtos/SmokeItemDto';
import type { SmokeResultDto } from '@application/dtos/SmokeResultDto';
import { DomainError } from '@domain/errors/DomainError';
import type { ISmokePersistenceRepository } from '@domain/repositories/ISmokePersistenceRepository';

export class SmokeUseCase {
  constructor(private readonly repository: ISmokePersistenceRepository) {}

  async execute(dto: SmokeItemDto): Promise<SmokeResultDto> {
    // Validates input — throws DomainError SMOKE_VALIDATION_FAILED if invalid
    const validDto = parseSmokeItemDto(dto);

    // Save to repository — rethrows as DomainError SMOKE_SAVE_FAILED on failure
    let savedItem;
    try {
      savedItem = await this.repository.save(validDto);
    } catch (cause) {
      throw new DomainError('SMOKE_SAVE_FAILED', 'Failed to save smoke item', {
        cause: cause instanceof Error ? cause.message : String(cause),
      });
    }

    // Read back from repository — rethrows as DomainError SMOKE_READ_FAILED on failure
    let foundItem;
    try {
      foundItem = await this.repository.findById(savedItem.id);
    } catch (cause) {
      throw new DomainError('SMOKE_READ_FAILED', 'Failed to read smoke item after save', {
        id: savedItem.id,
        cause: cause instanceof Error ? cause.message : String(cause),
      });
    }

    // Treat null as a read failure — item was saved but cannot be retrieved
    if (foundItem === null) {
      throw new DomainError('SMOKE_READ_FAILED', 'Smoke item not found after save', {
        id: savedItem.id,
        cause: 'findById returned null',
      });
    }

    return {
      id: foundItem.id,
      label: foundItem.label,
      value: foundItem.value,
      createdAt: foundItem.createdAt,
    };
  }
}
