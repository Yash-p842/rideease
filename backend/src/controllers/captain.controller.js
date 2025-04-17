import {Captain} from '../models/captain.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import { validationResult } from 'express-validator'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import blackListToken from '../models/blackListToken.model.js'

const registerCaptain = asyncHandler( async (req, res)=> {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        throw new ApiError(400, 'Enter correct fields')
    }

    const {fullname , email, password, vehicle} = req.body

    if(!fullname.firstname || !email || !password || !vehicle){
        throw new ApiError(400, 'Enter all details')
    }

const hashedPassword = await Captain.hashPassword(password)

const existCaptain = await Captain.findOne({email})

if(existCaptain){
    throw new ApiError(400, 'captain already exists')
}

const newCaptain = await Captain.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            type: vehicle.type
        }
})

if(!newCaptain){
    throw new ApiError(500, 'Error occured while registering captain')
}

const token = await newCaptain.generateAuthToken()

return res
.status(200)
.json(new ApiResponse(200, {newCaptain, token}, 'Captain registered'))
})

const loginCaptain = asyncHandler( async(req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        throw new ApiError(400, 'Express validation error')
    }

    const {email, password} = req.body

    if(!email || !password){
        throw new ApiError(400, 'Enter email and password')
    }

    const existCaptain = await Captain.findOne({email}).select('+password')

    if(!existCaptain){
        throw new ApiError(400, 'No such user exists')
    }

    const passwordCheck = await existCaptain.comparePassword(password)

    if(!passwordCheck){
        throw new ApiError(400, 'Wrong password')
    }

    const captain = await Captain.findOne({email})
    const token = await captain.generateAuthToken()

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(201)
    .cookie('token', token)
    .json(new ApiResponse(201, {captain, token}, 'Captain logged in'))
})

const getCaptainProfile = asyncHandler( async( req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200, req.captain, 'Profile fetched successfully'))
})

const logoutCaptain = asyncHandler( async(req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ]

    const blackList = await blackListToken.create({token})

    return res
    .status(200)
    .clearCookie('token')
    .json(new ApiResponse(200, {}, 'captain logged out'))
})

export {registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain}