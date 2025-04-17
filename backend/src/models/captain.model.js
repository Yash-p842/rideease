import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import {compare, hash} from 'bcrypt'

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be atleast 3 characters']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be atleast 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [5, 'Email must be atleast 5 characters']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be atleast 3 characters']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be atleast 3 characters']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be atleast 1']
        },
        vehicleType: {
            type: String,
            enum: ['car', 'auto', 'bike']
        }
    },
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    
})

captainSchema.methods.generateAuthToken = async function() {
    return jwt.sign(
            {
                _id: this._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        )
}

captainSchema.methods.comparePassword = async function(password) {
    return await compare(password, this.password)
}

captainSchema.statics.hashPassword = async function(password){
    return await hash(password, 10)
}

export const Captain = mongoose.model('Captain', captainSchema)