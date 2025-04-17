import express from 'express'
import { body } from 'express-validator'
import { createNewRide, confirmRide, verifyOTP, endRide } from '../controllers/ride.controller.js'
import { verifyCaptain, verifyUser } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/create', 
    verifyUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle'),
    createNewRide
)

router.post('/confirm', 
    verifyCaptain,
    body('rideId').isMongoId().withMessage("invalid Ride id"),
    confirmRide
)

router.post('/verify-otp', verifyCaptain, 
    body('otp').isString().isLength({min: 4}).withMessage('Invalid OTP'),
    body('rideId').isMongoId().withMessage('Invalid Ride ID'),
    verifyOTP
)

router.post('/end-ride', 
    verifyCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRide
)

export default router