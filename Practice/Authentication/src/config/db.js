import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected Succesfully")
    }catch(error){
        console.log("Error connecting mongoDB")
    }
}