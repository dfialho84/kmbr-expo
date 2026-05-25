# Requisitos Não Funcionais — Setup do Projeto

## Confiabilidade

**NFR-1**: O sistema deve permitir que a instalação de dependências (npm install) complete com sucesso (exit code 0), garantindo que todas as dependências requeridas estejam disponíveis.

> Fonte: PRD Objetivo 1, Critério de Sucesso "npm install executa sem erros críticos" / REQ-1

**NFR-2**: O sistema deve iniciar no simulador sem gerar exceções não capturadas que causem crash durante os primeiros 5 segundos após launch.

> Fonte: PRD Objetivo 7, Critério de Sucesso "Simulador iOS/Android inicia sem crash" / REQ-2

## Manutenibilidade

**NFR-3**: O sistema deve passar na verificação de tipos estática (npx tsc --noEmit) sem gerar erros de tipo.

> Fonte: PRD Critério de Sucesso "npx tsc --noEmit sem erros de tipo" / REQ-8

**NFR-4**: O arquivo README.md deve documentar no mínimo 4 procedimentos: instalação de dependências, execução em desenvolvimento, testes unitários e testes E2E, com exemplos de comandos para cada um.

> Fonte: PRD Objetivo 8, Critério de Sucesso "README.md inclui instruções de install, dev, test, e2e" / REQ-9

## Observabilidade

**NFR-5**: O comando npm test deve executar sem erros críticos, apresentando pelo menos 1 teste com resultado verificável (passed ou failed).

> Fonte: PRD Objetivo 5, Critério de Sucesso "npm test passa em pelo menos 1 teste de exemplo" / REQ-4, REQ-5
