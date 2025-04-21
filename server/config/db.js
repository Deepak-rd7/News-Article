import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("DB Connected");
        
    } catch (error) {
        console.log(error.message);
        
    }
}