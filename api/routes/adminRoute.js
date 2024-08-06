import express from 'express'
import { adminSignin, getUser, updateStatus } from '../controller/adminController.js'
const router = express.Router()

router.get('/',(req,res)=>{})

router.route('/signin')
.post(adminSignin)

router.route('/getUser')
.get(getUser)

router.route('/updataStatus/:id')
.post(updateStatus)


export default router