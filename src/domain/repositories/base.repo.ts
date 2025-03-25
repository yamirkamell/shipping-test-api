export interface IBaseRepository<T> {  
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    findBy(criteria: Partial<T>): Promise<T[]>;
    create(item: T): Promise<T | null>;
    delete(id: string): Promise<void>;
}