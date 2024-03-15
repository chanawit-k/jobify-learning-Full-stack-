import { Router } from 'express'
const router = Router()
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js'
import {
  authorizePermissions,
  checkForTestUser,
} from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

router.get('/current-user', getCurrentUser)
router.get(
  '/admin/app-stats',
  authorizePermissions('admin'),
  getApplicationStats
)
router.patch(
  '/update-user',
  upload.single('avatar'),
  validateUpdateUserInput,
  checkForTestUser,
  updateUser
)
export default router
