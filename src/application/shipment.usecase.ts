import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { IShipmentUseCase } from '../domain/interfaces/IShipment.usecase';
import { IShipmentRepository } from '../domain/repositories/IShipment.repo';
import { Shipment } from '../domain/entities/shipment.entity';

@injectable()
export class ShipmentUseCase implements IShipmentUseCase {
    private readonly _shipmentRepo: IShipmentRepository<Shipment>;

    constructor(
        @inject('IShipmentRepository') shipmentRepo: IShipmentRepository<Shipment>
    ) {
        this._shipmentRepo = shipmentRepo;
    }

    create(shipment: Shipment): Promise<Shipment | null> {
        return this._shipmentRepo.create(shipment);
    }

    async getAll() : Promise<Shipment[]> {
        const results = await this._shipmentRepo.findAll();
        return results;
    }
}