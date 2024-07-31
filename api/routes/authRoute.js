import express from 'express';
import { signin, signup, google } from '../controller/authController.js';

const router = express.Router();

router.route('/signup')
.post(signup)

router.route('/signin')
.post(signin)

router.route('/google')
.post(google)

export default router