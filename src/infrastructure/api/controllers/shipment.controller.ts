import 'reflect-metadata';
import { inject } from 'inversify';
import { type NextFunction, type Request, type Response } from 'express';
import { IUserUseCase } from '../../../domain/interfaces/IUser.usecase';
import { User } from '../../../domain/entities/user.entity';
import { ResponseDto } from '../../../domain/dtos/response.dto';
import { IShipmentUseCase } from '../../../domain/interfaces/IShipment.usecase';
import { Shipment } from '../../../domain/entities/shipment.entity';

export class ShipmentController {
    private readonly _shipmentUseCase : IShipmentUseCase;
    constructor(@inject('IShipmentUseCase') shipmentUseCase: IShipmentUseCase) {
        this._shipmentUseCase = shipmentUseCase;
    }

    async getAll(_req: Request, res: Response<ResponseDto<Shipment[]>>) {
        const shipments = await this._shipmentUseCase.getAll();
        const response = { statusCode: 200, message: 'OK', data: shipments } as ResponseDto<Shipment[]>;    
        res.json(response);
    }

    async create(req: Request, res: Response<ResponseDto<Shipment>>) {
        const data = req.body;
        const newUser = await this._shipmentUseCase.create(data);
        const response = { statusCode: 200, message: 'OK', data: newUser } as ResponseDto<Shipment>;
        res.json(response);
    }
}