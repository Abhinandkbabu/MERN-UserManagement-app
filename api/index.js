import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'

dotenv.config()

mongoose
.connect(process.env.MONGO)
.then(()=>console.log('database connected'))
.catch(err=>console.log(err))

const app = express()

app.use(express.json())

app.use("/api/user",userRoutes)
app.use('/api/auth', authRoutes)

app.listen(process.env.PORT, ()=> console.log("Server listning in 3000"))