import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
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
        minlength: [5, 'Email must be atleast 5 characters']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    }
})

userSchema.methods.generateAuthToken = async function() {
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

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

export const User = mongoose.model('User', userSchema)