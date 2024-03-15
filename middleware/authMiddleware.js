import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    throw new UnauthenticatedError('authentication invalid')
  }

  try {
    const { userId, role } = verifyJWT(token)
    const testUser = userId === '65f3f168b9cc4d634386a4ba'
    req.user = { userId, role, testUser }
    next()
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid')
  }
}

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo User. Read Only!')
  }
  next()
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    console.log(`Role --> ${req.user.role}`)
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route ')
    }
    next()
  }
}
