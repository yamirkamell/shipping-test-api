import { Router } from 'express';
import container from '../../../container';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { ShipmentController } from '../controllers/shipment.controller';

const router: Router = Router();

const shipmentController = container.get(ShipmentController);
const authMiddleware = container.get(AuthMiddleware);

const { verifyToken } = authMiddleware;

router.get('', verifyToken, (req, res) => shipmentController.getAll(req, res));
router.post('', verifyToken, (req, res) => shipmentController.create(req, res));

export default router;
