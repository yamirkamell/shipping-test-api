import 'reflect-metadata';
import mysql2 from "mysql2/promise";
import { inject, injectable } from "inversify";
import { Database } from "../database";
import { ShipmentType } from '../../domain/entities/shipment_type.entity';
import { IShipmentTypeRepository } from '../../domain/repositories/IShipment-type.repo';

@injectable()
export class ShipmentTypeRepository implements IShipmentTypeRepository<ShipmentType> {
    private readonly _pool: mysql2.Pool;
    
    constructor(@inject(Database) database: Database) {
        this._pool = database.getPool();
    }

    find(id: string): Promise<ShipmentType> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<ShipmentType[]> {
        try {
            const conn = await this._pool.getConnection();
            const [rows, fields] = await conn.query(`SELECT * FROM shipment_type`);
            let response : ShipmentType[] = [];
            if (Array.isArray(rows) && rows.length > 0) {
                response = rows.map(x => x as ShipmentType);
            }
            return response;
            
        } catch (error) {
            return [];
        }
    }

    findBy(criteria: Partial<ShipmentType>): Promise<ShipmentType[]> {
        throw new Error("Method not implemented.");
    }

    async create(item: ShipmentType): Promise<ShipmentType | null> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}