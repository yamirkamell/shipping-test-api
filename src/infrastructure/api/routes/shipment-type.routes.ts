import { Router } from 'express';
import container from '../../../container';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { ShipmentTypeController } from '../controllers/shipment-type.controller';

const router: Router = Router();

const controller = container.get(ShipmentTypeController);
const authMiddleware = container.get(AuthMiddleware);

const { verifyToken } = authMiddleware;

router.get('', verifyToken, (req, res) => controller.getAll(req, res));

export default router;
