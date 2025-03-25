import { Container } from 'inversify';
import { IUserUseCase } from './domain/interfaces/IUser.usecase';
import { UserUseCase } from './application/user.usecase';
import { IUserRepository } from './domain/repositories/IUser.repo';
import { UserRepository } from './infrastructure/repositories/user.repo';
import { User } from './domain/entities/user.entity';
import { UserController } from './infrastructure/api/controllers/user.controller';
import { Database } from './infrastructure/database';
import { AuthMiddleware } from './infrastructure/middlewares/auth.middleware';
import { AuthService } from './infrastructure/services/auth.service';
import { IAuthService } from './domain/interfaces/IAuth.service';
import { ShipmentUseCase } from './application/shipment.usecase';
import { IShipmentUseCase } from './domain/interfaces/IShipment.usecase';
import { IShipmentRepository } from './domain/repositories/IShipment.repo';
import { Shipment } from './domain/entities/shipment.entity';
import { ShipmentRepository } from './infrastructure/repositories/shipment.repo';
import { ShipmentController } from './infrastructure/api/controllers/shipment.controller';
import { IShipmentTypeUseCase } from './domain/interfaces/IShipmentType.usecase';
import { ShipmentTypeUseCase } from './application/shipment-type.usecase';
import { ShipmentStatusUseCase } from './application/shipment-status.usecase';
import { IShipmentStatusUseCase } from './domain/interfaces/IShipmentStatus.usecase';
import { RouteUseCase } from './application/route.usecase';
import { IRouteUseCase } from './domain/interfaces/IRoute.usecase';
import { RouteController } from './infrastructure/api/controllers/route.controller';
import { ShipmentStatusController } from './infrastructure/api/controllers/shipment-status.controller';
import { ShipmentTypeController } from './infrastructure/api/controllers/shipment-type.controller';
import { ShipmentTypeRepository } from './infrastructure/repositories/shipment-type.repo';
import { ShipmentStatusRepository } from './infrastructure/repositories/shipment-status.repo';
import { RouteRepository } from './infrastructure/repositories/route.repo';
import { IShipmentTypeRepository } from './domain/repositories/IShipment-type.repo';
import { IShipmentStatusRepository } from './domain/repositories/IShipment-status.repo';
import { IRouteRepository } from './domain/repositories/IRoute.repo';
import { ShipmentType } from './domain/entities/shipment_type.entity';
import { ShipmentStatus } from './domain/entities/shipment_status.entity';
import { Route } from './domain/entities/route.entity';

const container = new Container();
// use cases
container.bind<IUserUseCase>('IUserUseCase').to(UserUseCase);
container.bind<IShipmentUseCase>('IShipmentUseCase').to(ShipmentUseCase);
container.bind<IShipmentTypeUseCase>('IShipmentTypeUseCase').to(ShipmentTypeUseCase);
container.bind<IShipmentStatusUseCase>('IShipmentStatusUseCase').to(ShipmentStatusUseCase);
container.bind<IRouteUseCase>('IRouteUseCase').to(RouteUseCase);

// infrastructure services
container.bind(Database).toSelf();
container.bind(AuthMiddleware).toSelf();
container.bind<IAuthService>('IAuthService').to(AuthService);

// repositories
container.bind<IUserRepository<User>>('IUserRepository').to(UserRepository);
container.bind<IShipmentRepository<Shipment>>('IShipmentRepository').to(ShipmentRepository);
container.bind<IShipmentTypeRepository<ShipmentType>>('IShipmentTypeRepository').to(ShipmentTypeRepository);
container.bind<IShipmentStatusRepository<ShipmentStatus>>('IShipmentStatusRepository').to(ShipmentStatusRepository);
container.bind<IRouteRepository<Route>>('IRouteRepository').to(RouteRepository);

// controllers
container.bind(UserController).toSelf();
container.bind(ShipmentController).toSelf();
container.bind(ShipmentTypeController).toSelf();
container.bind(ShipmentStatusController).toSelf();
container.bind(RouteController).toSelf();

export default container;