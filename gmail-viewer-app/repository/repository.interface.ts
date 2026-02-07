export interface IRepository<T> {
  findAll(options?: { limit?: number; offset?: number }): Promise<T[]>;
  findById(id: string | number): Promise<T | null>;
  create(item: T): Promise<T>;
  update(id: string | number, item: Partial<T>): Promise<boolean>;
  delete(id: string | number): Promise<boolean>;
}