import { IBaseRepository } from "./base.repo";

export interface IUserRepository<User> extends IBaseRepository<User> {
    findByEmail(username: string): Promise<User | null>;
}