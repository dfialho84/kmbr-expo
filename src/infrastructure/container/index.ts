// Container de Injeção de Dependência
// Centraliza a instanciação e configuração de todos os adapters e casos de uso
// Este é o único ponto onde dependências concretas são montadas.

import { SmokeSQLiteRepository } from '@adapters/repositories/SmokeSQLiteRepository';
import { getDatabase } from '@infrastructure/database';
import { SmokeUseCase } from '@domain/use-cases/SmokeUseCase';

let smokeUseCase: SmokeUseCase | null = null;

export async function getSmokeUseCase(): Promise<SmokeUseCase> {
  if (!smokeUseCase) {
    const db = await getDatabase();
    const repository = new SmokeSQLiteRepository(db);
    smokeUseCase = new SmokeUseCase(repository);
  }
  return smokeUseCase;
}

/** Reset para uso em testes */
export function resetContainer(): void {
  smokeUseCase = null;
}
