import { PayloadTokenDto } from "./payload-token.dto";

export class DecodedTokenDto {
    payload?: PayloadTokenDto;
    isValid: boolean;
}