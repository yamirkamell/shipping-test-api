import { Route } from "../entities/route.entity";

export interface IRouteUseCase {
    getAll(): Promise<Route[]>;
}