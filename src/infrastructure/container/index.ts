// Container de Injeção de Dependência
// Centraliza a instanciação e configuração de todos os adapters e casos de uso

interface Container {
  // Adicionar dependências conforme features forem criadas
}

class DIContainer implements Container {
  private static instance: DIContainer;

  private constructor() {}

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }
}

export const container = DIContainer.getInstance();
