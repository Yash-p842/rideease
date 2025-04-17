import mongoose, { connect } from "mongoose";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        console.log(`MongoDB connected at ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`MongoDB failed to connect${error}`)
        process.exit(1)
    }
}

export default connectDB