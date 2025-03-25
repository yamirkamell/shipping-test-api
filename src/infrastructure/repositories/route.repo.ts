import 'reflect-metadata';
import mysql2 from "mysql2/promise";
import { inject, injectable } from "inversify";
import { Database } from "../database";
import { Route } from '../../domain/entities/route.entity';
import { IRouteRepository } from '../../domain/repositories/IRoute.repo';

@injectable()
export class RouteRepository implements IRouteRepository<Route> {
    private readonly _pool: mysql2.Pool;
    
    constructor(@inject(Database) database: Database) {
        this._pool = database.getPool();
    }

    find(id: string): Promise<Route> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Route[]> {
        try {
            const conn = await this._pool.getConnection();
            const [rows, fields] = await conn
            .query(`SELECT * FROM route`);
            let response : Route[] = [];
            if (Array.isArray(rows) && rows.length > 0) {
                const firstResult = rows[0] as Route;
                response = rows.map(x => x as Route);
            }
            return response;
            
        } catch (error) {
            console.log('exception trying save user');
            return [];
        }
    }

    findBy(criteria: Partial<Route>): Promise<Route[]> {
        throw new Error("Method not implemented.");
    }

    async create(item: Route): Promise<Route | null> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}