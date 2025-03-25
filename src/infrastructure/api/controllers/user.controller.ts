import 'reflect-metadata';
import { inject } from 'inversify';
import { type NextFunction, type Request, type Response } from 'express';
import { IUserUseCase } from '../../../domain/interfaces/IUser.usecase';
import { User } from '../../../domain/entities/user.entity';
import { ResponseDto } from '../../../domain/dtos/response.dto';

export class UserController {
    private readonly _userUseCase : IUserUseCase;
    constructor(@inject('IUserUseCase') userUseCase: IUserUseCase) {
        this._userUseCase = userUseCase;
    }

    async authenticateUser(_req: Request, res: Response<ResponseDto<string>>) {
        const { username, password } = _req.body;
        const token = await this._userUseCase.authentication(username, password);
        const response = { statusCode: 200, message: 'OK', data: token } as ResponseDto<string>;
        
        if (token == '') {
            response.message = "unauthorized";
            response.statusCode = 401;
            res.status(401).send(response);
            return;
        }
        
        res.json(response);
    }

    async create(req: Request, res: Response<ResponseDto<User>>) {
        const data = req.body;
        const newUser = await this._userUseCase.create(data);
        const response = { statusCode: 200, message: 'OK', data: newUser } as ResponseDto<User>;
        res.json(response);
    }
}