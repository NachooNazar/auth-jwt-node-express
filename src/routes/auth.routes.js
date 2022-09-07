import { Router } from 'express';
const router = Router();

import * as authController from '../controllers/auth.controller';
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExistance,
} from '../middlewares/verifyRegister';

router.post(
  '/register',
  [checkRolesExistance, checkDuplicateUsernameOrEmail],
  authController.register
);
router.post('/login', authController.login);

export default router;
