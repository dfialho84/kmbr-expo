import type { SmokeItem } from '@domain/entities/SmokeItem';
import type { ISmokePersistenceRepository } from '@domain/repositories/ISmokePersistenceRepository';

export function createMockSmokePersistenceRepository(): jest.Mocked<ISmokePersistenceRepository> {
  return {
    save: jest.fn(),
    findById: jest.fn(),
  };
}

export const mockSmokeItem: SmokeItem = {
  id: 1,
  label: 'test-label',
  value: 'test-value',
  createdAt: new Date().toISOString(),
};
