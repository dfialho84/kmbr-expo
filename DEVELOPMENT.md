# Guia de Desenvolvimento — KMBR Expo

Este documento descreve como desenvolver features seguindo a arquitetura hexagonal do projeto.

## Fluxo de uma Feature Nova

Siga este ciclo para cada feature:

### 1. Defina o domínio (Domain Layer)

Crie entidades e value objects em `src/domain/`:

```typescript
// src/domain/entities/user.ts
export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string
  ) {}
}

// src/domain/repositories/user-repository.ts
export interface IUserRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
```

### 2. Implemente o repositório (Adapter Layer)

Crie a implementação concreta em `src/adapters/repositories/`:

```typescript
// src/adapters/repositories/user-sqlite-repository.ts
import { getDatabase } from '@infrastructure/database';
import { IUserRepository } from '@domain/repositories/user-repository';
import { User } from '@domain/entities/user';

export class UserSQLiteRepository implements IUserRepository {
  async create(user: User): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      'INSERT INTO users (id, email, name) VALUES (?, ?, ?)',
      [user.id, user.email, user.name]
    );
  }

  // ... outros métodos
}
```

### 3. Registre no container (Infrastructure)

Adicione em `src/infrastructure/container/index.ts`:

```typescript
class DIContainer {
  // ... other methods
  
  getUserRepository(): IUserRepository {
    return new UserSQLiteRepository();
  }
}
```

### 4. Crie um hook customizado (UI Layer)

Em `src/ui/hooks/use-create-user.ts`:

```typescript
import { useCallback } from 'react';
import { container } from '@infrastructure/container';
import { User } from '@domain/entities/user';

export function useCreateUser() {
  const repository = container.getUserRepository();

  const create = useCallback(async (email: string, name: string) => {
    const user = new User(crypto.randomUUID(), email, name);
    await repository.create(user);
    return user;
  }, [repository]);

  return { create };
}
```

### 5. Use o hook no componente

```typescript
// src/ui/app/register.tsx
import { useCreateUser } from '@ui/hooks/use-create-user';
import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { create } = useCreateUser();

  const handleRegister = async () => {
    await create(email, name);
    // Navigate to next screen
  };

  return (
    <View className="flex-1 p-lg bg-white">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-neutral-300 p-md rounded mb-md"
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        className="border border-neutral-300 p-md rounded mb-md"
      />
      <TouchableOpacity
        onPress={handleRegister}
        className="bg-primary p-lg rounded"
      >
        <Text className="text-white font-bold text-center">Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Testes Unitários

Para cada caso de uso, crie testes com repositórios mockados:

```typescript
// src/domain/use-cases/__tests__/create-user.test.ts
import { CreateUserUseCase } from '../create-user';
import { IUserRepository } from '@domain/repositories/user-repository';

const mockRepository: IUserRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
};

describe('CreateUserUseCase', () => {
  it('should create a user', async () => {
    const useCase = new CreateUserUseCase(mockRepository);
    const user = await useCase.execute('user@example.com', 'John Doe');
    
    expect(mockRepository.create).toHaveBeenCalledWith(user);
    expect(user.email).toBe('user@example.com');
  });
});
```

Rode: `npm test` ou `npm run test:watch`

## Testes E2E

Para cada cenário de usuário, crie um teste em Gherkin:

```gherkin
# e2e/features/register-user.feature
Feature: User Registration
  Scenario: Register with valid data
    Given the app is open
    When I tap "Register"
    And I fill email "user@example.com"
    And I fill name "John Doe"
    And I tap "Submit"
    Then I see "Welcome, John"
```

Implemente os steps correspondentes em `e2e/step-definitions/`.

Rode: `npm run detox:build:ios && npm run detox:test:ios`

## Validação de Dados

Use Zod para validar dados de entrada:

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});

export type UserInput = z.infer<typeof UserSchema>;

// No repositório ou hook
export function validateUserInput(data: unknown): UserInput {
  return UserSchema.parse(data);
}
```

## Persistência

### SQLite (dados estruturados/relacionais)
Use para: usuários, transações, relações complexas

### AsyncStorage (preferências simples)
Use para: tema, idioma, última tela visitada

### SecureStore (dados sensíveis)
Use para: tokens de autenticação, senhas (se armazenadas localmente)

## Guia de Estilo

### TypeScript
- `strict: true` sempre
- Nunca use `any` — use `unknown` com narrowing
- Prefira `type` para modelos de domínio

### Componentes
- Use NativeWind (Tailwind) para estilos
- Sempre use `testID` em elementos testáveis
- Componentes puros (sem side effects)

### Nomes
- Entidades: `PascalCase` — `User`, `Transaction`
- Interfaces: prefixo `I` — `IUserRepository`
- Implementações: sufixo do mecanismo — `UserSQLiteRepository`
- Casos de uso: verbo infinitivo — `CreateUser`, `DeleteExpiredItems`
- Hooks: prefixo `use` — `useCreateUser`
- Arquivos: kebab-case — `user-sqlite-repository.ts`

## Verificação de Qualidade

Antes de commitar:

```bash
npm run type-check    # Verificar tipos TypeScript
npm run lint          # ESLint
npm run test          # Testes unitários
npm run format        # Prettier
```

## Recursos

- **Arquitetura:** Leia `CLAUDE.md` (instruções deste projeto)
- **PRD:** Procure em `docs/features/<slug>/prd.md`
- **Design System:** Veja `docs/design-system/`
- **Telas:** Referência em `docs/telas/`

## Próximos Passos

1. Crie um PRD para sua feature: `/create-prd <nome-da-feature>`
2. Implemente seguindo o fluxo: Domain → Adapter → Hook → Component
3. Escreva testes unitários para cada caso de uso
4. Crie testes E2E para fluxos críticos
5. Valide com `npm run type-check && npm run lint && npm test`
