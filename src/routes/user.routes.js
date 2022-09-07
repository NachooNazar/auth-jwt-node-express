import { Router } from 'express';
const router = Router();

import * as userController from '../controllers/user.controller';
import { verifyToken, isAdmin } from '../middlewares/verifyToken';

router.get('/', [verifyToken, isAdmin], userController.findUsers);
router.get('/:id', [verifyToken, isAdmin], userController.findUser);

export default router;
