import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

function connectDB() {
  mongoose
    .connect(`${process.env.DB_CONNECT}${DB_NAME}`)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log(`Failed to connect with mongodb, ${err}`);
    });
}

export default connectDB;
