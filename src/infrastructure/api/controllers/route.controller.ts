import 'reflect-metadata';
import { inject } from 'inversify';
import { type NextFunction, type Request, type Response } from 'express';
import { ResponseDto } from '../../../domain/dtos/response.dto';
import { IRouteUseCase } from '../../../domain/interfaces/IRoute.usecase';
import { Route } from '../../../domain/entities/route.entity';

export class RouteController {
    private readonly _routeUseCase : IRouteUseCase;
    constructor(@inject('IRouteUseCase') routeUseCase: IRouteUseCase) {
        this._routeUseCase = routeUseCase;
    }

    async getAll(_req: Request, res: Response<ResponseDto<Route[]>>) {
        const routes = await this._routeUseCase.getAll();
        const response = { statusCode: 200, message: 'OK', data: routes } as ResponseDto<Route[]>;    
        res.json(response);
    }
}