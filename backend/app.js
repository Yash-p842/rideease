import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/db/db.js'
import userRouter from './src/routes/user.routes.js'
import cookieParser from 'cookie-parser'
import captainRouter from './src/routes/captain.routes.js'
import mapRouter from './src/routes/maps.routes.js'
import rideRouter from './src/routes/ride.routes.js'

dotenv.config({
    path : './.env'
})

const app = express()

connectDB()


app.use(cors({
    origin: process.env.ORIGIN_CORS,
    credentials: true
}))

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())


app.use('/user', userRouter)
app.use('/captain', captainRouter)
app.use('/maps', mapRouter)
app.use('/rides', rideRouter)

app.get('/', (req, res) => {
    res.send("Welcome to Ride Ease");
})



export default app