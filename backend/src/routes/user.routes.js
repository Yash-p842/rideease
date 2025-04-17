import {Router} from 'express'
import {body} from 'express-validator'
import { verifyUser } from '../middleware/auth.middleware.js'
import { registerUser, loginUser, getUserProfile, logOut } from '../controllers/user.controller.js'

const router = Router()

router.route('/register').post([
    body('email').isEmail().withMessage('Invalid mail'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name should be atleast 3 characters'),
    body('password').isLength({ min: 6}).withMessage('Password should be atleast 6 characters long')
], registerUser)

router.route('/login').post([
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min: 6}).withMessage('enter correct password')
], loginUser)

router.route('/user-profile').get(verifyUser, getUserProfile)

router.route('/logout').get(verifyUser, logOut)

export default router