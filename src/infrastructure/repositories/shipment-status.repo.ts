import 'reflect-metadata';
import mysql2 from "mysql2/promise";
import { inject, injectable } from "inversify";
import { Database } from "../database";
import { ShipmentStatus } from '../../domain/entities/shipment_status.entity';
import { IShipmentStatusRepository } from '../../domain/repositories/IShipment-status.repo';

@injectable()
export class ShipmentStatusRepository implements IShipmentStatusRepository<ShipmentStatus> {
    private readonly _pool: mysql2.Pool;
    
    constructor(@inject(Database) database: Database) {
        this._pool = database.getPool();
    }

    find(id: string): Promise<ShipmentStatus> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<ShipmentStatus[]> {
        try {
            const conn = await this._pool.getConnection();
            const [rows, fields] = await conn.query(`SELECT * FROM shipment_status`);
            let response : ShipmentStatus[] = [];
            if (Array.isArray(rows) && rows.length > 0) {
                const firstResult = rows[0] as ShipmentStatus;
                response = rows.map(x => x as ShipmentStatus);
            }
            return response;
            
        } catch (error) {
            return [];
        }
    }

    findBy(criteria: Partial<ShipmentStatus>): Promise<ShipmentStatus[]> {
        throw new Error("Method not implemented.");
    }

    async create(item: ShipmentStatus): Promise<ShipmentStatus | null> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}