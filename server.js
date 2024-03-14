import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import jobRouter from './routers/jobRouter.js'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import authRouter from './routers/authRouter.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import cookieParser from 'cookie-parser'
import userRouter from './routers/userRouter.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' })
})

// Not Found Handle
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100
try {
  await mongoose.connect(process.env.MONGO_URI)
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
