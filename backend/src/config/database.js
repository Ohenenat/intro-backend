import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect
        (`${process.env.MONGODB_URI}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed", error);
        process.exit(1); // Exit the process with failure
        
    }
}
export default connectDB;