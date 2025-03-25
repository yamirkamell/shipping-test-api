import mysql2, { OkPacket } from "mysql2/promise";
import { inject, injectable } from "inversify";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/IUser.repo";
import { Database } from "../database";
import 'reflect-metadata';

@injectable()
export class UserRepository implements IUserRepository<User> {
    private readonly _pool: mysql2.Pool;
    
    constructor(@inject(Database) database: Database) {
        this._pool = database.getPool();
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const conn = await this._pool.getConnection();
        const [rows, fields] = await conn
            .query('SELECT * FROM user u WHERE u.email = ?', [email]);
        if (Array.isArray(rows) && rows.length > 0) {
            const firstResult = rows[0] as User;
            return firstResult;
        }
        return null;
    }

    find(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    findBy(criteria: Partial<User>): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async create(item: User): Promise<User | null> {
        const { name, lastname, email, passwd, salt } = item;
        const conn = await this._pool.getConnection();
        try {
            const [result] = await conn
            .execute('INSERT INTO user (name, lastname, email, passwd, salt) values(?,?,?,?,?)', 
                [name, lastname, email, passwd, salt]
            );
            if ('insertId' in result) {
                item.id = result.insertId;
                return item;
              } else {
                console.warn('Insert result does not contain insertId.');
                return null;
              }
        } catch (error) {
            console.log('exception trying save user');
            return null;
        }
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}