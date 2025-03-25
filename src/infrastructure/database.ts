import mysql from "mysql2/promise";
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class Database {
    private pool: mysql.Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: '',
            user: '',
            port: 0,
            password: '',
            database: ''
        });
    }

    getPool(): mysql.Pool {
        return this.pool;
    }
};
