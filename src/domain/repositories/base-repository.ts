export interface IRepository<T> {
  create(entity: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, entity: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
