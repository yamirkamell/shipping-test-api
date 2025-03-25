import { DecodedTokenDto } from "../dtos/decoded-token.dto";
import { NewPasswordDto } from "../dtos/new-password.dto";

export interface IAuthService {
    generateToken(userId: number, email: string): string;
    validatePassword(password: string, hashPassword: string): Promise<boolean>;
    validateToken(token: string) : DecodedTokenDto;
    generatePassword(passwordString: string) : Promise<NewPasswordDto>;
}