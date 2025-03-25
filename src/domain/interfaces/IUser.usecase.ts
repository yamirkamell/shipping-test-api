import { UserDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";

export interface IUserUseCase {
    authentication(username: string, password: string): Promise<string>;
    create(user: UserDto) : Promise<User | null>;
}