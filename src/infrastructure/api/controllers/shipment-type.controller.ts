import 'reflect-metadata';
import { inject } from 'inversify';
import { type NextFunction, type Request, type Response } from 'express';
import { ResponseDto } from '../../../domain/dtos/response.dto';
import { IShipmentTypeUseCase } from '../../../domain/interfaces/IShipmentType.usecase';
import { ShipmentType } from '../../../domain/entities/shipment_type.entity';

export class ShipmentTypeController {
    private readonly _shipmentTypeUseCase : IShipmentTypeUseCase;
    constructor(@inject('IShipmentTypeUseCase') shipmentTypeUseCase: IShipmentTypeUseCase) {
        this._shipmentTypeUseCase = shipmentTypeUseCase;
    }

    async getAll(_req: Request, res: Response<ResponseDto<ShipmentType[]>>) {
        const shipmentTypes = await this._shipmentTypeUseCase.getAll();
        const response = { statusCode: 200, message: 'OK', data: shipmentTypes } as ResponseDto<ShipmentType[]>;    
        res.json(response);
    }
}