import {User} from '../models/user.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import { validationResult } from 'express-validator'
import ApiResponse from '../utils/ApiResponse.js'
import blackListToken from '../models/blackListToken.model.js'

const registerUser = asyncHandler( async(req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        console.log(errors)
        throw new ApiError(400, 'express validation error')
    }

    const {fullname, email, password} = req.body

    if(!fullname.firstname || !email || !password){
        throw new ApiError(400, 'All fields are necessary')
    }

    const existUser = await User.findOne({email})

    if(existUser){
        throw new ApiError(400, 'User already exists with mail')
    }
    
    const hashedPassword = await User.hashPassword(password)
    
    
    const user = await User.create({
        fullname: {
            firstname: fullname.firstname.toLowerCase(),
            lastname: fullname.lastname.toLowerCase()
        },
        email: email.toLowerCase(),
        password: hashedPassword
    })
    
    const token = await user.generateAuthToken()

    return res
    .status(201)
    .json(
        new ApiResponse(201, {user, token}, 'User created successfully')
    )


})

const loginUser = asyncHandler( async(req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        throw new ApiError(400, 'Express validation error')
    }

    const {email, password} = req.body

    if(!email || !password){
        throw new ApiError(400, 'Enter email and password')
    }

    const existUser = await User.findOne({email}).select('+password')

    if(!existUser){
        throw new ApiError(400, 'No such user exists')
    }

    const passwordCheck = await existUser.comparePassword(password)

    if(!passwordCheck){
        throw new ApiError(400, 'Wrong password')
    }

    const user = await User.findOne({email})
    const token = await existUser.generateAuthToken()

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(201)
    .cookie('token', token)
    .json(new ApiResponse(201, {user, token}, 'User logged in'))

})

const getUserProfile = asyncHandler( async(req,res) => {
    return res
    .status(200)
    .json(new ApiResponse(200, req.user, 'Profile fetched successfully'))
})
 
const logOut = asyncHandler( async(req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ]

    const blackList = await blackListToken.create({token})

    return res
    .status(200)
    .clearCookie('token')
    .json(new ApiResponse(200, {}, 'user logged out'))
})

export {registerUser, loginUser, getUserProfile, logOut}