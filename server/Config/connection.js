import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();


async function connection() {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database");

    } catch (err) {
        console.log("NOT SONNECTED TO DATABASE");
    }
}

export default connection;