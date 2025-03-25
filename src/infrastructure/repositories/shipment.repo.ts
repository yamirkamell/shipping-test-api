import 'reflect-metadata';
import mysql2 from "mysql2/promise";
import { inject, injectable } from "inversify";
import { Database } from "../database";
import { Shipment } from "../../domain/entities/shipment.entity";
import { IShipmentRepository } from "../../domain/repositories/IShipment.repo";

@injectable()
export class ShipmentRepository implements IShipmentRepository<Shipment> {
    private readonly _pool: mysql2.Pool;
    
    constructor(@inject(Database) database: Database) {
        this._pool = database.getPool();
    }

    find(id: string): Promise<Shipment> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Shipment[]> {
        try {
            const conn = await this._pool.getConnection();
            const [rows, fields] = await conn
            .query(`SELECT s.*
                    , st.name as shipment_type
                    , ss.name as status
                    , co.name as origin_city
                    , cd.name as destination_city
                from shipment s
                inner join shipment_type st on s.shipment_type_id = st.id
                inner join shipment_status ss on s.status_id = ss.id
                inner join city co on co.id = s.origin_city_id
                inner join city cd on cd.id = s.destination_city_id`
            );
            let response : Shipment[] = [];
            if (Array.isArray(rows) && rows.length > 0) {
                const firstResult = rows[0] as Shipment;
                response = rows.map(x => x as Shipment);
            }
            return response;
            
        } catch (error) {
            console.log('exception trying save user');
            return [];
        }
    }

    findBy(criteria: Partial<Shipment>): Promise<Shipment[]> {
        throw new Error("Method not implemented.");
    }

    async create(item: Shipment): Promise<Shipment | null> {
        const {
            weight,
            height,
            width,
            shipment_type_id,
            status_id,
            origin_city_id,
            customer_name,
            destination_city_id,
            destination_address
        } = item;
        const conn = await this._pool.getConnection();
        try {
            const [result] = await conn
            .execute(`insert into shipment (
                        weight,
                        height,
                        width,
                        shipment_type_id,
                        status_id,
                        origin_city_id,
                        customer_name,
                        destination_city_id,
                        destination_address
                    ) VALUES (?,?,?,?,?,?,?,?,?)`, 
                [
                    weight,
                    height,
                    width,
                    shipment_type_id,
                    status_id,
                    origin_city_id,
                    customer_name,
                    destination_city_id,
                    destination_address
                ]
            );
            if ('insertId' in result) {
                item.id = result.insertId;
                return item;
              } else {
                console.warn('Insert result does not contain insertId.');
                return null;
              }
        } catch (error) {
            console.log('exception trying save shipment');
            return null;
        }
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}