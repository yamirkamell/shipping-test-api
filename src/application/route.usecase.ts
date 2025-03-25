import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Route } from '../domain/entities/route.entity';
import { IRouteRepository } from '../domain/repositories/IRoute.repo';
import { IRouteUseCase } from '../domain/interfaces/IRoute.usecase';

@injectable()
export class RouteUseCase implements IRouteUseCase {
    private readonly _routeRepo: IRouteRepository<Route>;

    constructor(
        @inject('IRouteRepository') routeRepo: IRouteRepository<Route>
    ) {
        this._routeRepo = routeRepo;
    }

    async getAll() : Promise<Route[]> {
        const results = await this._routeRepo.findAll();
        return results;
    }
}