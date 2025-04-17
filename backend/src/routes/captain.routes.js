import { Router } from "express";
import {body } from 'express-validator'
import {loginCaptain, registerCaptain, getCaptainProfile, logoutCaptain} from '../controllers/captain.controller.js'
import { verifyCaptain } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/register').post([
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First Name should be atleast 3 characters'),
    body('password').isLength({min: 6}).withMessage('Password should be atleast 6 characters'),
], registerCaptain)

router.route('/login').post([
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password should be atleast 6 characters'),
], loginCaptain)

router.route('/profile').get(verifyCaptain, getCaptainProfile)
router.route('/logout').get(verifyCaptain, logoutCaptain)

export default router