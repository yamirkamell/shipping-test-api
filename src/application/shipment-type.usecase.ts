import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { IShipmentTypeUseCase } from '../domain/interfaces/IShipmentType.usecase';
import { ShipmentType } from '../domain/entities/shipment_type.entity';
import { IShipmentTypeRepository } from '../domain/repositories/IShipment-type.repo';

@injectable()
export class ShipmentTypeUseCase implements IShipmentTypeUseCase {
    private readonly _shipmentTypeRepo: IShipmentTypeRepository<ShipmentType>;

    constructor(
        @inject('IShipmentTypeRepository') shipmentTypeRepo: IShipmentTypeRepository<ShipmentType>
    ) {
        this._shipmentTypeRepo = shipmentTypeRepo;
    }

    async getAll() : Promise<ShipmentType[]> {
        const results = await this._shipmentTypeRepo.findAll();
        return results;
    }
}