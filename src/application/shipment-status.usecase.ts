import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { IShipmentStatusUseCase } from '../domain/interfaces/IShipmentStatus.usecase';
import { IShipmentStatusRepository } from '../domain/repositories/IShipment-status.repo';
import { ShipmentStatus } from '../domain/entities/shipment_status.entity';

@injectable()
export class ShipmentStatusUseCase implements IShipmentStatusUseCase {
    private readonly _shipmentStatusRepo: IShipmentStatusRepository<ShipmentStatus>;

    constructor(
        @inject('IShipmentStatusRepository') shipmentStatusRepo: IShipmentStatusRepository<ShipmentStatus>
    ) {
        this._shipmentStatusRepo = shipmentStatusRepo;
    }

    async getAll() : Promise<ShipmentStatus[]> {
        const results = await this._shipmentStatusRepo.findAll();
        return results;
    }
}