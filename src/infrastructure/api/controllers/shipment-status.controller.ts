import 'reflect-metadata';
import { inject } from 'inversify';
import { type NextFunction, type Request, type Response } from 'express';
import { ResponseDto } from '../../../domain/dtos/response.dto';
import { IShipmentStatusUseCase } from '../../../domain/interfaces/IShipmentStatus.usecase';
import { ShipmentStatus } from '../../../domain/entities/shipment_status.entity';

export class ShipmentStatusController {
    private readonly _shipmentStatusUseCase : IShipmentStatusUseCase;
    constructor(@inject('IShipmentStatusUseCase') shipmentUseCase: IShipmentStatusUseCase) {
        this._shipmentStatusUseCase = shipmentUseCase;
    }

    async getAll(_req: Request, res: Response<ResponseDto<ShipmentStatus[]>>) {
        const shipments = await this._shipmentStatusUseCase.getAll();
        const response = { statusCode: 200, message: 'OK', data: shipments } as ResponseDto<ShipmentStatus[]>;    
        res.json(response);
    }
}