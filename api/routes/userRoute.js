import express from 'express'
import { test, updateUser, deleteUser } from '../controller/userController.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.route('/')
.get(test)

router.route('/update/:id')
.post(verifyToken, updateUser)

router.route('/delete/:id')
.delete(verifyToken, deleteUser)


export default router