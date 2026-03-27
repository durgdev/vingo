import mongoose from "mongoose"
const connectDb=async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URL)
        console.log("bd connected");
        
    } catch (error) {
        console.log(error.message);
        
    }
}
export default connectDb;