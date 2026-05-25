import { getSmokeUseCase } from '@infrastructure/container';
import type { SmokeItemDto } from '@application/dtos/SmokeItemDto';
import { useSmokeStore } from '@ui/stores/useSmokeStore';
import { DomainError } from '@domain/errors/DomainError';

export function useSmokeTest() {
  const { setLoading, setSuccess, setError } = useSmokeStore();

  async function runSmoke(dto: SmokeItemDto): Promise<void> {
    setLoading();
    try {
      const useCase = await getSmokeUseCase();
      const result = await useCase.execute(dto);
      setSuccess(result);
    } catch (error) {
      const message =
        error instanceof DomainError
          ? `[${error.code}] ${error.message}`
          : error instanceof Error
            ? error.message
            : 'Unknown error';
      setError(message);
    }
  }

  return { runSmoke };
}
