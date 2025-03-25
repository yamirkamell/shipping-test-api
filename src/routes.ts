import { Router } from 'express';  
import userRoutes from './infrastructure/api/routes/user.routes';
import shipmentRoutes from './infrastructure/api/routes/shipment.routes';
import shipmentStatusRoutes from './infrastructure/api/routes/shipment-status.routes';
import shipmentTypeRoutes from './infrastructure/api/routes/shipment-type.routes';
import routeRoutes from './infrastructure/api/routes/route.routes';

const router: Router = Router();
router.use('/users', userRoutes);
router.use('/shipments', shipmentRoutes);
router.use('/shipment-types', shipmentTypeRoutes);
router.use('/shipment-statuses', shipmentStatusRoutes);
router.use('/routes', routeRoutes);

export default router;
