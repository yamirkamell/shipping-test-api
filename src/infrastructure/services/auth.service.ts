import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IAuthService } from '../../domain/interfaces/IAuth.service';
import { PayloadTokenDto } from '../../domain/dtos/payload-token.dto';
import { DecodedTokenDto } from '../../domain/dtos/decoded-token.dto';
import { NewPasswordDto } from '../../domain/dtos/new-password.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@injectable()
export class AuthService implements IAuthService {
    private readonly jwtSecret: string;
    
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET ?? '';
    }

    generateToken(userId: number, email: string): string {
        const payload = { userId, email } as PayloadTokenDto;
        const token = jwt.sign(
            payload,
            this.jwtSecret,
            { expiresIn: '1h' }
        );
        return token;
    }

    validateToken(token: string) : DecodedTokenDto {
        const result : DecodedTokenDto = {
            isValid: false,
        };
        
        try {
            result.payload = jwt.verify(token, this.jwtSecret) as PayloadTokenDto;
        } catch (error) {
            console.log('invalid token');
            console.log(error);
        }
        return result;
    }

    async validatePassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }

    async generatePassword(passwordString: string) : Promise<NewPasswordDto> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(passwordString, salt);
        return { salt, hash } as NewPasswordDto;
    }
}