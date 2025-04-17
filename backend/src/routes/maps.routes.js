import express from 'express'
import { getCoordinates, getDistanceTime, getAutoSuggestions, getRates } from '../controllers/maps.controller.js'
import { verifyUser } from '../middleware/auth.middleware.js'
import {query} from 'express-validator'

const router = express.Router()

router.get('/get-coordinates', 
    query('address').isString().isLength({min:3}),
    verifyUser, getCoordinates
)  

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    verifyUser, getDistanceTime
) 
 
router.get('/get-suggestions',
    query('input').isString(),
    verifyUser, getAutoSuggestions
)

router.get('/get-fare', 
    query('pickup').isString(),
    query('destination').isString(),
    verifyUser, getRates)

export default router