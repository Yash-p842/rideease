import dotenv from "dotenv";
dotenv.config({
    path : "./.env"
});

import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/" , (req, res)=>{
    res.send("Welcome to rideease website");
})

export default app;
