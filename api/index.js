import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'

dotenv.config()

mongoose
.connect(process.env.MONGO)
.then(()=>console.log('database connected'))
.catch(err=>console.log(err))

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/user",userRoutes)
app.use('/api/auth', authRoutes)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500; //intertal server error - 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode,
    })
})

app.listen(process.env.PORT, ()=> console.log("Server listning in 3000"))