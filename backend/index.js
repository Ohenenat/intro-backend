import dotenv from 'dotenv';
import { connect } from 'mongoose';
import connectDB from './src/config/database.js';
import app from './src/app.js';

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();

        app.on('error', (error) => {
            console.error('Server error:', error);
            throw error; // Rethrow the error to be caught by the outer try-catch
        });

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    } catch (error) {
        console.log("MongoDB connection failed!!!", error);
        
    }
}

startServer();