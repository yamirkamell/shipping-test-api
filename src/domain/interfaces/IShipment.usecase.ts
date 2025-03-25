import { UserDto } from "../dtos/user.dto";
import { Shipment } from "../entities/shipment.entity";

export interface IShipmentUseCase {
    getAll(): Promise<Shipment[]>;
    create(shipment: Shipment) : Promise<Shipment | null>;
}