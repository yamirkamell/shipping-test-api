import { BaseEntity } from "./base.entity";

export class Shipment extends BaseEntity {
    weight: number;
    height: number;
    width: number;
    shipment_type_id: number;
    shipment_type?: string;
    route_id?: number;
    driver_name?: string;
    status_id: number;
    status?: string;
    origin_city_id: number;
    origin_city?: string;
    destination_city_id: number;
    destination_city?: string;
    destination_address: string;
    customer_name: string;
};
