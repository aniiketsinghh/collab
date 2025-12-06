import mongoose from 'mongoose';

const connectDb=async()=>{
    try{
        const con=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${con.connection.host}`);
    }catch(err){
        console.log("Error in db connection",err);
        process.exit(1);
    }
}
export default connectDb;