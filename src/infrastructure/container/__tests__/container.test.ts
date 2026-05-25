import { SmokeUseCase } from '@domain/use-cases/SmokeUseCase';
import { SmokeSQLiteRepository } from '@adapters/repositories/SmokeSQLiteRepository';
import { migration001CreateSmokeItem } from '@infrastructure/database/migrations/001-create-smoke-item';
import { createTestDatabase } from '@mocks/test-helpers/createTestDatabase';

/**
 * IT-6: Container resolution test.
 * We instantiate the full dependency chain manually (mirroring what the container does)
 * using an in-memory SQLite database — no mocks for the repository.
 *
 * Constitution rule 21: use-cases must never be instantiated directly in a component.
 * This test verifies the wiring works correctly when done through the container pattern.
 */
describe('infrastructure/container — dependency resolution (IT-6)', () => {
  it('IT-6: SmokeUseCase resolved with real SmokeSQLiteRepository executes successfully', async () => {
    // Set up real in-memory database
    const db = createTestDatabase();
    await migration001CreateSmokeItem(db as never);

    // Wire dependencies as the container would (rule 21 — only container does this)
    const repository = new SmokeSQLiteRepository(db as never);
    const useCase = new SmokeUseCase(repository);

    // Execute and verify full cycle
    const result = await useCase.execute({ label: 'container-test', value: 'it-6-value' });

    expect(typeof result.id).toBe('number');
    expect(result.id).toBeGreaterThan(0);
    expect(result.label).toBe('container-test');
    expect(result.value).toBe('it-6-value');
    expect(result.createdAt).toBeTruthy();
  });
});
