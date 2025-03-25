import { BaseEntity } from "./base.entity";

export class User extends BaseEntity {
    name: string;
    lastname: string;
    email: string;
    passwd: string;
    salt: string;
};
