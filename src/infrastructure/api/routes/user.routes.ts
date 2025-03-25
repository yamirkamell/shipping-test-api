import { Router } from 'express';
import container from '../../../container';
import { UserController } from '../../../infrastructure/api/controllers/user.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

const router: Router = Router();

const userController = container.get(UserController);
const authMiddleware = container.get(AuthMiddleware);

//const { verifyToken } = authMiddleware;

router.post('/auth', (req, res) => userController.authenticateUser(req, res));
router.post('', (req, res) => userController.create(req, res));

export default router;
