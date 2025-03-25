import { ShipmentStatus } from "../entities/shipment_status.entity";

export interface IShipmentStatusUseCase {
    getAll(): Promise<ShipmentStatus[]>;
}