import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { IUserUseCase } from '../domain/interfaces/IUser.usecase';
import { IUserRepository } from '../domain/repositories/IUser.repo';
import { User } from '../domain/entities/user.entity';
import { IAuthService } from '../domain/interfaces/IAuth.service';
import { UserDto } from '../domain/dtos/user.dto';

@injectable()
export class UserUseCase implements IUserUseCase {
    private readonly _userRepo: IUserRepository<User>;
    private readonly _authService: IAuthService;

    constructor(
        @inject('IUserRepository') userRepo: IUserRepository<User>,
        @inject('IAuthService') authService: IAuthService,
    ) {
        this._userRepo = userRepo;
        this._authService = authService;
    }

    async create(user: UserDto) : Promise<User | null> {
        const passwordString = user.password ?? '';
        const credentials = await this._authService.generatePassword(passwordString);

        const newUser = {
            ...user,
            passwd: credentials.hash,
            salt: credentials.salt
        } as User;

        const results = await this._userRepo.create(newUser);
        return results;
    }

    async authentication(username: string, password: string): Promise<string> {
        const res = await this._userRepo.findByEmail(username);
        if (res == null) {
            return '';
        }
        const isValid = await this._authService.validatePassword(password, res.passwd);
        if (!isValid) {
            return '';
        }
        const token = await this._authService.generateToken(res.id, res.email);
        return token;
    }
}