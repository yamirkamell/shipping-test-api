import { ShipmentType } from "../entities/shipment_type.entity";

export interface IShipmentTypeUseCase {
    getAll(): Promise<ShipmentType[]>;
}