# constitution.md

## Purpose

Esta constituição define as regras técnicas não-negociáveis para a implementação de features neste projeto React Native + Expo com arquitetura hexagonal. Toda implementação deve declarar conformidade explícita com estas regras; violações bloqueiam merge até correção.

---

## Must Do

1. All imports in `domain/` must never reference `adapters/`, `infrastructure/`, `ui/` or any external library except `zod` for validation.

2. All use-cases in `domain/use-cases/` must receive dependencies exclusively through constructor injection of port interfaces (I-prefixed).

3. All external inputs (SQLite, AsyncStorage, form data, route params) must be validated with Zod schemas before entering the domain layer.

4. All errors from use-cases must be thrown as domain-specific error types (not generic strings) and must include a code, message, and context.

5. All repositories must implement their corresponding interface defined in `domain/repositories/` — no implementations in domain.

6. All UI state mutations in `ui/stores/` must only call use-case hooks or dispatch actions — never access `adapters/` or `infrastructure/` directly.

7. All components must import storage (AsyncStorage, SQLite, SecureStore) only through custom hooks in `ui/hooks/` — direct imports are forbidden.

8. All database operations must be performed through repository abstractions in `adapters/repositories/` — never called directly from components or stores.

---

## Ask Before Proceeding

9. If a new external library (network, cloud, backend SDK) is proposed, stop and ask for explicit approval — the "no data leaves the device" rule must be confirmed in writing.

10. If a use-case requires data from a storage mechanism (SQLite, AsyncStorage, SecureStore) that is not yet modeled in `domain/repositories/`, stop and define the port interface first.

11. If a component or store needs to call a use-case that does not exist in `domain/use-cases/`, stop and define the use-case contract with inputs/outputs before implementation.

12. If a violation of this constitution is discovered in code review, stop the merge and do not proceed until the code is refactored to comply.

13. If the domain entity or value object structure would require changes to an existing port interface, stop and discuss the impact with the team — breaking changes to ports block implementation.

---

## Never Do

14. Never import from `adapters/`, `infrastructure/`, or `ui/` into the `domain/` layer.

15. Never call AsyncStorage, SQLite, or SecureStore directly from a component, store, or use-case — always go through a repository/adapter.

16. Never implement business logic in a React component or Zustand store — all logic belongs in use-cases and entities in the domain.

17. Never couple a domain entity or use-case to a specific framework, library, or transport layer (e.g., never import Expo, React, or NativeWind in domain code).

18. Never silence or swallow errors from a use-case without explicit logging and re-throwing or handling with clear context.

19. Never use `any` type in TypeScript — use `unknown` and explicitly narrow the type.

20. Never pass raw data structures directly between adapters and UI — always use DTOs defined in `application/dtos/`.

21. Never instantiate a use-case directly in a component — always use the container in `infrastructure/container/` or a custom hook in `ui/hooks/`.

---

## Enforcement

22. Every implementation plan (PR, feature branch, or specification) must include a "Constitution Compliance" section explicitly listing which rules are addressed and how.

23. Any code that violates this constitution is invalid and must be refactored before merge — no exceptions, no workarounds.

24. Code review must include a constitution compliance check before approving; if any rule is violated, block the merge and require correction.

25. If ambiguity about requirements exists (unclear storage mechanism, ambiguous use-case behavior, missing type), implementation is blocked until clarification is documented.

