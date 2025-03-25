import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import jwt from 'jsonwebtoken';
import { IAuthService } from '../../domain/interfaces/IAuth.service';
import { PayloadTokenDto } from '../../domain/dtos/payload-token.dto';
import * as dotenv from 'dotenv';
dotenv.config();

export class AuthMiddleware {
    private readonly _authService: IAuthService;

    constructor(
        @inject('IAuthService') authService: IAuthService
    ) {
        this._authService = authService;
    }

    async verifyToken(req: any, res: any, next: any) {
        const token = req.header('Authorization')?.replace('Bearer ', '');
      
        if (!token) {
          return res.status(401).json({ message: 'No token, authorization denied' });
        }
        
        try {
            const jwtSecret = process.env.JWT_SECRET ?? '';
            const decoded = await jwt.verify(token, jwtSecret) as PayloadTokenDto;
            req.userId = decoded.userId;
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: 'Token is not valid' });
        }
        next();
    }
}