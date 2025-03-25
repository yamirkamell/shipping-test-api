import { BaseEntity } from "./base.entity";

export class Route extends BaseEntity {
    driver_name: number;
    origin_city_id: number;
    origin_city?: string;
    destination_city_id: number;
    destination_city?: string;
};
