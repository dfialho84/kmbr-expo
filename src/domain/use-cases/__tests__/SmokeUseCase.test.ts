import { SmokeUseCase } from '../SmokeUseCase';
import { createMockSmokePersistenceRepository, mockSmokeItem } from '@mocks/ISmokePersistenceRepository';

describe('SmokeUseCase', () => {
  // UT-1: caminho feliz
  it('UT-1: execute() with valid input returns SmokeResultDto with correct fields', async () => {
    const repo = createMockSmokePersistenceRepository();
    repo.save.mockResolvedValue(mockSmokeItem);
    repo.findById.mockResolvedValue(mockSmokeItem);

    const useCase = new SmokeUseCase(repo);
    const result = await useCase.execute({ label: 'test', value: 'val' });

    expect(result.id).toBe(mockSmokeItem.id);
    expect(result.label).toBe(mockSmokeItem.label);
    expect(result.value).toBe(mockSmokeItem.value);
    expect(result.createdAt).toBe(mockSmokeItem.createdAt);
  });

  // UT-2: validação Zod — label vazio
  it('UT-2: execute() with empty label throws DomainError SMOKE_VALIDATION_FAILED with field=label', async () => {
    const repo = createMockSmokePersistenceRepository();
    const useCase = new SmokeUseCase(repo);

    await expect(useCase.execute({ label: '', value: 'val' })).rejects.toMatchObject({
      code: 'SMOKE_VALIDATION_FAILED',
      context: expect.objectContaining({ field: 'label' }),
    });
    expect(repo.save).not.toHaveBeenCalled();
  });

  // UT-3: validação Zod — value vazio
  it('UT-3: execute() with empty value throws DomainError SMOKE_VALIDATION_FAILED with field=value', async () => {
    const repo = createMockSmokePersistenceRepository();
    const useCase = new SmokeUseCase(repo);

    await expect(useCase.execute({ label: 'ok', value: '' })).rejects.toMatchObject({
      code: 'SMOKE_VALIDATION_FAILED',
      context: expect.objectContaining({ field: 'value' }),
    });
    expect(repo.save).not.toHaveBeenCalled();
  });

  // UT-4: validação Zod — label excede max(100)
  it('UT-4: execute() with label of 101 chars throws DomainError SMOKE_VALIDATION_FAILED', async () => {
    const repo = createMockSmokePersistenceRepository();
    const useCase = new SmokeUseCase(repo);
    const longLabel = 'a'.repeat(101);

    await expect(useCase.execute({ label: longLabel, value: 'val' })).rejects.toMatchObject({
      code: 'SMOKE_VALIDATION_FAILED',
    });
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('UT-4 inverse: execute() with label of exactly 100 chars succeeds', async () => {
    const repo = createMockSmokePersistenceRepository();
    const item = { ...mockSmokeItem, label: 'a'.repeat(100) };
    repo.save.mockResolvedValue(item);
    repo.findById.mockResolvedValue(item);

    const useCase = new SmokeUseCase(repo);
    await expect(useCase.execute({ label: 'a'.repeat(100), value: 'val' })).resolves.toBeDefined();
  });

  // UT-5: falha no save()
  it('UT-5: execute() rethrows save() failure as DomainError SMOKE_SAVE_FAILED with context.cause', async () => {
    const repo = createMockSmokePersistenceRepository();
    repo.save.mockRejectedValue(new Error('db write failed'));

    const useCase = new SmokeUseCase(repo);

    await expect(useCase.execute({ label: 'test', value: 'val' })).rejects.toMatchObject({
      code: 'SMOKE_SAVE_FAILED',
      context: expect.objectContaining({ cause: 'db write failed' }),
    });
  });

  // UT-6: falha no findById()
  it('UT-6: execute() rethrows findById() failure as DomainError SMOKE_READ_FAILED with context.id and context.cause', async () => {
    const repo = createMockSmokePersistenceRepository();
    repo.save.mockResolvedValue(mockSmokeItem);
    repo.findById.mockRejectedValue(new Error('db read failed'));

    const useCase = new SmokeUseCase(repo);

    await expect(useCase.execute({ label: 'test', value: 'val' })).rejects.toMatchObject({
      code: 'SMOKE_READ_FAILED',
      context: expect.objectContaining({
        id: mockSmokeItem.id,
        cause: 'db read failed',
      }),
    });
  });

  // UT-7: findById() retorna null
  // Comportamento: quando findById retorna null após save bem-sucedido,
  // o use-case lança DomainError SMOKE_READ_FAILED (item não encontrado após save).
  it('UT-7: execute() throws DomainError SMOKE_READ_FAILED when findById returns null after save', async () => {
    const repo = createMockSmokePersistenceRepository();
    repo.save.mockResolvedValue(mockSmokeItem);
    repo.findById.mockResolvedValue(null);

    const useCase = new SmokeUseCase(repo);

    await expect(useCase.execute({ label: 'test', value: 'val' })).rejects.toMatchObject({
      code: 'SMOKE_READ_FAILED',
      context: expect.objectContaining({ id: mockSmokeItem.id }),
    });
  });
});
