import { z } from 'zod';
import { DomainError } from '@domain/errors/DomainError';

export type SmokeItemDto = {
  label: string;
  value: string;
};

export const smokeItemDtoSchema = z.object({
  label: z.string().min(1, 'label is required').max(100, 'label must be at most 100 characters'),
  value: z.string().min(1, 'value is required'),
});

export function parseSmokeItemDto(data: unknown): SmokeItemDto {
  const result = smokeItemDtoSchema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.errors[0];
    throw new DomainError(
      'SMOKE_VALIDATION_FAILED',
      firstError?.message ?? 'Validation failed',
      { field: firstError?.path[0] ?? 'unknown', issues: result.error.errors }
    );
  }
  return result.data;
}
