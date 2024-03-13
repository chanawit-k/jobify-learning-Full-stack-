import { Router } from 'express'
const router = Router()
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js'

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js'

router.route('/').get(getAllJobs).post(validateJobInput, createJob)
router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(validateJobInput, validateIdParam, updateJob)
  .delete(validateIdParam, deleteJob)

export default router
