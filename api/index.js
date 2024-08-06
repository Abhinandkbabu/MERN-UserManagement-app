import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
import adminRoute from './routes/adminRoute.js'
import cookieParser from 'cookie-parser';
import path from 'path'

dotenv.config()

mongoose
.connect(process.env.MONGO)
.then(()=>console.log('database connected'))
.catch(err=>console.log(err))

const __dirname = path.resolve()

const app = express()

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist, index.html'))
})

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow credentials (cookies)
}));

app.use(express.json())

app.use(cookieParser())

app.use("/api/user",userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoute)

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